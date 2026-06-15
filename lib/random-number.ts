export type RandomMode = "single" | "list" | "uuid" | "dice";

export function generateRandom(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomList(
  min: number,
  max: number,
  count: number,
  unique: boolean = false,
): number[] {
  if (unique && count > max - min + 1) {
    count = max - min + 1;
  }

  if (unique) {
    const pool = Array.from({ length: max - min + 1 }, (_, i) => i + min);
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, count);
  }

  return Array.from({ length: count }, () => generateRandom(min, max));
}

export function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function rollDice(sides: number = 6, count: number = 1): number[] {
  return Array.from(
    { length: count },
    () => Math.floor(Math.random() * sides) + 1,
  );
}
