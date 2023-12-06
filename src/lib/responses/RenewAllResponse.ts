import { ResponseMessage } from '../classes/ResponseMessage';
import { parseChecksum, verifyChecksum } from '../helpers/ChecksumHelpers';
import { parseSipResponseDateTime } from '../helpers/DateTimeHelpers';
import { parseVariableMulti, parseVariableWithoutDelimeter } from '../helpers/ParseVariableHelpers';
import { intToBool, stringToInt } from '../helpers/TypeTransformers';
import { IRenewAllResponse } from '../interfaces';
import { ItemType, MessageCodes } from '../variables';

export class RenewAllResponse extends ResponseMessage {
  parse(message: string): IRenewAllResponse {
    this.identifier = MessageCodes.RENEW_ALL_RESPONSE;

    const data: IRenewAllResponse = {
      ok: intToBool(message.charAt(2)),
      renewedCount: stringToInt(message.slice(3, 7)),
      unrenewedCount: stringToInt(message.slice(7, 11)),
      transactionDate: parseSipResponseDateTime(message.slice(11, 29)),
      institutionId: parseVariableWithoutDelimeter('AO', message.slice(29)) || '',
      screenMessage: parseVariableMulti('AF', message.slice(24)),
      printLine: parseVariableMulti('AG', message.slice(24)),
    };

    const items: any = {};
    for (const key of Object.keys(ItemType)) {
      const lowerKey = key.toLowerCase();
      const itemType = ItemType[key];
      const temporary = parseVariableMulti(itemType, message.slice(29));
      if (temporary && temporary.length > 0) {
        items[lowerKey] = {};
        items[lowerKey].items = temporary;
        items[lowerKey].itemType = key;
        items[lowerKey].itemTypeId = itemType;
      }
    }
    data.items = items;

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
