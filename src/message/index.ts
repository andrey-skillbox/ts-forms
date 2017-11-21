export type MessageType = 'dangger' | 'warning' | 'info' | 'success';

export interface iMessage {
  readonly text?: string;
  readonly status: MessageType;
}

export class Message implements iMessage {
	
  public text: string;
  public status: MessageType;

  constructor(text: string = '', status: MessageType = 'info') {
    this.text = text;
    this.status = status;
  }

}