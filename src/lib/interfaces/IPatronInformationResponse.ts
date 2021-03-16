import { PatronStatus } from '../variables';

export interface IPatronInformationResponse {
  status: PatronStatus;
  language: string;
  transactionDate: Date;
  holdItemsCount: number;
  overdueItemsCount: number;
  chargedItemsCount: number;
  fineItemsCount: number;
  recallItemsCount: number;
  unavailableHoldsCount: number;
  institutionId: string;
  patronIdentifier: string;
  personalName: string;
  feeAmount: number;
  feeLimit: number;
  homeAddress: string;
  email: string;
  phone: string;
  screenMessage: string[];
  printLine: string[];
  holdItemsLimit?: number;
  overdueItemsLimit?: number;
  chargedItemsLimit?: number;
  validPatron?: boolean;
  validPatronUsed?: boolean;
  validPatronPassword?: boolean;
  validPatronPasswordUsed?: boolean;
  currencyType?: string;
  items?: string[];
  itemType?: string;
  itemTypeId?: string;
  sequence?: number;
  checksum?: string;
  checksumIsValid?: boolean;
}
