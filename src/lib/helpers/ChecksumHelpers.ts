export const getChecksum = (message: string) => {
  let checksum_int = 0;
  let checksum_binary_string = '';
  let checksum_binary_string_inverted = '';
  let checksum_binary_string_inverted_plus1 = '';
  let checksum_hex_string = '';

  // add each character as an unsigned binary number
  for (const char of message) {
    const code_point = char.codePointAt(0);
    if (code_point) {
      checksum_int += code_point;
    }
  }

  // convert integer to binary representation stored in a string
  while (checksum_int > 0) {
    checksum_binary_string = (checksum_int % 2).toString() + checksum_binary_string;
    checksum_int = Math.floor(checksum_int / 2);
  }

  // pad binary string to 16 bytes
  while (checksum_binary_string.length < 16) {
    checksum_binary_string = '0' + checksum_binary_string;
  }

  // invert the binary string
  for (const char of checksum_binary_string) {
    let inverted_value = 'X';
    inverted_value = char === '1' ? '0' : '1';
    checksum_binary_string_inverted += inverted_value;
  }

  // add 1 to the binary string
  let carry_bit = true;

  for (let index = checksum_binary_string_inverted.length - 1; index >= 0; index--) {
    if (carry_bit) {
      if (checksum_binary_string_inverted[index] === '0') {
        checksum_binary_string_inverted_plus1 = '1' + checksum_binary_string_inverted_plus1;
        carry_bit = false;
      } else {
        checksum_binary_string_inverted_plus1 = '0' + checksum_binary_string_inverted_plus1;
        carry_bit = true;
      }
    } else {
      checksum_binary_string_inverted_plus1 =
        checksum_binary_string_inverted[index] + checksum_binary_string_inverted_plus1;
    }
  }

  // convert binary string to hex string and uppercase it because that's what the gateway likes
  checksum_hex_string = Number.parseInt(checksum_binary_string_inverted_plus1, 2).toString(16).toUpperCase();

  return checksum_hex_string;
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
