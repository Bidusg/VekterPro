import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function TabIcon({ name, color, size }) {
  return <MaterialIcons name={name} size={size} color={color} />;
}

export default function TabsLayout() {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const isSmall = height < 700;
  const iconSize = isSmall ? 22 : 24;
  const labelFontSize = isSmall ? 10 : 11;
  const contentHeight = isSmall ? 50 : 56;
  const tabBarHeight = contentHeight + insets.bottom;
  const paddingBottom = insets.bottom > 0 ? insets.bottom + 4 : 6;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6C63FF',
        tabBarInactiveTintColor: '#5a6378',
        tabBarStyle: {
          backgroundColor: '#0f0f1a',
          borderTopWidth: 0,
          borderTopColor: 'transparent',
          borderColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
          shadowColor: 'transparent',
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 0,
          height: tabBarHeight,
          paddingTop: 6,
          paddingBottom,
        },
        tabBarLabelStyle: { fontSize: labelFontSize, fontWeight: '600' },
      }}
    >
      <Tabs.Screen
        name="hjem"
        options={{ title: 'Hjem', tabBarIcon: ({ color }) => <TabIcon name="home" color={color} size={iconSize} /> }}
      />
      <Tabs.Screen
        name="oving"
        options={{ title: 'Øving', tabBarIcon: ({ color }) => <TabIcon name="quiz" color={color} size={iconSize} /> }}
      />
      <Tabs.Screen
        name="eksamen"
        options={{ title: 'Eksamen', tabBarIcon: ({ color }) => <TabIcon name="fact-check" color={color} size={iconSize} /> }}
      />
      <Tabs.Screen
        name="statistikk"
        options={{ title: 'Statistikk', tabBarIcon: ({ color }) => <TabIcon name="bar-chart" color={color} size={iconSize} /> }}
      />
      <Tabs.Screen
        name="laerebok"
        options={{ title: 'Lærebok', tabBarIcon: ({ color }) => <TabIcon name="menu-book" color={color} size={iconSize} /> }}
      />
    </Tabs>
  );
}
