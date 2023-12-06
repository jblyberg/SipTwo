import { ResponseMessage } from '../classes/ResponseMessage';
import { parseChecksum, verifyChecksum } from '../helpers/ChecksumHelpers';
import { isValidDate, parseSipResponseDateTime } from '../helpers/DateTimeHelpers';
import {
  parseVariable,
  parseVariableMulti,
  parseVariableWithoutDelimeter,
} from '../helpers/ParseVariableHelpers';
import { charToBool, intToBool } from '../helpers/TypeTransformers';
import { IRenewResponse } from '../interfaces';
import { MediaType, MessageCodes } from '../variables';

export class RenewResponse extends ResponseMessage {
  parse(message: string): IRenewResponse {
    this.identifier = MessageCodes.RENEW_RESPONSE;

    const dueDate = new Date(parseVariable('AH', message.slice(24)) || '');
    const feeAmount = parseVariable('BV', message.slice(24));

    const data: IRenewResponse = {
      ok: intToBool(message.charAt(2)),
      renewed: charToBool(message.charAt(3)),
      transactionDate: parseSipResponseDateTime(message.slice(6, 24)),
      institutionId: parseVariableWithoutDelimeter('AO', message.slice(24)) || '',
      patronIdentifier: parseVariable('AA', message.slice(24)) || '',
      itemIdentifier: parseVariable('AB', message.slice(24)) || '',
      titleIdentifier: parseVariable('AJ', message.slice(24)) || '',
      magneticMediaSupported: true,
      magneticMedia: charToBool(message.charAt(4)),
      desensitizeSupported: false,
      desensitize: charToBool(message.charAt(5)),
      itemProperties: parseVariable('CH', message.slice(24)) || '',
      transactionId: parseVariable('BK', message.slice(24)) || '',
      feeAmount: feeAmount ? Number.parseFloat(feeAmount) : 0,
      screenMessage: parseVariableMulti('AF', message.slice(24)),
      printLine: parseVariableMulti('AG', message.slice(24)),
    };

    if (['U', 'N'].includes(message.charAt(4))) {
      data.magneticMediaSupported = false;
      data.magneticMedia = false;
    }

    if (['U', 'N'].includes(message.charAt(5))) {
      data.desensitizeSupported = false;
      data.desensitize = false;
    }

    if (isValidDate(dueDate)) {
      data.dueDate = dueDate;
    }

    if (this.existsAndNotEmpty('CK', message.slice(24))) {
      data.mediaType = MediaType.parse(parseVariable('CK', message.slice(24)) || '');
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
