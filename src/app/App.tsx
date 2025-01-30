import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../hooks/useAuth';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import React from 'react';

const App = () => {
  const { authToken, role, embeddingVector } = useAuth();

  useEffect(() => {
    console.log('role', role);
    if (authToken && role === 'candidate') {
      router.replace('/(candidate)');
    }
    if (authToken && role === 'company') {
      router.replace('/(company)');
    }
  }, [authToken]);
  return (
    <>
      <GestureHandlerRootView>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* {authToken ? ( */}
          <Stack.Screen
            name="(auth)"
            options={{ headerShown: false, gestureEnabled: false }}
          />
          {/* ) : (
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          )} */}
        </Stack>
        <StatusBar style="auto" />
      </GestureHandlerRootView>
    </>
  );
};

export default App;
