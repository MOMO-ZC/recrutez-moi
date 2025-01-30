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
            title: 'offers',
          }}
        />
        <Tabs.Screen
          name="candidate"
          options={{
            title: 'Liked',
          }}
        />
      </Tabs>
      <NavBar />
    </>
  );
}
