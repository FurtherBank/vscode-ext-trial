import * as vscode from 'vscode';
import { pluginName } from '../../constrants/project';
import { IWebview } from '../helper/webview/IWebview';
import { loadWebviewHtml } from '../helper/webview/loadWebviewHtml';

interface WebviewPanelContent {
  panel: vscode.WebviewPanel;
  disposables: vscode.Disposable[];
}

export class WebviewManager {
  static webviews: Record<string, IWebview> = {};
  static panels: Record<string, WebviewPanelContent> = {};

  /**
   * 统一注册插件中定义的 webviews
   * @param context
   */
  static register(context: vscode.ExtensionContext) {
    for (const key in WebviewManager.webviews) {
      if (Object.prototype.hasOwnProperty.call(WebviewManager.webviews, key)) {
        const webview = WebviewManager.webviews[key];
        const { viewType, deserializeWebviewPanel = async () => {} } = webview;

        // 自动注册对应 webview 的 open 命令
        let disposable = vscode.commands.registerCommand(`${pluginName}.open${viewType}`, () => {
          WebviewManager.show(context, webview);
        });
        context.subscriptions.push(disposable);

        // 反序列化
        if (vscode.window.registerWebviewPanelSerializer) {
          // Make sure we register a serializer in activation event
          vscode.window.registerWebviewPanelSerializer(viewType, {
            deserializeWebviewPanel,
          });
        }
        console.log(`成功注册 webview: ${key}`);
        
      }
    }
  }

  /**
   * 直接展示一个对应的 webview
   * @param context
   * @param webview
   * @returns
   */
  private static show(context: vscode.ExtensionContext, webview: IWebview) {
    const { extensionPath } = context;
    const { title, viewType, getPanelOptions, htmlPath, onDidReceiveMessage, panelListeners } = webview;
    const activeEditor = vscode.window.activeTextEditor;
    let column = activeEditor ? activeEditor.viewColumn : undefined;

    const existingPanel = WebviewManager.panels[viewType];
    // If we already have a panel, show it.
    // Otherwise, create a new panel.
    if (existingPanel) {
      existingPanel.panel.reveal(column);
    } else {
      // 开启一个新 panel，然后传入对应的 webView 内容
      const panel = vscode.window.createWebviewPanel(
        viewType,
        title,
        column || vscode.ViewColumn.One,
        getPanelOptions(extensionPath)
      );

      const panelContent: WebviewPanelContent = {
        panel,
        disposables: [],
      };

      loadWebviewHtml(panel, extensionPath, webview);

      // 消息通信，自己负责消息的具体解析和处理
      if (onDidReceiveMessage) {
        panel.webview.onDidReceiveMessage(onDidReceiveMessage, undefined, panelContent.disposables);
      }

      // 挂载 panel 的监听器
      const { onDidDispose, ...restListeners } = panelListeners ?? {};

      // onDidDispose 特殊，需额外清除 disposable，并移出 panels
      panel.onDidDispose(
        () => {
          if (onDidDispose) onDidDispose();

          // 释放所有 disposable，并删除这一个 webviewPanelContent
          const panelContent = WebviewManager.panels[viewType];
          panelContent.disposables.forEach((d) => d.dispose());

          delete WebviewManager.panels[viewType];
        },
        undefined,
        panelContent.disposables
      );

      // 其它：装载并写入 disposables
      const restListenerKeys = Object.keys(restListeners) as (keyof typeof restListeners)[];

      restListenerKeys.forEach((key) => {
        const listener = restListeners[key];
        if (listener) panel[key](listener, undefined, panelContent.disposables);
      });

      WebviewManager.panels[viewType] = panelContent;
    }
    return WebviewManager.panels[viewType];
  }
}
