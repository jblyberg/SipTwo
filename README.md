# SipTwo

SipTwo is a strongly-typed SIP2 wrapper for Node, written in Typescript.

## Description

SipTwo is heavily inspired by Frank Desmettre's [node-sip2](https://github.com/frankdsm/node-sip2) package--particularly message construction and interpretation.

SipTwo is wriiten entirely in Typescript, so it can be easily integrated into your type-safe projects. Or you can use it in a plain vanilla javascript project and typings will be ignored. All server responses have been cast to their appropriate types: `number`, `Date`, `string`, `boolean`, etc.

SipTwo also provides an API that will be familiar to people used to working with ES6+. You can take advantage of async/await to eliminate the need for callbacks.

## Features

- Strong typed DTOs and responses
- Manages sequence numbers automatically
- Automatic error checking; provides a `checksumValid: boolean` with every response
- Performs an SCStatus check upon server connection to determine message support. Will throw an exception if the calling application tries to use a feature not supported by the server
- Exported interfaces for all DTOs and responses

## What is SIP2?

SIP2 is a network protocol designed by 3M so that automated self-check machines could talk to an integrated library server (ILS). Since its creation, it has become widely used in a variety of different applications, for better or for worse.

## Getting Started

Getting started is very straightforward. Instantiate the SipTwo class with an `ISip2ConnectionOptions` object and use the `setPatron` method to pass `IPatronCredentials`. You can call `setPatron` any time to select a different patron.

Connection objects:

```ts
import { SipTwo, ISip2ConnectionOptions, IPatronCredentials } from 'siptwo';

const sip2ConnectionOptions: ISip2ConnectionOptions = {
  host: '192.168.0.10',
  username: 'sip_user',
  password: 'sip_password',
  institutionId: 'sip_org',
};

const patronCredentials: IPatronCredentials = {
  patronIdentifier: 'patron_barcode',
  password: 'patron_pin',
  institutionId: 'patron_org',
};
```

Instantiate the class and make method calls:

```ts
const sipTwo = new SipTwo(sip2ConnectionOptions);

// Inside an async function/method
(async () => {

  await sipTwo.login();
  sipTwo.setPatron(patronCredentials);

  const patronInfo = await sipTwo.requestPatronInformation();
  console.log('patronInfo', patronInfo);

})();
```

This will output a result similar to the following, bound to the `IPatronInformationResponse` interface:

```none
patronInfo {
  status: PatronStatus {
    chargePrivilegesDenied: false,
    renewalPrivilegesDenied: false,
    recallPrivilegesDenied: true,
    holdPrivilegesDenied: false,
    cardReportedLost: false,
    tooManyItemsCharged: false,
    tooManyItemsOverdue: false,
    tooManyRenewals: false,
    tooManyClaimsOfItemsReturned: false,
    tooManyItemsLost: false,
    excessiveOutstandingFines: false,
    excessiveOutstandingFees: false,
    recallOverdue: false,
    tooManyItemsBilled: false
  },
  language: 'english',
  transactionDate: 2021-03-16T16:36:34.000Z,
  holdItemsCount: 3,
  overdueItemsCount: 0,
  chargedItemsCount: 1,
  fineItemsCount: 0,
  recallItemsCount: 0,
  unavailableHoldsCount: 0,
  institutionId: 'patron_org',
  patronIdentifier: 'patron_barcode',
  personalName: 'Gene Adams',
  feeAmount: 1.25,
  feeLimit: 0,
  homeAddress: '8265 Phone Trail El paso, El paso TX USA 88525',
  email: genesadams@gmail.com,
  phone: '538-342-5233',
  screenMessage: [],
  printLine: [],
  validPatron: true,
  validPatronUsed: true,
  validPatronPassword: false,
  validPatronPasswordUsed: true,
  currencyType: 'USD',
  sequence: 2,
  checksum: 'BA8B',
  checksumIsValid: true
}
```

## Method Reference

The following is a list of exposed methods available through the `SipTwo` class. Refer to the corresponding [interface](./src/lib/interfaces) files to see what the relevant object structure looks like.

### Log in to SIP2 server

```ts
login(): Promise<ILoginResponse>
```

- Response: [ILoginResponse](./src/lib/interfaces/ILoginResponse.ts)

