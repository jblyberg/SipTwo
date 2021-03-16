import { charToBool } from '../helpers/TypeTransformers';

export class PatronStatus {
  public chargePrivilegesDenied = false;
  public renewalPrivilegesDenied = false;
  public recallPrivilegesDenied = false;
  public holdPrivilegesDenied = false;
  public cardReportedLost = false;
  public tooManyItemsCharged = false;
  public tooManyItemsOverdue = false;
  public tooManyRenewals = false;
  public tooManyClaimsOfItemsReturned = false;
  public tooManyItemsLost = false;
  public excessiveOutstandingFines = false;
  public excessiveOutstandingFees = false;
  public recallOverdue = false;
  public tooManyItemsBilled = false;

  constructor(message = '') {
    if (message) {
      this.chargePrivilegesDenied = charToBool(message.charAt(2));
      this.renewalPrivilegesDenied = charToBool(message.charAt(3));
      this.recallPrivilegesDenied = charToBool(message.charAt(4));
      this.holdPrivilegesDenied = charToBool(message.charAt(5));
      this.cardReportedLost = charToBool(message.charAt(6));
      this.tooManyItemsCharged = charToBool(message.charAt(7));
      this.tooManyItemsOverdue = charToBool(message.charAt(8));
      this.tooManyRenewals = charToBool(message.charAt(9));
      this.tooManyClaimsOfItemsReturned = charToBool(message.charAt(10));
      this.tooManyItemsLost = charToBool(message.charAt(11));
      this.excessiveOutstandingFines = charToBool(message.charAt(12));
      this.excessiveOutstandingFees = charToBool(message.charAt(13));
      this.recallOverdue = charToBool(message.charAt(14));
      this.tooManyItemsBilled = charToBool(message.charAt(15));
    }
  }
}
