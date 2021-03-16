export interface IEndPatronSessionResponse {
  endSession: boolean;
  transactionDate: Date;
  institutionId: string;
  patronIdentifier: string;
  screenMessage: string[];
  printLine: string[];
  sequence?: number;
  checksum?: string;
  checksumIsValid?: boolean;
}
