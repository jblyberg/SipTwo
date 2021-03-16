export interface IHoldResponse {
  ok: boolean;
  available: boolean;
  transactionDate: Date;
  expirationDate?: Date;
  queuePosition: number;
  pickupLocation: string;
  institutionId: string;
  patronIdentifier: string;
  itemIdentifier: string;
  titleIdentifier: string;
  screenMessage: string[];
  printLine: string[];
  sequence?: number;
  checksum?: string;
  validChecksum?: boolean;
}
