import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { IWebview } from './IWebview';

const initJS = `
function initEventListener(fn) {
  window.addEventListener('message', event => {
    const message = event.data;
    if (message.command.match(/Response$/) && message.contents) {
      message.contents.forEach(content => {
        let element = document.getElementById(content.id);
        element.innerHTML = content.body;
      });
    } else {
      if (fn) {
        fn(message);
      }
    }
  });
}
`;

export const loadWebviewHtml = (panel: vscode.WebviewPanel, extensionPath: string, webview: IWebview<any>) => {
    const { htmlPath } = webview

    // 读取 html，并做环境兼容
    const rootString = path.join(extensionPath, htmlPath);
    const localResourceRoots = vscode.Uri.file(path.join(rootString, '/')).with({
      scheme: 'vscode-resource',
    });

    const pagePath = path.join(rootString, 'index.html');
    panel.webview.html = fs
      .readFileSync(pagePath, 'utf-8')
      .replace('{{base}}', localResourceRoots.toString())
      .replace('"{{init}}"', initJS);

    console.log(pagePath);
    console.log(panel.webview.html);
      
}