/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const BaseColors = {
  main: '#4E32EF',
  placeholder: '#D9D9D9',
  white: '#FFFFFF',
  black: '#222222',
  whiteBlur: '#FFFFFF90',
  mainUi: '#4E32EF90',
};

const LightTheme = {
  text: '#11181C',
  background: '#f1faee',
  blur: '#c4bbfa',
  tint: '#0a7ea4',
  icon: '#687076',
  secondary: '#118AB2',
  success: '#06D6A0',
  warning: '#FFD166',
  danger: '#EF476F',
  framework: '#118AB2',
  'programming language': '#EF476F',
  softskills: '#06D6A0',
  software: '#FFD166',
  infrastructure: '#8A5CF6',
  beginner: '#118AB2',
  intermediate: '#06D6A0',
  advanced: '#FFD166',
  native: '#EF476F',
  'ui-items': '#edede9',
  'ui-buttons': '#d9d9d9',
};

const DarkTheme = {
  text: '#ECEDEE',
  background: '#312766',
  blur: '#312766',
  tint: '#fff',
  icon: '#9BA1A6',
  tabIconDefault: '#9BA1A6',
  tabIconSelected: '#fff',
  secondary: '#06688C',
  success: '#03B37E',
  warning: '#D4A029',
  danger: '#D13456',
  framework: '#06688C',
  'programming language': '#D13456',
  softskills: '#03B37E',
  software: '#D4A029',
  infrastructure: '#6942C2',
  beginner: '#06688C',
  intermediate: '#03B37E',
  advanced: '#D4A029',
  native: '#D13456',
  'ui-items': '#312780',
  'ui-buttons': '#4E32EF',
};

export const Colors = {
  light: { ...BaseColors, ...LightTheme },
  dark: { ...BaseColors, ...DarkTheme },
};
