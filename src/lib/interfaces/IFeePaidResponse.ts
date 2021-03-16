export interface IFeePaidResponse {
  paymentAccepted: boolean;
  transactionDate: Date;
  institutionId: string;
  patronIdentifier: string;
  transactionId: string;
  screenMessage: string[];
  printLine: string[];
  sequence?: number;
  checksum?: string;
  validChecksum?: boolean;
}
