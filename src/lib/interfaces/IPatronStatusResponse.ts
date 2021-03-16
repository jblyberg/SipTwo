import { PatronStatus } from '../variables';

export interface IPatronStatusResponse {
  status: PatronStatus;
  language: string;
  transactionDate: Date;
  institutionId: string;
  patronIdentifier: string;
  personalName: string;
  feeAmount: number;
  screenMessage: string[];
  printLine: string[];
  validPatron?: boolean;
  validPatronUsed?: boolean;
  validPatronPassword?: boolean;
  sequence?: number;
  checksum?: string;
  checksumIsValid?: boolean;
}
