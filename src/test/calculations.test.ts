import { describe, it, expect } from 'vitest';

/**
 * Tests for core calculator math extracted from components.
 * These verify the formulas used across calculator components.
 */

// ROI calculation (from RoiCalculator.tsx)
function calculateROI(invest: number, current: number, fees: number, days: number) {
  const netProfit = current - invest - fees;
  const totalRoi = ((current - invest - fees) / invest) * 100;
  const annualizedRoi = (Math.pow(1 + totalRoi / 100, 365 / days) - 1) * 100;
  return { netProfit, totalRoi, annualizedRoi };
}

// Break-even recovery (from BreakEvenCalculator.tsx)
function calculateRecovery(lossPct: number) {
  return lossPct > 0 && lossPct < 100
    ? (lossPct / (100 - lossPct)) * 100
    : 0;
}

// Break-even trade price (from BreakEvenCalculator.tsx)
function calculateBreakEvenPrice(entry: number, entryFee: number, exitFee: number, isShort: boolean) {
  const totalFeePct = entryFee + exitFee;
  return isShort
    ? entry * (1 - totalFeePct / 100)
    : entry * (1 + totalFeePct / 100);
}

// DCA average cost (from DCACalculator logic)
function calculateDCA(investPerPeriod: number, prices: number[]) {
  let totalInvested = 0;
  let totalCoins = 0;
  for (const price of prices) {
    totalInvested += investPerPeriod;
    totalCoins += investPerPeriod / price;
  }
  const avgCost = totalInvested / totalCoins;
  return { totalInvested, totalCoins, avgCost };
}

// Compound interest (from CompoundInterestCalculator)
function calculateCompound(principal: number, rate: number, periods: number, compoundsPerYear: number) {
  return principal * Math.pow(1 + rate / 100 / compoundsPerYear, compoundsPerYear * periods);
}

// Liquidation price (from LiquidationCalculator)
function calculateLiquidationPrice(entryPrice: number, leverage: number, isLong: boolean) {
  return isLong
    ? entryPrice * (1 - 1 / leverage)
    : entryPrice * (1 + 1 / leverage);
}

// Impermanent loss (from ImpermanentLossCalculator)
function calculateImpermanentLoss(priceRatio: number) {
  return (2 * Math.sqrt(priceRatio)) / (1 + priceRatio) - 1;
}

describe('ROI Calculator', () => {
  it('calculates positive ROI correctly', () => {
    const result = calculateROI(10000, 15000, 50, 365);
    expect(result.netProfit).toBe(4950);
    expect(result.totalRoi).toBeCloseTo(49.5, 1);
    expect(result.annualizedRoi).toBeCloseTo(49.5, 1);
  });

  it('calculates negative ROI correctly', () => {
    const result = calculateROI(10000, 8000, 25, 182);
    expect(result.netProfit).toBe(-2025);
    expect(result.totalRoi).toBeCloseTo(-20.25, 1);
  });

  it('annualizes multi-year ROI correctly', () => {
    const result = calculateROI(5000, 10000, 100, 1095); // 3 years, 2x
    expect(result.netProfit).toBe(4900);
    // ~98% total ROI over 3 years ≈ ~25.7% annualized
    expect(result.annualizedRoi).toBeCloseTo(25.69, 0);
  });

  it('handles zero fees', () => {
    const result = calculateROI(1000, 2000, 0, 365);
    expect(result.totalRoi).toBe(100);
    expect(result.annualizedRoi).toBe(100);
  });
});

