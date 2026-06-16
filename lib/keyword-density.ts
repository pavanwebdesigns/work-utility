export interface KeywordResult {
  word: string;
  count: number;
  density: number;
}

const STOP_WORDS = new Set([
  "the",
  "a",
  "an",
  "and",
  "or",
  "but",
  "in",
  "on",
  "at",
  "to",
  "for",
  "of",
  "with",
  "by",
  "from",
  "as",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "this",
  "that",
  "these",
  "those",
  "it",
  "its",
  "i",
  "you",
  "he",
  "she",
  "we",
  "they",
  "what",
  "which",
  "who",
  "whom",
]);

export function analyzeKeywordDensity(
  text: string,
  excludeStopWords: boolean = true,
  minWordLength: number = 3,
): {
  totalWords: number;
  uniqueWords: number;
  topKeywords: KeywordResult[];
} {
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length >= minWordLength)
    .filter((w) => !excludeStopWords || !STOP_WORDS.has(w));

  const totalWords = words.length;
  const wordCount = new Map<string, number>();

  words.forEach((word) => {
    wordCount.set(word, (wordCount.get(word) || 0) + 1);
  });

  const topKeywords: KeywordResult[] = Array.from(wordCount.entries())
    .map(([word, count]) => ({
      word,
      count,
      density: totalWords > 0 ? (count / totalWords) * 100 : 0,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);

  return {
    totalWords,
    uniqueWords: wordCount.size,
    topKeywords,
  };
}
