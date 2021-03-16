import { Message } from './Message';

export class ResponseMessage extends Message {
  exists(prefix: string, message: string): boolean {
    const regexp = new RegExp('\\|' + prefix + '(.*?)\\|');
    const matches = message.match(regexp);
    if (matches && matches.length > 1) {
      return true;
    }
    return false;
  }

  existsAndNotEmpty(prefix: string, message: string): boolean {
    const regexp = new RegExp('\\|' + prefix + '(.*?)\\|');
    const matches = message.match(regexp);
    if (matches && matches.length > 1 && matches[1]) {
      return true;
    }
    return false;
  }

  parseSequence(message: string): string {
    let sequence = '';

    const regexp = new RegExp('\\|AY(\\d{1})');
    const matches = message.match(regexp);
    if (matches && matches.length > 1) {
      sequence = matches[1];
    }
    return sequence;
  }
}
