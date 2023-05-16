/**
 * Returns a list in text format.
 * @param list - It must be an array of strings.
 * @example handleList(["A", "B", "C"]) //Returns "A, B and C"
 * @author Gabriel Ramos
 */
function handleList(list?: Array<string>) {
  return list?.map((word) => {
    if (word === list[list.length - 1]) {
      return `and ${word}.`;
    }
    if (word === list[list.length - 2]) {
      return `${word} `;
    }
    return `${word}, `;
  });
}

export default handleList;
