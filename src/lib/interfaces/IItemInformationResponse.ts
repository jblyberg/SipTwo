export interface IItemInformationResponse {
  circulationStatus: string;
  securityMarker: string;
  feeType: string;
  transactionDate: Date;
  holdQueueLength: number;
  itemIdentifier: string;
  titleIdentifier: string;
  owner: string;
  permanentLocation: string;
  currentLocation: string;
  itemProperties: string;
  screenMessage: string[];
  printLine: string[];
  dueDate?: Date;
  recallDate?: Date;
  holdPickupDate?: Date;
  mediaType?: string;
  sequence?: number;
  checksum?: string;
  validChecksum?: boolean;
}
