import NavBar from '@/src/components/ui/NavBar';
import { Tabs } from 'expo-router';

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
            title: 'Job',
          }}
        />
        <Tabs.Screen
          name="liked"
          options={{
            title: 'Liked',
          }}
        />
        <Tabs.Screen
          name="projects"
          options={{
            title: 'Projects',
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
          }}
        />
        <Tabs.Screen
          name="not-found"
          options={{
            title: 'Not Found',
          }}
        />
      </Tabs>
      <NavBar />
    </>
  );
}
