export type TimerMode = "work" | "short-break" | "long-break";

export interface PomodoroSettings {
  workDuration: number;
  shortBreak: number;
  longBreak: number;
  sessionsBeforeLong: number;
}

export const DEFAULT_SETTINGS: PomodoroSettings = {
  workDuration: 25,
  shortBreak: 5,
  longBreak: 15,
  sessionsBeforeLong: 4,
};

export function getModeDuration(
  mode: TimerMode,
  settings: PomodoroSettings,
): number {
  switch (mode) {
    case "work":
      return settings.workDuration * 60;
    case "short-break":
      return settings.shortBreak * 60;
    case "long-break":
      return settings.longBreak * 60;
  }
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export function getModeLabel(mode: TimerMode): string {
  switch (mode) {
    case "work":
      return "Focus Time";
    case "short-break":
      return "Short Break";
    case "long-break":
      return "Long Break";
  }
}

export function getModeColor(mode: TimerMode): string {
  switch (mode) {
    case "work":
      return "#EF4444";
    case "short-break":
      return "#10B981";
    case "long-break":
      return "#3B82F6";
  }
}
