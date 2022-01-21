const PUNCTUATION = new Set([".", "!", "?", "}", ")", "]", "/"]);

function trimmer(text: string, maxLength: number) {
  let target = -1;
  for (let index = 0; index < text.length; index++) {
    const char = text[index];
    if (PUNCTUATION.has(char)) {
      if (target > 0 && index > maxLength) {
        return text.substring(0, target + 1);
      }
      target = index;
    }
  }
  return text;
}

export default trimmer;
