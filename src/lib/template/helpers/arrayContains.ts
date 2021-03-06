/**
 * Returns true if any item within the haystack contains the needle
 * @param {string} needle
 * @param {array} haystack
 * @return {boolean}
 */
export default (needle: string = '', haystack: string[] = []) => {
  for (let i = 0; i < haystack.length; ++i) {
    const item = haystack[i];
    if (needle === item) {
      return true;
    }
    if (item.indexOf(needle) !== -1) {
      return true;
    }
  }
  return false;
};
