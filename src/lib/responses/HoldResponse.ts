import { ResponseMessage } from '../classes/ResponseMessage';
import { parseChecksum, verifyChecksum } from '../helpers/ChecksumHelpers';
import { isValidDate, parseSipResponseDateTime } from '../helpers/DateTimeHelpers';
import {
  parseVariable,
  parseVariableMulti,
  parseVariableWithoutDelimeter,
} from '../helpers/ParseVariableHelpers';
import { charToBool, intToBool } from '../helpers/TypeTransformers';
import { IHoldResponse } from '../interfaces';
import { MessageCodes } from '../variables';

export class HoldResponse extends ResponseMessage {
  parse(message: string): IHoldResponse {
    this.identifier = MessageCodes.HOLD_RESPONSE;

    const expirationDate = parseSipResponseDateTime(
      parseVariableWithoutDelimeter('BW', message.slice(22)) || '',
    );
    const queuePosition = parseVariable('BR', message.slice(22));

    const data: IHoldResponse = {
      ok: intToBool(message.charAt(2)),
      available: charToBool(message.charAt(3)),
      transactionDate: parseSipResponseDateTime(message.slice(4, 22)),
      queuePosition: queuePosition ? Number.parseInt(queuePosition) : 0,
      pickupLocation: parseVariable('BS', message.slice(22)) || '',
      institutionId: parseVariable('AO', message.slice(22)) || '',
      patronIdentifier: parseVariable('AA', message.slice(22)) || '',
      itemIdentifier: parseVariable('AB', message.slice(22)) || '',
      titleIdentifier: parseVariable('AJ', message.slice(22)) || '',
      screenMessage: parseVariableMulti('AF', message.slice(22)),
      printLine: parseVariableMulti('AG', message.slice(22)),
    };

    if (isValidDate(expirationDate)) {
      data.expirationDate = expirationDate;
    }

    if (this.parseSequence(message) !== '') {
      data.sequence = Number.parseInt(this.parseSequence(message), 10);
    }

    if (this.errorDetection) {
      data.checksum = parseChecksum(message);
      data.validChecksum = verifyChecksum(message);
    }

    return data;
  }
}
