export const getChecksum = (message: string) => {
  const messageChars = [...message];
  let checksum = 0;
  for (const char of messageChars) {
    checksum += char.codePointAt(0);
  }
  checksum = -(checksum & 0xff_ff);
  return (checksum >>> 0).toString(16).slice(4, 8).toUpperCase();
};

export const parseChecksum = (message: string): string => {
  let checksum = '';

  const regexp = new RegExp('\\|(AY\\d{1}|)AZ(\\w{4})');
  const matches = message.match(regexp);
  if (matches && matches.length > 2) {
    checksum = matches[2];
  }
  return checksum;
};

export const verifyChecksum = (message: string) => {
  const checksumProvided = parseChecksum(message);
  const messageChecksum = getChecksum(message.slice(0, -5));

  return checksumProvided === messageChecksum;
};
