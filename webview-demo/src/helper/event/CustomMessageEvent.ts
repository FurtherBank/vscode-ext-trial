export class CustomMessageEvent extends Event {
  constructor(public msgType: string, public content: any) {
    super('message');
  }
}
