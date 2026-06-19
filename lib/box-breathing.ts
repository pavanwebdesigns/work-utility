export type BreathingPhase = "inhale" | "hold1" | "exhale" | "hold2";

export type BreathingDurations = {
  inhale: number;
  hold1: number;
  exhale: number;
  hold2: number;
};

export const DEFAULT_BREATHING_DURATIONS: BreathingDurations = {
  inhale: 4,
  hold1: 4,
  exhale: 4,
  hold2: 4,
};

export const PHASE_ORDER: BreathingPhase[] = [
  "inhale",
  "hold1",
  "exhale",
  "hold2",
];

export const PHASE_LABELS: Record<BreathingPhase, string> = {
  inhale: "Inhale",
  hold1: "Hold",
  exhale: "Exhale",
  hold2: "Hold",
};

export function clampPhaseSeconds(value: number): number {
  return Math.min(8, Math.max(3, Math.round(value) || 4));
}

export function getPhaseDuration(
  phase: BreathingPhase,
  durations: BreathingDurations,
): number {
  return durations[phase];
}

export function getNextPhase(phase: BreathingPhase): BreathingPhase {
  const index = PHASE_ORDER.indexOf(phase);
  return PHASE_ORDER[(index + 1) % PHASE_ORDER.length];
}

/** 0 = contracted, 1 = expanded — inhale expands, exhale contracts */
export function getVisualScale(
  phase: BreathingPhase,
  secondsLeft: number,
  totalSeconds: number,
): number {
  const progress =
    totalSeconds > 0 ? 1 - (secondsLeft - 1) / totalSeconds : 0;
  const eased = 0.5 - Math.cos(progress * Math.PI) / 2;

  if (phase === "inhale") return 0.55 + eased * 0.45;
  if (phase === "hold1") return 1;
  if (phase === "exhale") return 1 - eased * 0.45;
  return 0.55;
}