### Set patron credentials

```ts
setPatron(patronCredentials: IPatronCredentials)
```

- Required: [IPatronCredentials](./src/lib/interfaces/IPatronCredentials.ts)
- Response: `void`

### Request resend

```ts
requestResend(): Promise<any>
```

- Response: depends on previous message call

### SC/ACS status

```ts
requestSCStatus(scStatusRequestDto: ISCStatusRequestDto = {}): Promise<IACStatusResponse>
```

- Optional: [ISCStatusRequestDto](./src/lib/interfaces/ISCStatusRequestDto.ts)
- Response: [IACStatusResponse](./src/lib/interfaces/IACStatusResponse.ts)

### Enable patron (if blocked)

```ts
requestPatronEnable(): Promise<IPatronEnableResponse>
```

- Response: [IPatronEnableResponse](./src/lib/interfaces/IPatronEnableResponse.ts)

### Block patron

```ts
requestPatronBlock(blockPatronRequestDto: IBlockPatronRequestDto): Promise<IPatronStatusResponse>
```

- Required: [IBlockPatronRequestDto](./src/lib/interfaces/IBlockPatronRequestDto.ts)
- Response: [IPatronStatusResponse](./src/lib/interfaces/IPatronStatusResponse.ts)

### Patron information

```ts
requestPatronInformation(): Promise<IPatronInformationResponse>
```

- Response: [IPatronInformationResponse](./src/lib/interfaces/IPatronInformationResponse.ts)

### Patron status

```ts
requestPatronStatus(): Promise<IPatronStatusResponse>
```

- Response: [IPatronStatusResponse](./src/lib/interfaces/IPatronStatusResponse.ts)

### Item information

```ts
requestItemInformation(itemIdentifier: string): Promise<IItemInformationResponse>
```

- Required: `itemIdentifier: string`
- Response: [IItemInformationResponse](./src/lib/interfaces/IItemInformationResponse.ts)

### Checkout an item

```ts
requestCheckout(checkoutRequestDto: ICheckoutRequestDto): Promise<ICheckoutResponse>
```

- Required: [ICheckoutRequestDto](./src/lib/interfaces/ICheckoutRequestDto.ts)
- Response: [ICheckoutResponse](./src/lib/interfaces/ICheckoutResponse.ts)

### Checkin an item

```ts
requestCheckin(checkinRequestDto: ICheckinRequestDto): Promise<ICheckinResponse>
```

- Required: [ICheckinRequestDto](./src/lib/interfaces/ICheckinRequestDto.ts)
- Response: [ICheckinResponse](./src/lib/interfaces/ICheckinResponse.ts)

### Renew an item

```ts
requestRenew(renewRequestDto: IRenewRequestDto): Promise<IRenewResponse>
```

- Required: [IRenewRequestDto](./src/lib/interfaces/IRenewRequestDto.ts)
- Response: [IRenewResponse](./src/lib/interfaces/IRenewResponse.ts)

### Renew all items

```ts
requestRenewAll(renewAllRequestDto: IRenewAllRequestDto = {}): Promise<IRenewAllResponse>
```

- Optional: [IRenewAllRequestDto](./src/lib/interfaces/IRenewAllRequestDto.ts)
- Response: [IRenewAllResponse](./src/lib/interfaces/IRenewAllResponse.ts)

### Pay fees

```ts
requestFeePaid(feePaidRequestDto: IFeePaidRequestDto): Promise<IFeePaidResponse>
```

- Required: [IFeePaidRequestDto](./src/lib/interfaces/IFeePaidRequestDto.ts)
- Response: [IFeePaidResponse](./src/lib/interfaces/IFeePaidResponse.ts)

### Place a hold

```ts
requestHold(holdRequestDto: IHoldRequestDto): Promise<IHoldResponse>
```

- Required: [IHoldRequestDto](./src/lib/interfaces/IHoldRequestDto.ts)
- Response: [IHoldResponse](./src/lib/interfaces/IHoldResponse.ts)

### End patron session

```ts
requestEndPatronSession(): Promise<IEndPatronSessionResponse>
```

- Response: [IEndPatronSessionResponse](./src/lib/interfaces/IEndPatronSessionResponse.ts)
