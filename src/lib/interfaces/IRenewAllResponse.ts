export interface IRenewAllResponse {
  ok: boolean;
  renewedCount: number;
  unrenewedCount: number;
  transactionDate: Date;
  institutionId: string;
  screenMessage: string[];
  printLine: string[];
  items?: {
    hold?: RenewalItem;
    overdue?: RenewalItem;
    charged?: RenewalItem;
    fine?: RenewalItem;
    recall?: RenewalItem;
    unavailable_hold?: RenewalItem;
    renewed?: RenewalItem;
    unrenewed?: RenewalItem;
  };
  sequence?: number;
  checksum?: string;
  validChecksum?: boolean;
}

interface RenewalItem {
  items: string[];
  itemType: string;
  itemTypeId: string;
}
