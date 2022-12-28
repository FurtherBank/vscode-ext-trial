export class VscodeManager {
  static vscode: any = {
    postMessage(message: any) {
      console.log(`发送信息：${JSON.stringify(message)}`);
    },
    getState() {
      return VscodeManager.mockState;
    },
    setState(state: any) {
      VscodeManager.mockState = state;
    },
  };
  private static mockState: any = '';
  public static messageHandlers: Record<string, (message: any) => void>;

  static init() {
    // @ts-ignore
    if (window.acquireVsCodeApi) {
      // @ts-ignore
      this.vscode = window.acquireVsCodeApi();
      console.log('使用 vscode api');
    } else {
      console.log('使用 mock api');
    }

    // Handle messages sent from the extension to the webview
    window.addEventListener('message', (event) => {
      // 通过处理机制来处理
    });
  }
}
