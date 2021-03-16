import { PatronStatus } from '../variables';

export interface IPatronEnableResponse {
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
  validPatronPasswordUsed?: boolean;
  sequence?: number;
  checksum?: string;
  checksumIsValid?: boolean;
}
