import { ICommonRequestDto } from '../interfaces';

export function CommonRequestDto() {
  return (target: any | any, name: PropertyKey): any => {
    const descriptor = {
      get(this: any): ICommonRequestDto {
        const propertyName = `__${String(name)}`;

        this[propertyName] = {
          sip2ConnectionOptions: this.sip2ConnectionOptions,
          patronCredentials: this.patronCredentials,
          sequence: this.sequence,
        };

        return this[propertyName];
      },
      enumerable: true,
      configurable: true,
    };

    Object.defineProperty(target, name, descriptor);
  };
}
