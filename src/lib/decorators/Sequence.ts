export function Sequence() {
  return (target: any | any, name: PropertyKey): any => {
    const descriptor = {
      get(this: any) {
        const propertyName = `__${String(name)}`;

        if (this[propertyName] === 0) {
          this[propertyName] = 1;
        } else if (!this[propertyName]) {
          this[propertyName] = 0;
        } else {
          if (this[propertyName] === 9) {
            this[propertyName] = 0;
          } else {
            this[propertyName]++;
          }
        }

        return this[propertyName];
      },
      enumerable: true,
      configurable: true,
    };

    Object.defineProperty(target, name, descriptor);
  };
}
