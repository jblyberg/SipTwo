export interface IHoldRequestDto {
  mode: string;
  itemIdentifier?: string;
  titleIdentifier?: string;
  pickupLocation?: string;
  holdType?: string;
  expirationDate?: Date;
  feeAcknowledged?: boolean;
}
