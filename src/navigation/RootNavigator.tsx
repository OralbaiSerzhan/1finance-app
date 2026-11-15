import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddExpenseScreen } from '../screens/AddExpenseScreen';
import { CalendarScreen } from '../screens/CalendarScreen';
import { CategoryDetailScreen } from '../screens/CategoryDetailScreen';
import { EditProfileScreen } from '../screens/EditProfileScreen';
import {
  AccountBalanceScreen,
  NotificationScreen,
  OnlineSupportScreen,
  QuickAnalysisScreen,
  SecurityScreen,
  SettingsScreen,
} from '../screens/MoreScreens';
import { SearchScreen } from '../screens/SearchScreen';
import { RootStackParamList } from '../types';
import { MainTabs } from './MainTabs';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="CategoryDetail" component={CategoryDetailScreen} />
      <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
      <Stack.Screen name="Security" component={SecurityScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="OnlineSupport" component={OnlineSupportScreen} />
      <Stack.Screen name="QuickAnalysis" component={QuickAnalysisScreen} />
      <Stack.Screen name="AccountBalance" component={AccountBalanceScreen} />
    </Stack.Navigator>
  );
};
