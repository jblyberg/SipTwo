import { IPatronCredentials } from './IPatronCredentials';
import { ISip2ConnectionOptions } from './ISip2ConnectionOptions';

export interface ICommonRequestDto {
  sip2ConnectionOptions: ISip2ConnectionOptions;
  patronCredentials: IPatronCredentials;
  sequence: number;
}
