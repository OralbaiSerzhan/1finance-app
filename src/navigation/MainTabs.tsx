import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADII } from '../constants/theme';
import { CategoriesScreen } from '../screens/CategoriesScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { StatsScreen } from '../screens/StatsScreen';
import { TransactionsScreen } from '../screens/TransactionsScreen';
import { MainTabParamList } from '../types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';
          if (route.name === 'HomeTab') iconName = 'home-outline';
          else if (route.name === 'AnalysisTab') iconName = 'stats-chart-outline';
          else if (route.name === 'TransactionsTab') iconName = 'swap-horizontal-outline';
          else if (route.name === 'CategoriesTab') iconName = 'layers-outline';
          else if (route.name === 'ProfileTab') iconName = 'person-outline';

          return (
            <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
              <Ionicons
                name={iconName}
                size={22}
                color={COLORS.textDark}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} />
      <Tab.Screen name="AnalysisTab" component={StatsScreen} />
      <Tab.Screen name="TransactionsTab" component={TransactionsScreen} />
      <Tab.Screen name="CategoriesTab" component={CategoriesScreen} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    backgroundColor: COLORS.cardLight,
    borderTopWidth: 0,
    borderTopLeftRadius: RADII.lg,
    borderTopRightRadius: RADII.lg,
    paddingHorizontal: 12,
    paddingBottom: 8,
    paddingTop: 8,
    elevation: 8,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    backgroundColor: COLORS.primary,
  },
});
