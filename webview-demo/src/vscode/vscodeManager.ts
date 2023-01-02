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

  /**
   * 在入口文件最先执行，获取 vscode api
   *
   * @param mockFunction 如果获取失败，执行的 mock 函数
   */
  static init(mockFunction?: () => void) {
    // @ts-ignore
    if (window.acquireVsCodeApi) {
      // @ts-ignore
      this.vscode = window.acquireVsCodeApi();
      console.log('使用 vscode api');
    } else {
      console.log('使用 mock api');
      // mock 的场景下执行这个函数
      if (mockFunction) {
        mockFunction();
      }
    }
  }
}
