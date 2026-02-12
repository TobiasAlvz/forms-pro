export const COLORS = {
  primary: "#6750A4",
  onPrimary: "#FFFFFF",

  secondary: "#625B71",
  onSecondary: "#FFFFFF",

  background: "#F6F4F6",
  surface: "#FFFFFF",
  onSurface: "#1C1B1F",

  success: "#00C853",
  danger: "#D32F2F",
  warning: "#FFA000",
  info: "#0288D1",

  border: "#E0E0E0",
  disabled: "#C7C7C7",
  text: "#1C1B1F",

  shadow: "rgba(0, 0, 0, 0.08)",
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

export const RADIUS = {
  sm: 4,
  md: 8,
  lg: 16,
  full: 999,
};

export const OPACITY = {
  disabled: 0.4,
  hover: 0.8,
  pressed: 0.6,
};

const lightTheme = {
  colors: COLORS,
  spacing: SPACING,
  fontSizes: FONT_SIZES,
  radius: RADIUS,
  opacity: OPACITY,
};

export default lightTheme;
