import { analyzeKeywordDensity } from "@/lib/keyword-density";

export type KeywordStat = {
  word: string;
  count: number;
  percent: number;
};

export type PlatformLimit = {
  name: string;
  limit: number;
};

export type PlatformLimitStatus = PlatformLimit & {
  current: number;
  over: boolean;
  percent: number;
};

export type TextStats = {
  words: number;
  charactersWithSpaces: number;
  charactersWithoutSpaces: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingTime: string;
  speakingTime: string;
  topKeywords: KeywordStat[];
  platformLimits: PlatformLimitStatus[];
};

export const PLATFORM_LIMITS: PlatformLimit[] = [
  { name: "Twitter/X post", limit: 280 },
  { name: "LinkedIn post", limit: 3000 },
  { name: "Meta description", limit: 160 },
  { name: "Instagram caption", limit: 2200 },
  { name: "SMS", limit: 160 },
];

const ABBREVIATION_PATTERN =
  /\b(?:Mr|Mrs|Ms|Dr|Prof|Sr|Jr|vs|etc|e\.g|i\.e|U\.S|U\.K)\./gi;

function countSentences(text: string): number {
  if (!text.trim()) return 0;

  let normalized = text.replace(/\.{3,}/g, "…");
  normalized = normalized.replace(ABBREVIATION_PATTERN, (match) =>
    match.replace(".", "\u0000")
  );

  return normalized
    .split(/[.!?]+/)
    .map((part) => part.replace(/\u0000/g, ".").trim())
    .filter(Boolean).length;
}

function countParagraphs(text: string): number {
  if (!text.trim()) return 0;
  return text
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean).length;
}

function countLines(text: string): number {
  if (!text) return 0;
  return text.split(/\r?\n/).length;
}

function formatDuration(words: number, wordsPerMinute: number): string {
  if (words === 0) return "0 min";
  if (words < wordsPerMinute) return "< 1 min";
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes === 1 ? "1 min" : `${minutes} min`;
}

function getTopKeywords(words: number, text: string): KeywordStat[] {
  const { topKeywords } = analyzeKeywordDensity(text, true, 2);
  return topKeywords.slice(0, 10).map((item) => ({
    word: item.word,
    count: item.count,
    percent: words > 0 ? (item.count / words) * 100 : 0,
  }));
}

function getPlatformLimits(charactersWithSpaces: number): PlatformLimitStatus[] {
  return PLATFORM_LIMITS.map((platform) => {
    const percent = Math.min(
      100,
      Math.round((charactersWithSpaces / platform.limit) * 100)
    );
    return {
      ...platform,
      current: charactersWithSpaces,
      over: charactersWithSpaces > platform.limit,
      percent,
    };
  });
}

export function analyzeText(text: string): TextStats {
  const trimmed = text.trim();
  const charactersWithSpaces = text.length;
  const charactersWithoutSpaces = text.replace(/\s/g, "").length;

  if (!trimmed) {
    return {
      words: 0,
      charactersWithSpaces,
      charactersWithoutSpaces,
      sentences: 0,
      paragraphs: 0,
      lines: 0,
      readingTime: "0 min",
      speakingTime: "0 min",
      topKeywords: [],
      platformLimits: getPlatformLimits(charactersWithSpaces),
    };
  }

  const words = trimmed.split(/\s+/).filter(Boolean).length;

  return {
    words,
    charactersWithSpaces,
    charactersWithoutSpaces,
    sentences: countSentences(text),
    paragraphs: countParagraphs(text),
    lines: countLines(text),
    readingTime: formatDuration(words, 200),
    speakingTime: formatDuration(words, 130),
    topKeywords: getTopKeywords(words, text),
    platformLimits: getPlatformLimits(charactersWithSpaces),
  };
}
