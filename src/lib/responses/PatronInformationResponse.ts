import { ResponseMessage } from '../classes/ResponseMessage';
import { parseChecksum, verifyChecksum } from '../helpers/ChecksumHelpers';
import { parseSipResponseDateTime } from '../helpers/DateTimeHelpers';
import {
  parseVariable,
  parseVariableMulti,
  parseVariableWithoutDelimeter,
} from '../helpers/ParseVariableHelpers';
import { charToBool, stringToInt } from '../helpers/TypeTransformers';
import { IPatronInformationResponse } from '../interfaces';
import { CurrencyType, ItemType, Language, MessageCodes, PatronStatus } from '../variables';

export class PatronInformationResponse extends ResponseMessage {
  parse(message: string): IPatronInformationResponse {
    this.identifier = MessageCodes.PATRON_STATUS_RESPONSE;

    const feeAmount = parseVariable('BV', message.slice(61));
    const feeLimit = parseVariable('CC', message.slice(61));

    const data: IPatronInformationResponse = {
      status: new PatronStatus(message),
      language: Language[message.slice(16, 19)] ?? 'unknown',
      transactionDate: parseSipResponseDateTime(message.slice(19, 37)),
      holdItemsCount: stringToInt(message.slice(37, 41)),
      overdueItemsCount: stringToInt(message.slice(41, 45)),
      chargedItemsCount: stringToInt(message.slice(45, 49)),
      fineItemsCount: stringToInt(message.slice(49, 53)),
      recallItemsCount: stringToInt(message.slice(53, 57)),
      unavailableHoldsCount: stringToInt(message.slice(57, 61)),
      institutionId: parseVariableWithoutDelimeter('AO', message.slice(61)) || '',
      patronIdentifier: parseVariable('AA', message.slice(61)) || '',
      personalName: parseVariable('AE', message.slice(61)) || '',
      feeAmount: feeAmount ? Number.parseFloat(feeAmount) : 0,
      feeLimit: feeLimit ? Number.parseFloat(feeLimit) : 0,
      homeAddress: parseVariable('BD', message.slice(61)) || '',
      email: parseVariable('BE', message.slice(61)) || '',
      phone: parseVariable('BF', message.slice(61)) || '',
      screenMessage: parseVariableMulti('AF', message.slice(61)),
      printLine: parseVariableMulti('AG', message.slice(61)),
    };

    if (this.exists('BZ', message.slice(61))) {
      data.holdItemsLimit = stringToInt(parseVariable('BZ', message.slice(61)) || '0');
    }

    if (this.exists('CA', message.slice(61))) {
      data.overdueItemsLimit = stringToInt(parseVariable('CA', message.slice(61)) || '0');
    }

    if (this.exists('CB', message.slice(61))) {
      data.chargedItemsLimit = stringToInt(parseVariable('CB', message.slice(61)) || '0');
    }

    if (this.existsAndNotEmpty('BL', message.slice(61))) {
      data.validPatron = charToBool(parseVariable('BL', message.slice(61))?.charAt(0) || '');
      data.validPatronUsed = true;
    }

    if (this.existsAndNotEmpty('CQ', message.slice(61))) {
      data.validPatronPassword = charToBool(parseVariable('CQ', message.slice(61))?.charAt(0) || '');
      data.validPatronPasswordUsed = true;
    }

    if (this.existsAndNotEmpty('BH', message.slice(61))) {
      data.currencyType = CurrencyType.parse(parseVariable('BH', message.slice(61)) || '');
    }

    for (const key of Object.keys(ItemType)) {
      const itemType = ItemType[key];
      const itemsArray = parseVariableMulti(itemType, message.slice(61));

      if (itemsArray && itemsArray.length > 0) {
        data.items = itemsArray;
        data.itemType = key;
        data.itemTypeId = itemType;
      }
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
