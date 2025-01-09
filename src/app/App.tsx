import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { useAuth } from '../hooks/useAuth';



const App = () => {

    const isAuthenticated = useAuth();

    return (
        <>
        <Stack screenOptions={{ 
            headerShown: false,
         }}>
        {isAuthenticated ? (
          <Stack.Screen name="(tabs)" options={{ headerShown: false, gestureEnabled: false }} />
        ) : (
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        )}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
      </>

    );
}

export default App;