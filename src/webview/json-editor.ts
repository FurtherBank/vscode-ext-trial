import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { IWebview } from '../core/helper/webview/IWebview';
import { ITextEditorWebview } from '../core/helper/editor/text/ITextEditor';

export const JsonEditor = (
  document: vscode.TextDocument,
  webviewPanel: vscode.WebviewPanel,
  _token: vscode.CancellationToken
): ITextEditorWebview => {
  const webview = {
    viewType: 'JsonEditor',
    title: 'JsonEditor',
    getPanelOptions() {
      return {
        // Enable javascript in the webview
        enableScripts: true,
        // 该选项激活后，切换标签，内容不会重置
        retainContextWhenHidden: true,
  
        // 该字段限定可以在哪个文件夹下读取资源
        // localResourceRoots: [vscode.Uri.file(path.join(extensionPath, 'web-source/dist'))],
      };
    },
    htmlPath: 'webview-demo/build',
    onDidReceiveMessage: function (message: any) {
      if (typeof message === 'string') {
        const edit = new vscode.WorkspaceEdit();
    
        // Just replace the entire document every time for this example extension.
        // A more complete extension should compute minimal edits instead.
        edit.replace(
          document.uri,
          new vscode.Range(0, 0, document.lineCount, 0),
          message);
    
        return vscode.workspace.applyEdit(edit);
      } else {
        const { content, msgType } = message
        switch (msgType) {
          case 'sync':
            
            break;
        
          default:
            break;
        }
      }
    }
  }

  return {
    webview,
    onDocumentChange: (e) => {
      if (e.document.uri.toString() === document.uri.toString()) {
        webviewPanel.webview.postMessage({
          msgType: 'data',
          content: document.getText(),
        });
      }
    },
    onEditorActivate: (document, webviewPanel, _token) => {
			webviewPanel.webview.postMessage({
				msgType: 'data',
				content: document.getText(),
			});
      console.log('已经post');
      
    },
  }
}
