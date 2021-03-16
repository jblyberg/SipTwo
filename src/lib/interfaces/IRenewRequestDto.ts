export interface IRenewRequestDto {
  offline: boolean;
  offlineDueDateInterval: number;
  itemIdentifier: string;
  thirdParty?: boolean;
  itemProperties?: string;
  feeAcknowledged?: boolean;
}
