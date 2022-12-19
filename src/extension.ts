// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import HelloWorld from './command/hello-world';
import LogFile from './command/log-file';
import { pluginName } from './constrants/project';
import Command from './core/command/command';
import { WebviewManager } from './core/webview/manager';
import { loadWebviewHtml } from './core/helper/webview/loadWebviewHtml';
import { IWebview } from './core/helper/webview/IWebview';
import { iview } from './webview/panel';

// just fill this array by your commands, then will automatically register
// note: don't forget to fill the command in package.json
const commands: typeof Command[] = [HelloWorld, LogFile];

/**
 * 按照`viewType: webview`的方式，填入插件使用的 webview 即可。
 *
 * 注意：
 * 1. 如果 webview 是通过 customEditor 的方式使用，请不要在这里填入；两种用途的 webview 注册逻辑不同
 * 2. 键名和`webview.viewType`需要完全一致。
 */
WebviewManager.webviews = {
  'MyWebview': iview
};

const customTextEditorWebviews: IWebview<vscode.TextDocument>[] = [];

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(`Congratulations, your extension "${pluginName}" is now active!`);

  commands.forEach((command) => {
    command.register(context);
  });

  // // webView 管理
  // let disposable = vscode.commands.registerCommand(`${pluginName}.open`, () => {
  //   MyWebview.createOrShow(context.extensionPath);
  // });

  // context.subscriptions.push(disposable);

  // if (vscode.window.registerWebviewPanelSerializer) {
  //   // Make sure we register a serializer in activation event
  //   vscode.window.registerWebviewPanelSerializer(MyWebview.viewType, {
  //     async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel, state: any) {
  //       // 反序列化，拿回来上次的 webviewPanel，然后实例化 MyWebview，继承原来状态
  //       MyWebview.revive(webviewPanel, context.extensionPath);
  //     },
  //   });
  // }
  WebviewManager.register(context);

  // 注册 customEditor
  customTextEditorWebviews.forEach((webview) => {
    const { viewType } = webview;

    const provider = {
      async resolveCustomTextEditor(
        document: vscode.TextDocument,
        webviewPanel: vscode.WebviewPanel,
        _token: vscode.CancellationToken
      ): Promise<void> {
        const { viewType, onDidReceiveMessage, panelListeners } = webview;

        loadWebviewHtml(webviewPanel, context.extensionPath, webview);

        // 消息通信，自己负责消息的具体解析和处理
        if (onDidReceiveMessage) {
          webviewPanel.webview.onDidReceiveMessage(onDidReceiveMessage, document);
        }

        // 挂载 webviewPanel 的监听器
        const { onDidDispose, ...restListeners } = panelListeners ?? {};

        // onDidDispose 特殊，需额外清除 disposable，并移出 panels
        webviewPanel.onDidDispose(() => {
          if (onDidDispose) onDidDispose.call(document);

          // 释放所有 disposable，并删除这一个 webviewPanelContent
          const panelContent = WebviewManager.panels[viewType];
          panelContent.disposables.forEach((d) => d.dispose());

          delete WebviewManager.panels[viewType];
        }, document);

        // 其它：装载并写入 disposables
        const restListenerKeys = Object.keys(restListeners) as (keyof typeof restListeners)[];

        restListenerKeys.forEach((key) => {
          const listener = restListeners[key];
          if (listener) webviewPanel[key](listener, document);
        });
      },
    };
    const registration = vscode.window.registerCustomEditorProvider(viewType, provider);
    // 3. 激活事件中，将 registration 加入到 context.subscriptions
    context.subscriptions.push(registration);
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}
