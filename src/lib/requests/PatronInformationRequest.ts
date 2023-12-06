import { RequestMessage } from '../classes/RequestMessage';
import { formatSipRequestDateTime } from '../helpers/DateTimeHelpers';
import { ICommonRequestDto, IPatronInformationRequestDto } from '../interfaces';
import { MessageCodes, Summary } from '../variables';

export class PatronInformationRequest extends RequestMessage {
  private summaryType: string;
  private startItem: number;
  private endItem: number;

  constructor(
    private commonRequestDto: ICommonRequestDto,
    patronInformationRequestDto: IPatronInformationRequestDto = {},
  ) {
    super(MessageCodes.PATRON_INFORMATION_REQUEST);
    this.sequence = commonRequestDto.sequence;

    this.summaryType = patronInformationRequestDto.summaryType ?? 'none';
    this.startItem = patronInformationRequestDto.startItem ?? 1;
    this.endItem = patronInformationRequestDto.endItem ?? 5;
  }

  buildMessage() {
    const transactionDate = formatSipRequestDateTime();
    const { institutionId, language } = this.commonRequestDto.sip2ConnectionOptions;
    const { patronIdentifier, password } = this.commonRequestDto.patronCredentials;
    const summary = new Summary(this.summaryType);

    this.append(language || '001');
    this.append(transactionDate);
    this.append(summary.toString());
    this.append('AO');
    this.append(institutionId);
    this.append('|AA');
    this.append(patronIdentifier);
    if (this.commonRequestDto.sip2ConnectionOptions.password) {
      this.append('|AC');
      this.append(this.commonRequestDto.sip2ConnectionOptions.password);
    }
    if (password) {
      this.append('|AD');
      this.append(password);
    }
    if (this.startItem) {
      this.append('|BP');
      this.append(this.pad(this.startItem, 5));
    }
    if (this.endItem) {
      this.append('|BQ');
      this.append(this.pad(this.endItem, 5));
    }
  }

  private pad(number: number, size: number) {
    let s = number.toString();
    while (s.length < size) s = `0${s}`;
    return s;
  }
}
