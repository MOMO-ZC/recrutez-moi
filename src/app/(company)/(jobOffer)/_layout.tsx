import NavBar from '@/src/components/ui/NavBar';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
          animation: 'shift',
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'JobOffers',
          }}
        />
        <Tabs.Screen
          name="edit-jobOffer"
          options={{
            title: 'Edit JobOffer',
          }}
        />
      </Tabs>
      <NavBar />
    </>
  );
}
