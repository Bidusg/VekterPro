import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

function TabIcon({ name, color }) {
  return <MaterialIcons name={name} size={24} color={color} />;
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6C63FF',
        tabBarInactiveTintColor: '#5a6378',
        tabBarStyle: {
          backgroundColor: '#0f0f1a',
          // Ingen border/shadow – smelter inn i appbakgrunnen
          borderTopWidth: 0,
          borderTopColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
          shadowColor: 'transparent',
          height: 64,
          paddingTop: 6,
          paddingBottom: 8,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      <Tabs.Screen
        name="hjem"
        options={{ title: 'Hjem', tabBarIcon: ({ color }) => <TabIcon name="home" color={color} /> }}
      />
      <Tabs.Screen
        name="oving"
        options={{ title: 'Øving', tabBarIcon: ({ color }) => <TabIcon name="quiz" color={color} /> }}
      />
      <Tabs.Screen
        name="eksamen"
        options={{ title: 'Eksamen', tabBarIcon: ({ color }) => <TabIcon name="fact-check" color={color} /> }}
      />
      <Tabs.Screen
        name="statistikk"
        options={{ title: 'Statistikk', tabBarIcon: ({ color }) => <TabIcon name="bar-chart" color={color} /> }}
      />
      <Tabs.Screen
        name="laerebok"
        options={{ title: 'Lærebok', tabBarIcon: ({ color }) => <TabIcon name="menu-book" color={color} /> }}
      />
    </Tabs>
  );
}
