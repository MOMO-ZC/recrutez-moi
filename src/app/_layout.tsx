import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from '@/src/hooks/useColorScheme';
import { AuthProvider } from '../contexts/AuthContext';
import App from './App';
import { Colors } from '../constants/Colors';
import { HeaderProvider } from '../contexts/HeaderContext';
import { FormationProvider } from '../contexts/FormationContext';
import { ProjectContext, ProjectProvider } from '../contexts/ProjectContext';
import { SkillProvider } from '../contexts/SkillContext';
import { JobOfferProvider } from '../contexts/JobOfferContext';
import { GlobalProvider } from '../contexts/GlobalContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      background: Colors.dark.background, // Use your custom dark background
    },
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      background: Colors.light.background, // Use your custom light background
    },
  };

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider
    value={colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme}
  >

      <GlobalProvider>
      <App />
      </GlobalProvider>

        </ThemeProvider>
  );
}
