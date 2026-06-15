export interface DiffLine {
  type: "same" | "added" | "removed";
  content: string;
  lineNum1?: number;
  lineNum2?: number;
}

export function diffTexts(
  text1: string,
  text2: string,
): {
  lines: DiffLine[];
  added: number;
  removed: number;
  unchanged: number;
} {
  const lines1 = text1.split("\n");
  const lines2 = text2.split("\n");

  const m = lines1.length;
  const n = lines2.length;

  const dp: number[][] = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (lines1[i - 1] === lines2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const result: DiffLine[] = [];
  let i = m;
  let j = n;
  let lineNum1 = m;
  let lineNum2 = n;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && lines1[i - 1] === lines2[j - 1]) {
      result.unshift({
        type: "same",
        content: lines1[i - 1],
        lineNum1: lineNum1--,
        lineNum2: lineNum2--,
      });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.unshift({
        type: "added",
        content: lines2[j - 1],
        lineNum2: lineNum2--,
      });
      j--;
    } else {
      result.unshift({
        type: "removed",
        content: lines1[i - 1],
        lineNum1: lineNum1--,
      });
      i--;
    }
  }

  return {
    lines: result,
    added: result.filter((l) => l.type === "added").length,
    removed: result.filter((l) => l.type === "removed").length,
    unchanged: result.filter((l) => l.type === "same").length,
  };
}
