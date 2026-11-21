import {
  evaluateKbLimits,
  fitToKbLimits,
  KB_FIT_QUALITY_FLOOR,
  KB_FIT_SCALE_MIN,
} from "@/lib/photo-resize";

describe("evaluateKbLimits", () => {
  it("marks within range with a checkmark", () => {
    const status = evaluateKbLimits(40 * 1024, 20, 50);
    expect(status.withinLimits).toBe(true);
    expect(status.display).toContain("✓");
    expect(status.display).toContain("20–50 KB");
    expect(status.warning).toBeUndefined();
  });

  it("warns when above max", () => {
    const status = evaluateKbLimits(60 * 1024, 20, 50);
    expect(status.aboveMax).toBe(true);
    expect(status.withinLimits).toBe(false);
    expect(status.display).toContain("⚠");
    expect(status.warning).toMatch(/under 50 KB/i);
  });

  it("warns when below min without padding", () => {
    const status = evaluateKbLimits(8 * 1024, 20, 50);
    expect(status.belowMin).toBe(true);
    expect(status.display).toContain("⚠");
    expect(status.warning).toMatch(/not padded/i);
  });
});

describe("fitToKbLimits", () => {
  it("steps quality down to meet maxKb", async () => {
    const calls: Array<{ quality: number; width: number; height: number }> = [];

    const result = await fitToKbLimits(
      400,
      400,
      async ({ quality, width, height }) => {
        calls.push({ quality, width, height });
        // Larger quality → larger file
        const sizeBytes = Math.round(80 * 1024 * quality);
        return { sizeBytes, payload: sizeBytes };
      },
      { maxKb: 50 }
    );

    expect(result.sizeBytes).toBeLessThanOrEqual(50 * 1024);
    expect(result.status.withinLimits).toBe(true);
    expect(calls.some((c) => c.quality < 0.95)).toBe(true);
    expect(result.width).toBe(400);
  });

  it("scales down when quality floor still exceeds maxKb", async () => {
    const scales = new Set<number>();

    const result = await fitToKbLimits(
      1000,
      1000,
      async ({ quality, width, height }) => {
        scales.add(width / 1000);
        // Even at floor quality, full size is ~70KB; scales with area
        const areaFactor = (width * height) / (1000 * 1000);
        const sizeBytes = Math.round(
          70 * 1024 * areaFactor * (quality / KB_FIT_QUALITY_FLOOR)
        );
        return { sizeBytes, payload: sizeBytes };
      },
      { maxKb: 40 }
    );

    expect(result.sizeBytes).toBeLessThanOrEqual(40 * 1024);
    expect(result.width).toBeLessThan(1000);
    expect(Math.min(...scales)).toBeLessThan(1);
    expect(result.scale).toBeGreaterThanOrEqual(KB_FIT_SCALE_MIN - 0.01);
  });

  it("raises quality for minKb and warns when still too small", async () => {
    const result = await fitToKbLimits(
      200,
      200,
      async ({ quality }) => {
        // Caps at 8KB even at quality 1
        const sizeBytes = Math.round(8 * 1024 * quality);
        return { sizeBytes, payload: sizeBytes };
      },
      { minKb: 20 }
    );

    expect(result.status.belowMin).toBe(true);
    expect(result.status.warning).toMatch(/not padded/i);
    expect(result.quality).toBe(1);
  });

  it("does not exceed maxKb while trying to meet minKb", async () => {
    const result = await fitToKbLimits(
      300,
      300,
      async ({ quality }) => {
        const sizeBytes = Math.round(15 * 1024 + quality * 50 * 1024);
        return { sizeBytes, payload: sizeBytes };
      },
      { minKb: 40, maxKb: 50 }
    );

    expect(result.sizeBytes).toBeLessThanOrEqual(50 * 1024);
    // May or may not reach min depending on the curve; never pad past max
    expect(result.status.aboveMax).toBe(false);
  });
});
