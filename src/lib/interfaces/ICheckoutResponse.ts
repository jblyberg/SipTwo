export interface ICheckoutResponse {
  ok: boolean;
  renewed: boolean;
  magneticMediaSupported: boolean;
  magneticMedia: boolean;
  desensitizeSupported: boolean;
  desensitize: boolean;
  transactionDate: Date;
  institutionId: string;
  patronIdentifier: string;
  itemIdentifier: string;
  titleIdentifier: string;
  itemProperties: string;
  transactionId: string;
  feeAmount: string;
  screenMessage: string[];
  printLine: string[];
  dueDate?: Date;
  mediaType?: string;
  sequence?: number;
  checksum?: string;
  validChecksum?: boolean;
}
