export const parseVariable = (prefix: string, message: string): string | undefined => {
  let parsedVariable = '';
  const regexp = new RegExp('\\|' + prefix + '(.*?)\\|');
  const matches = message.match(regexp);

  if (matches && matches.length > 1) {
    parsedVariable = matches[1];
  }

  return parsedVariable.length > 0 ? parsedVariable : undefined;
};

export const parseVariableWithoutDelimeter = (prefix: string, message: string): string | undefined => {
  let parsedVariable = '';
  const regexp = new RegExp(prefix + '(.*?)\\|');
  const matches = message.match(regexp);

  if (matches && matches.length > 1) {
    parsedVariable = matches[1];
  }

  return parsedVariable.length > 0 ? parsedVariable : undefined;
};

export const parseVariableMulti = (prefix: string, message: string): string[] => {
  const results: string[] = [];
  const regexp = new RegExp('\\|(((' + prefix + '.*?)\\|)+)');
  const matches = message.match(regexp);

  if (matches && matches.length > 1) {
    const splits = matches[1].split('|');
    for (const split of splits) {
      if (split.slice(2)) {
        results.push(split.slice(2));
      }
    }
  }

  return results;
};
