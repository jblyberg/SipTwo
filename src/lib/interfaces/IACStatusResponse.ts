import { SupportedMessages } from '../variables';

export interface IACStatusResponse {
  onLineStatus: boolean;
  checkinOk: boolean;
  checkoutOk: boolean;
  ACSRenewalPolicy: boolean;
  statusUpdateOk: boolean;
  offLineOk: boolean;
  timeoutPeriod: number;
  retriesAllowed: number;
  dateTimeSync: Date;
  protocolVersion: string;
  institutionId: string;
  libraryName: string;
  terminalLocation: string;
  screenMessage: string[];
  printLine: string[];
  supportedMessages: SupportedMessages;
  sequence?: number;
  checksum?: string;
  checksumIsValid?: boolean;
}
