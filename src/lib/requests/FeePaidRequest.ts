import { v4 as uuid } from 'uuid';
import { RequestMessage } from '../classes/RequestMessage';
import { ICommonRequestDto, IFeePaidRequestDto } from '../interfaces';
import { CurrencyType, FeeType, MessageCodes, PaymentType } from '../variables';
import { formatSipRequestDateTime } from '../helpers/DateTimeHelpers';

export class FeePaidRequest extends RequestMessage {
  constructor(private commonRequestDto: ICommonRequestDto, private feePaidRequestDto: IFeePaidRequestDto) {
    super(MessageCodes.FEE_PAID_REQUEST);
    this.sequence = commonRequestDto.sequence;
  }

  buildMessage() {
    const transactionDate = formatSipRequestDateTime();
    const { feeType, paymentType, currencyType, feeAmount, feeIdentifier, transactionId } =
      this.feePaidRequestDto;

    this.append(transactionDate);
    this.append(feeType || FeeType.types.OTHER_UNKNOWN);
    this.append(paymentType || PaymentType.CASH);
    this.append(currencyType || CurrencyType.types.US_DOLLAR);
    this.append('BV');
    this.append(feeAmount);
    this.append('|AO');
    this.append(this.commonRequestDto.sip2ConnectionOptions.institutionId);
    this.append('|AA');
    this.append(this.commonRequestDto.patronCredentials.patronIdentifier);

    if (this.commonRequestDto.sip2ConnectionOptions.password) {
      this.append('|AC');
      this.append(this.commonRequestDto.sip2ConnectionOptions.password);
    }

    if (this.commonRequestDto.patronCredentials.password) {
      this.append('|AD');
      this.append(this.commonRequestDto.patronCredentials.password);
    }

    if (feeIdentifier) {
      this.append('|CG');
      this.append(feeIdentifier);
    }

    this.append('|BK');
    this.append(transactionId || uuid());
  }
}
