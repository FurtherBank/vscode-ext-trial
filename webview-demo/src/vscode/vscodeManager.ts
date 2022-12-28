
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
      // 1s 后自己发射事件，激活 app
      setTimeout(() => {
        console.log('已自发射事件激活组件');
        window.dispatchEvent(new MessageEvent('message', {
          data: {
            msgType: 'data',
            content: `"hello world!"`
          }
        }));
      }, 1000);
    }
  }
}
