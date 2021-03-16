export interface ISip2ConnectionOptions {
  host: string;
  port?: number;
  username?: string;
  password?: string;
  institutionId: string;
  language?: string;
  timeout?: number;
  maxListeners?: number;
}
