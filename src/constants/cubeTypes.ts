export const CUBE_TYPES = {
  SQUARE_1: "Square-1",
  CUBE_2X2: "2x2x2",
  CUBE_3X3: "3x3x3",
  CUBE_4X4: "4x4x4",
  CUBE_5X5: "5x5x5",
  CUBE_6X6: "6x6x6",
  CUBE_7X7: "7x7x7",
  CUBE_3BLD: "3x3x3BLD",
  CUBE_4BLD: "4x4x4BLD",
  CUBE_5BLD: "5x5x5BLD",
} as const;

export type CubeType = (typeof CUBE_TYPES)[keyof typeof CUBE_TYPES];

// Only include hotkeys for non-BLD cube types
export const CUBE_TYPE_HOTKEYS: Record<
  Exclude<CubeType, "3x3x3BLD" | "4x4x4BLD" | "5x5x5BLD">,
  [string, string]
> = {
  [CUBE_TYPES.SQUARE_1]: ["¡", "1"],
  [CUBE_TYPES.CUBE_2X2]: ["™", "2"],
  [CUBE_TYPES.CUBE_3X3]: ["£", "3"],
  [CUBE_TYPES.CUBE_4X4]: ["¢", "4"],
  [CUBE_TYPES.CUBE_5X5]: ["∞", "5"],
  [CUBE_TYPES.CUBE_6X6]: ["§", "6"],
  [CUBE_TYPES.CUBE_7X7]: ["¶", "7"],
};

export const LARGE_CUBES = [CUBE_TYPES.CUBE_6X6, CUBE_TYPES.CUBE_7X7] as const;
export type LargeCubeType = (typeof LARGE_CUBES)[number];
