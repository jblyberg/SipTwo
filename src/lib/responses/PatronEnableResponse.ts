import { ResponseMessage } from '../classes/ResponseMessage';
import { Language, MessageCodes, PatronStatus } from '../variables';
import { parseChecksum, verifyChecksum } from '../helpers/ChecksumHelpers';
import { parseSipResponseDateTime } from '../helpers/DateTimeHelpers';
import { charToBool } from '../helpers/TypeTransformers';
import {
  parseVariable,
  parseVariableMulti,
  parseVariableWithoutDelimeter,
} from '../helpers/ParseVariableHelpers';
import { IPatronEnableResponse } from '../interfaces';

export class PatronEnableResponse extends ResponseMessage {
  parse(message: string): IPatronEnableResponse {
    this.identifier = MessageCodes.PATRON_ENABLE_RESPONSE;

    const feeAmount = parseVariable('BV', message.slice(37));

    const data: IPatronEnableResponse = {
      status: new PatronStatus(message),
      language: Language[message.slice(16, 19)],
      transactionDate: parseSipResponseDateTime(message.slice(19, 37)),
      institutionId: parseVariableWithoutDelimeter('AO', message.slice(37)),
      patronIdentifier: parseVariable('AA', message.slice(37)),
      personalName: parseVariable('AE', message.slice(37)),
      feeAmount: feeAmount ? Number.parseFloat(feeAmount) : 0,
      screenMessage: parseVariableMulti('AF', message.slice(37)),
      printLine: parseVariableMulti('AG', message.slice(37)),
    };

    if (this.existsAndNotEmpty('BL', message.slice(37))) {
      const temporary = parseVariable('BL', message.slice(37));
      data.validPatron = charToBool(temporary.charAt(0));
      data.validPatronUsed = true;
    }

    if (this.existsAndNotEmpty('CQ', message.slice(37))) {
      const temporary = parseVariable('CQ', message.slice(37));
      data.validPatronPassword = charToBool(temporary.charAt(0));
      data.validPatronPasswordUsed = true;
    }

    if (this.parseSequence(message) !== '') {
      data.sequence = Number.parseInt(this.parseSequence(message), 10);
    }

    if (this.errorDetection) {
      data.checksum = parseChecksum(message);
      data.checksumIsValid = verifyChecksum(message);
    }

    return data;
  }
}
