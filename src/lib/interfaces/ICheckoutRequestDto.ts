export interface ICheckoutRequestDto {
  allowRenewals: boolean;
  offline: boolean;
  offlineDueDateInterval: number;
  itemIdentifier: string;
  itemProperties?: string;
  feeAcknowledged?: boolean;
  cancel?: boolean;
}
