export const transformText = (value, type) => {
  switch (type) {
    case 'LAST_32':
      if (value.length > 32) {
        return value.slice(-32);
      } else {
        return "";
      }
  }
};
