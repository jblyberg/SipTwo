import {
  ACStatusResponse,
  CheckinResponse,
  CheckoutResponse,
  EndPatronSessionResponse,
  FeePaidResponse,
  HoldResponse,
  ItemInformationResponse,
  LoginResponse,
  PatronEnableResponse,
  PatronInformationResponse,
  PatronStatusResponse,
  RenewAllResponse,
  RenewResponse,
  RequestSCResendResponse,
} from './responses';
import { MessageCodes } from './variables';

export function ParseResponse(responseData: Buffer) {
  const message = responseData.toString();

  if (!message) {
    throw new Error('Invalid SIP2 response: no message response.');
  }

  if (message.length < 2) {
    throw new Error('Invalid SIP2 response: response message is too short.');
  }

  const identifier = message.slice(0, 2);

  if (identifier === MessageCodes.LOGIN_RESPONSE) {
    const parser = new LoginResponse();
    return parser.parse(message);
  }

  if (identifier === MessageCodes.ACS_STATUS_RESPONSE) {
    const parser = new ACStatusResponse();
    return parser.parse(message);
  }

  if (identifier === MessageCodes.PATRON_INFORMATION_RESPONSE) {
    const parser = new PatronInformationResponse();
    return parser.parse(message);
  }

  if (identifier === MessageCodes.PATRON_STATUS_RESPONSE) {
    const parser = new PatronStatusResponse();
    return parser.parse(message);
  }

  if (identifier === MessageCodes.CHECKOUT_RESPONSE) {
    const parser = new CheckoutResponse();
    return parser.parse(message);
  }

  if (identifier === MessageCodes.CHECKIN_RESPONSE) {
    const parser = new CheckinResponse();
    return parser.parse(message);
  }

  if (identifier === MessageCodes.RENEW_RESPONSE) {
    const parser = new RenewResponse();
    return parser.parse(message);
  }

  if (identifier === MessageCodes.RENEW_ALL_RESPONSE) {
    const parser = new RenewAllResponse();
    return parser.parse(message);
  }

  if (identifier === MessageCodes.HOLD_RESPONSE) {
    const parser = new HoldResponse();
    return parser.parse(message);
  }

  if (identifier === MessageCodes.ITEM_INFORMATION_RESPONSE) {
    const parser = new ItemInformationResponse();
    return parser.parse(message);
  }

  if (identifier === MessageCodes.FEE_PAID_RESPONSE) {
    const parser = new FeePaidResponse();
    return parser.parse(message);
  }

  if (identifier === MessageCodes.PATRON_ENABLE_RESPONSE) {
    const parser = new PatronEnableResponse();
    return parser.parse(message);
  }

  if (identifier === MessageCodes.END_PATRON_SESSION_RESPONSE) {
    const parser = new EndPatronSessionResponse();
    return parser.parse(message);
  }

  if (identifier === MessageCodes.REQUEST_SC_RESEND_RESPONSE) {
    const parser = new RequestSCResendResponse();
    return parser.parse(message);
  }

  throw new Error('Unsupported identifier: ' + identifier);
}
