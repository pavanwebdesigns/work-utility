const LOREM_WORDS = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "enim",
  "ad",
  "minim",
  "veniam",
  "quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "aliquip",
  "ex",
  "ea",
  "commodo",
  "consequat",
  "duis",
  "aute",
  "irure",
  "in",
  "reprehenderit",
  "voluptate",
  "velit",
  "esse",
  "cillum",
  "fugiat",
  "nulla",
  "pariatur",
  "excepteur",
  "sint",
  "occaecat",
  "cupidatat",
  "non",
  "proident",
  "sunt",
  "culpa",
  "qui",
  "officia",
  "deserunt",
  "mollit",
  "anim",
  "id",
  "est",
  "laborum",
];

export type LoremType = "paragraphs" | "sentences" | "words";

export function generateLorem(
  type: LoremType,
  count: number,
  startWithLorem: boolean = true,
): string {
  switch (type) {
    case "words":
      return generateWords(count, startWithLorem);
    case "sentences":
      return generateSentences(count, startWithLorem);
    case "paragraphs":
      return generateParagraphs(count, startWithLorem);
    default:
      return "";
  }
}

function generateWords(count: number, startWithLorem: boolean): string {
  const words: string[] = [];
  if (startWithLorem && count >= 2) {
    words.push("Lorem", "ipsum");
    for (let i = 2; i < count; i++) {
      words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
    }
  } else {
    for (let i = 0; i < count; i++) {
      words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
    }
  }
  return words.join(" ");
}

function generateSentence(isFirst: boolean = false): string {
  const length = Math.floor(Math.random() * 10) + 8;
  const words: string[] = [];
  for (let i = 0; i < length; i++) {
    words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
  }
  if (isFirst) {
    words[0] = "Lorem";
    words[1] = "ipsum";
  }
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function generateSentences(count: number, startWithLorem: boolean): string {
  return Array.from({ length: count }, (_, i) =>
    generateSentence(i === 0 && startWithLorem),
  ).join(" ");
}

function generateParagraphs(count: number, startWithLorem: boolean): string {
  const sentencesPerPara = () => Math.floor(Math.random() * 3) + 4;
  return Array.from({ length: count }, (_, i) => {
    const sentences = sentencesPerPara();
    return Array.from({ length: sentences }, (_, j) =>
      generateSentence(i === 0 && j === 0 && startWithLorem),
    ).join(" ");
  }).join("\n\n");
}

export function getLoremStats(text: string) {
  return {
    words: text.trim().split(/\s+/).filter(Boolean).length,
    chars: text.length,
  };
}

export function getMaxCount(type: LoremType): number {
  switch (type) {
    case "paragraphs":
      return 20;
    case "sentences":
      return 50;
    case "words":
      return 500;
    default:
      return 20;
  }
}
