import { ResponseMessage } from '../classes/ResponseMessage';
import { IItemInformationResponse } from '../interfaces';
import { CirculationStatus, FeeType, MediaType, MessageCodes, SecurityMarker } from '../variables';
import { parseChecksum, verifyChecksum } from '../helpers/ChecksumHelpers';
import { isValidDate, parseSipResponseDateTime } from '../helpers/DateTimeHelpers';
import {
  parseVariable,
  parseVariableMulti,
  parseVariableWithoutDelimeter,
} from '../helpers/ParseVariableHelpers';

export class ItemInformationResponse extends ResponseMessage {
  parse(message: string): IItemInformationResponse {
    this.identifier = MessageCodes.ITEM_INFORMATION_RESPONSE;
    this.message = message;

    const dueDate = new Date(parseVariableWithoutDelimeter('AH', this.message.slice(26)));
    const recallDate = new Date(parseVariableWithoutDelimeter('CJ', this.message.slice(26)));
    const holdPickupDate = new Date(parseVariableWithoutDelimeter('CM', this.message.slice(26)));
    const holdQueueLength = parseVariableWithoutDelimeter('CF', this.message.slice(26));

    const data: IItemInformationResponse = {
      circulationStatus: CirculationStatus.parse(this.message.slice(2, 4)),
      securityMarker: SecurityMarker.parse(this.message.slice(4, 6)),
      feeType: FeeType.parse(this.message.slice(6, 8)),
      transactionDate: parseSipResponseDateTime(this.message.slice(8, 26)),
      holdQueueLength: holdQueueLength ? Number.parseInt(holdQueueLength) : 0,
      itemIdentifier: parseVariableWithoutDelimeter('AB', this.message.slice(26)),
      titleIdentifier: parseVariable('AJ', this.message.slice(26)),
      owner: parseVariable('BG', this.message.slice(26)),
      permanentLocation: parseVariable('AQ', this.message.slice(26)),
      currentLocation: parseVariable('AP', this.message.slice(26)),
      itemProperties: parseVariable('CH', this.message.slice(26)),
      screenMessage: parseVariableMulti('AF', this.message.slice(26)),
      printLine: parseVariableMulti('AG', this.message.slice(26)),
    };

    if (isValidDate(dueDate)) {
      data.dueDate = dueDate;
    }

    if (isValidDate(recallDate)) {
      data.recallDate = recallDate;
    }

    if (isValidDate(holdPickupDate)) {
      data.holdPickupDate = holdPickupDate;
    }

    if (this.existsAndNotEmpty('CK', this.message.slice(26))) {
      data.mediaType = MediaType.parse(parseVariable('CK', this.message.slice(26)));
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
