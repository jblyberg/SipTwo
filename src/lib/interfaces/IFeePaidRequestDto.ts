export interface IFeePaidRequestDto {
  feeAmount: number;
  feeType?: string;
  paymentType?: string;
  currencyType?: string;
  feeIdentifier?: string;
  transactionId?: string;
}