describe('Break-Even Calculator', () => {
  it('calculates recovery from 50% loss', () => {
    expect(calculateRecovery(50)).toBe(100);
  });

  it('calculates recovery from 20% loss', () => {
    expect(calculateRecovery(20)).toBe(25);
  });

  it('calculates recovery from 90% loss', () => {
    expect(calculateRecovery(90)).toBe(900);
  });

  it('returns 0 for 0% loss', () => {
    expect(calculateRecovery(0)).toBe(0);
  });

  it('returns 0 for 100% loss (total wipeout)', () => {
    expect(calculateRecovery(100)).toBe(0);
  });

  it('calculates long break-even price', () => {
    const price = calculateBreakEvenPrice(65000, 0.1, 0.1, false);
    expect(price).toBe(65000 * 1.002);
  });

  it('calculates short break-even price', () => {
    const price = calculateBreakEvenPrice(65000, 0.1, 0.1, true);
    expect(price).toBe(65000 * 0.998);
  });
});

describe('DCA Calculator', () => {
  it('calculates average cost with declining prices', () => {
    const result = calculateDCA(100, [50000, 40000, 30000, 20000]);
    expect(result.totalInvested).toBe(400);
    expect(result.avgCost).toBeLessThan(35000); // DCA advantage
    expect(result.totalCoins).toBeGreaterThan(0);
  });

  it('calculates average cost with flat prices', () => {
    const result = calculateDCA(100, [50000, 50000, 50000]);
    expect(result.avgCost).toBeCloseTo(50000, 0);
  });

  it('calculates average cost with rising prices', () => {
    const result = calculateDCA(100, [20000, 30000, 40000, 50000]);
    expect(result.avgCost).toBeGreaterThan(20000);
    expect(result.avgCost).toBeLessThan(50000);
  });
});

describe('Compound Interest', () => {
  it('calculates annual compounding', () => {
    const result = calculateCompound(1000, 10, 1, 1);
    expect(result).toBe(1100);
  });

  it('calculates monthly compounding', () => {
    const result = calculateCompound(1000, 12, 1, 12);
    expect(result).toBeCloseTo(1126.83, 1);
  });

  it('calculates daily compounding over 5 years', () => {
    const result = calculateCompound(10000, 5, 5, 365);
    expect(result).toBeCloseTo(12840.03, 0);
  });
});

describe('Liquidation Price', () => {
  it('calculates long liquidation at 10x', () => {
    const price = calculateLiquidationPrice(50000, 10, true);
    expect(price).toBe(45000);
  });

  it('calculates short liquidation at 10x', () => {
    const price = calculateLiquidationPrice(50000, 10, false);
    expect(price).toBeCloseTo(55000, 0);
  });

  it('calculates long liquidation at 2x', () => {
    const price = calculateLiquidationPrice(50000, 2, true);
    expect(price).toBe(25000);
  });

  it('higher leverage = closer liquidation', () => {
    const liq5x = calculateLiquidationPrice(50000, 5, true);
    const liq20x = calculateLiquidationPrice(50000, 20, true);
    expect(liq20x).toBeGreaterThan(liq5x); // 20x liquidates sooner
  });
});

describe('Impermanent Loss', () => {
  it('returns 0 when price ratio is 1 (no change)', () => {
    expect(calculateImpermanentLoss(1)).toBeCloseTo(0, 10);
  });

  it('calculates IL for 2x price increase', () => {
    const il = calculateImpermanentLoss(2);
    expect(il).toBeCloseTo(-0.05719, 4); // ~5.72% loss
  });

  it('calculates IL for 5x price increase', () => {
    const il = calculateImpermanentLoss(5);
    expect(il).toBeCloseTo(-0.2546, 3); // ~25.5% loss
  });

  it('IL is symmetric for price increase and decrease', () => {
    const il2x = calculateImpermanentLoss(2);
    const il05x = calculateImpermanentLoss(0.5);
    expect(Math.abs(il2x)).toBeCloseTo(Math.abs(il05x), 4);
  });

  it('IL increases with larger price divergence', () => {
    const il2x = Math.abs(calculateImpermanentLoss(2));
    const il5x = Math.abs(calculateImpermanentLoss(5));
    const il10x = Math.abs(calculateImpermanentLoss(10));
    expect(il5x).toBeGreaterThan(il2x);
    expect(il10x).toBeGreaterThan(il5x);
  });
});
