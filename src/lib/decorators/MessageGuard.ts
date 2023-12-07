export const MessageGuard = (messageType = '') => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...arguments_: any) {
      if (!this.value.authenticated) {
        throw new Error('Not logged in to SIP2 server');
      }

      if (messageType && !this.value.scStatus.supportedMessages[messageType]) {
        throw new Error(`Message type "${messageType}" is not supported by this SIP server'`);
      }

      return await originalMethod.apply(this, arguments_);
    };
  };
};
