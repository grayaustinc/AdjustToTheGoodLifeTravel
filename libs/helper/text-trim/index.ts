const PUNCTUATION_LIST = [".", ",", "!", "?", "'", "{", "}", "(", ")", "[", "]", "/"];

function trimTextIndex(text: string, minLength: number, idealLength: number, maxLength: number) {
  if (text.length < maxLength) {
    return text.length;
  }

  let pointerOne = idealLength;
  let pointerTwo = idealLength;
  let firstSpace: number | undefined = undefined;
  let resultIdx: number | undefined = undefined;

  const setSpace = (idx: number) => {
    if (spaceMatch(text[idx])) {
      firstSpace = firstSpace || idx;
    }
  };

  while (pointerOne < maxLength || pointerTwo > minLength) {
    if (checkMatch(pointerOne, text, maxLength, minLength)) {
      resultIdx = pointerOne + 1;
      break;
    } else if (checkMatch(pointerTwo, text, maxLength, minLength)) {
      resultIdx = pointerTwo + 1;
      break;
    } else {
      setSpace(pointerOne);
      setSpace(pointerTwo);
    }

    pointerOne++;
    pointerTwo--;
  }

  if (resultIdx === undefined) {
    if (firstSpace && firstSpace >= minLength && firstSpace <= maxLength) {
      resultIdx = firstSpace;
    } else if (idealLength - minLength < maxLength - idealLength) {
      resultIdx = minLength;
    } else {
      resultIdx = maxLength;
    }
  }

  return resultIdx;
}

export function trimText(text: string, minLength: number, idealLength: number, maxLength: number, suffix?: string) {
  const len = suffix?.length || 0;
  const resultIdx = trimTextIndex(text, minLength, idealLength - len, maxLength - len);
  if (resultIdx === text.length) {
    return text;
  }
  if (punctuationMatch(resultIdx - 1, text)) {
    return text.slice(0, resultIdx);
  }
  return text.slice(0, resultIdx) + (suffix || "");
}

export function splitText(text: string, minLength: number, idealLength: number, maxLength: number) {
  const resultIdx = trimTextIndex(text, minLength, idealLength, maxLength);
  if (resultIdx < maxLength) {
    return text;
  }
  return [text.slice(0, resultIdx), text.slice(resultIdx).trim()];
}

function spaceMatch(character: string) {
  if (character === " ") {
    return true;
  }
  return false;
}

function punctuationMatch(idx: number, text: string) {
  let punctuationIdx = PUNCTUATION_LIST.indexOf(text[idx]);
  if (punctuationIdx >= 0 && spaceMatch(text[idx + 1])) {
    return true;
  }
  return false;
}

function checkMatch(idx: number, text: string, max: number, min: number) {
  if (idx < max && idx > min && punctuationMatch(idx, text)) {
    return true;
  }
  return false;
}
