export const convertHiraganaToKatakana = (str: string) => {
  return str.replace(/[\u3041-\u3096]/g, function (match) {
    var chr = match.charCodeAt(0) + 96;
    return String.fromCharCode(chr);
  });
};
