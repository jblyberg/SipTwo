import { ResponseMessage } from '../classes/ResponseMessage';
import { parseChecksum, verifyChecksum } from '../helpers/ChecksumHelpers';
import { parseSipResponseDateTime } from '../helpers/DateTimeHelpers';
import {
  parseVariable,
  parseVariableMulti,
  parseVariableWithoutDelimeter,
} from '../helpers/ParseVariableHelpers';
import { charToBool, stringToInt } from '../helpers/TypeTransformers';
import { IACStatusResponse } from '../interfaces';
import { MessageCodes, SupportedMessages } from '../variables';

export class ACStatusResponse extends ResponseMessage {
  parse(message: string): IACStatusResponse {
    this.identifier = MessageCodes.ACS_STATUS_RESPONSE;

    const bx = parseVariable('BX', message.slice(36));
    const supportedMessages = new SupportedMessages(bx);

    const data: IACStatusResponse = {
      onLineStatus: charToBool(message.charAt(2)),
      checkinOk: charToBool(message.charAt(3)),
      checkoutOk: charToBool(message.charAt(4)),
      ACSRenewalPolicy: charToBool(message.charAt(5)),
      statusUpdateOk: charToBool(message.charAt(6)),
      offLineOk: charToBool(message.charAt(7)),
      timeoutPeriod: stringToInt(message.slice(8, 11)),
      retriesAllowed: stringToInt(message.slice(11, 14)),
      dateTimeSync: parseSipResponseDateTime(message.slice(14, 32)),
      protocolVersion: message.slice(32, 36),
      institutionId: parseVariableWithoutDelimeter('AO', message.slice(36)),
      libraryName: parseVariable('AM', message.slice(36)),
      terminalLocation: parseVariable('AN', message.slice(36)),
      screenMessage: parseVariableMulti('AF', message.slice(36)),
      printLine: parseVariableMulti('AG', message.slice(36)),
      supportedMessages,
    };

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
