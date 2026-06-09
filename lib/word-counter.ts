export type TextStats = {
  words: number;
  charactersWithSpaces: number;
  charactersWithoutSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTime: string;
};

export function analyzeText(text: string, wordsPerMinute = 200): TextStats {
  const trimmed = text.trim();

  if (!trimmed) {
    return {
      words: 0,
      charactersWithSpaces: text.length,
      charactersWithoutSpaces: text.replace(/\s/g, "").length,
      sentences: 0,
      paragraphs: 0,
      readingTime: "0 min",
    };
  }

  const words = trimmed.split(/\s+/).filter(Boolean).length;
  const charactersWithSpaces = text.length;
  const charactersWithoutSpaces = text.replace(/\s/g, "").length;

  const sentences = text
    .split(/[.!?]+/)
    .map((part) => part.trim())
    .filter(Boolean).length;

  const paragraphs = text
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean).length;

  let readingTime: string;
  if (words === 0) {
    readingTime = "0 min";
  } else if (words < wordsPerMinute) {
    readingTime = "< 1 min";
  } else {
    const minutes = Math.ceil(words / wordsPerMinute);
    readingTime = minutes === 1 ? "1 min" : `${minutes} min`;
  }

  return {
    words,
    charactersWithSpaces,
    charactersWithoutSpaces,
    sentences,
    paragraphs,
    readingTime,
  };
}
