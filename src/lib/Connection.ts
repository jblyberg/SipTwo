import * as net from 'node:net';
import { ISip2ConnectionOptions } from './interfaces';
import { ParseResponse } from './ParseResponse';

export class Connection {
  private socket: net.Socket;

  constructor(private sip2ConnectionOptions: ISip2ConnectionOptions) {
    this.socket = new net.Socket();
    this.connect();
  }

  public connect() {
    const { host, port, timeout, maxListeners } = this.sip2ConnectionOptions;
    this.socket.setEncoding('utf8');

    return new Promise<void>((resolve, reject) => {
      if (timeout) {
        this.socket.setTimeout(timeout);
      }

      this.socket.once('connect', () => resolve());
      this.socket.once('error', (error) => reject(error));
      this.socket.connect(port || 6001, host);

      if (maxListeners) {
        this.socket.setMaxListeners(maxListeners);
      }
    });
  }

  send(request: string): Promise<any> {
    if (!this.socket) {
      throw new Error('No open SIP2 socket connection');
    }

    return new Promise((resolve, reject) => {
      this.socket.once('data', (data) => resolve(ParseResponse(data)));
      this.socket.once('error', (error) => reject(error));
      this.socket.once('timeout', () => {
        this.close();
        reject({ message: 'SIP2 request timed out' });
      });
      this.socket.write(request);
    });
  }

  close() {
    if (this.socket) {
      this.socket.resetAndDestroy();
    }
  }
}
