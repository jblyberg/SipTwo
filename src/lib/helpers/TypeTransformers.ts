export const intToBool = (value: string): boolean => {
  const intValue = Number.parseInt(value);
  return intValue === 1;
};

export const charToBool = (char: string) => {
  if (char === 'Y') {
    return true;
  }
  return false;
};

export const stringToInt = (value: string): number => {
  return Number.parseInt(value, 10);
};
