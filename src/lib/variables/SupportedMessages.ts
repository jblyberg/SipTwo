import { charToBool } from '../helpers/TypeTransformers';

export class SupportedMessages {
  public patronStatusRequest = false;
  public checkout = false;
  public checkin = false;
  public blockPatron = false;
  public SCACSStatus = false;
  public requestSCACSResend = false;
  public login = false;
  public patronInformation = false;
  public endPatronSession = false;
  public feePaid = false;
  public itemInformation = false;
  public itemStatusUpdate = false;
  public patronEnable = false;
  public hold = false;
  public renew = false;
  public renewAll = false;

  constructor(bx = '') {
    if (bx) {
      this.patronStatusRequest = charToBool(bx.charAt(0));
      this.checkout = charToBool(bx.charAt(1));
      this.checkin = charToBool(bx.charAt(2));
      this.blockPatron = charToBool(bx.charAt(3));
      this.SCACSStatus = charToBool(bx.charAt(4));
      this.requestSCACSResend = charToBool(bx.charAt(5));
      this.login = charToBool(bx.charAt(6));
      this.patronInformation = charToBool(bx.charAt(7));
      this.endPatronSession = charToBool(bx.charAt(8));
      this.feePaid = charToBool(bx.charAt(9));
      this.itemInformation = charToBool(bx.charAt(10));
      this.itemStatusUpdate = charToBool(bx.charAt(11));
      this.patronEnable = charToBool(bx.charAt(12));
      this.hold = charToBool(bx.charAt(13));
      this.renew = charToBool(bx.charAt(14));
      this.renewAll = charToBool(bx.charAt(15));
    }
  }
}
