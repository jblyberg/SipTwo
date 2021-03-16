import { MediaType } from '../variables';

export interface IRenewResponse {
  ok: boolean;
  renewed: boolean;
  transactionDate: Date;
  institutionId: string;
  patronIdentifier: string;
  itemIdentifier: string;
  titleIdentifier: string;
  magneticMediaSupported: boolean;
  magneticMedia: boolean;
  desensitizeSupported: boolean;
  desensitize: boolean;
  itemProperties: string;
  transactionId: string;
  feeAmount: number;
  screenMessage: string[];
  printLine: string[];
  dueDate?: Date;
  mediaType?: MediaType;
  sequence?: number;
  checksum?: string;
  validChecksum?: boolean;
}
