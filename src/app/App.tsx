import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../hooks/useAuth';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import React from 'react';

const App = () => {
  const { authToken, role, embeddingVector } = useAuth();

  useEffect(() => {
    if (!authToken) {
      router.replace('/(auth)');
    } else if (role === 'candidate') {
      router.replace('/(candidate)');
    } else if (role === 'company') {
      router.replace('/(company)/(jobOffer)');
    }
  }, [authToken, role]);

  return authToken && role === 'candidate' ? (
    <GestureHandlerRootView>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="(candidate)"
          options={{ headerShown: false, gestureEnabled: false }}
        />
      </Stack>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  ) : authToken && role === 'company' ? (
    <GestureHandlerRootView>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="(company)"
          options={{ headerShown: false, gestureEnabled: false }}
        />
      </Stack>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  ) : (
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
