/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const BaseColors = {
  main: '#4E32EF',
  secondary: '#118AB2',
  success: '#06D6A0',
  warning: '#FFD166',
  danger: '#EF476F',
  placeholder: '#D9D9D9',
  white: '#FFFFFF',
  black: '#222222',
  blur: '#FFFFFF99'
};

const LightTheme = {
  text: '#11181C',
  background: '#FFFFFF',
  blur: '#c4bbfa',
  tint: '#0a7ea4',
  icon: '#687076',
  tabIconDefault: '#687076',
  tabIconSelected: '#0a7ea4',
};

const DarkTheme = {
  text: '#ECEDEE',
  background: '#222222',
  blur: '#312766',
  tint: '#fff',
  icon: '#9BA1A6',
  tabIconDefault: '#9BA1A6',
  tabIconSelected: '#fff',
};

export const Colors = {
  light: { ...BaseColors, ...LightTheme },
  dark: { ...BaseColors, ...DarkTheme },
};

