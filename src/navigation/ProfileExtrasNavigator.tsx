import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SecurityScreen,
  ChangePinScreen,
  FingerprintListScreen,
  FingerprintDetailScreen,
  AddFingerprintScreen,
  TermsScreen,
} from '../screens/SecurityScreens';
import {
  SettingsScreen,
  NotificationSettingsScreen,
  PasswordSettingsScreen,
  DeleteAccountScreen,
} from '../screens/SettingsScreens';
import OnlineSupportScreen from '../screens/OnlineSupportScreen';
import SuccessScreen from '../screens/SuccessScreen';

export type ProfileExtrasParamList = {
  Security: undefined;
  ChangePin: undefined;
  FingerprintList: undefined;
  FingerprintDetail: undefined;
  AddFingerprint: undefined;
  Terms: undefined;
  Settings: undefined;
  NotificationSettings: undefined;
  PasswordSettings: undefined;
  DeleteAccount: undefined;
  OnlineSupport: undefined;
  Success: { message: string };
};

const Stack = createNativeStackNavigator<ProfileExtrasParamList>();

export default function ProfileExtrasNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Security" component={SecurityScreen} />
      <Stack.Screen name="ChangePin" component={ChangePinScreen} />
      <Stack.Screen name="FingerprintList" component={FingerprintListScreen} />
      <Stack.Screen name="FingerprintDetail" component={FingerprintDetailScreen} />
      <Stack.Screen name="AddFingerprint" component={AddFingerprintScreen} />
      <Stack.Screen name="Terms" component={TermsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
      <Stack.Screen name="PasswordSettings" component={PasswordSettingsScreen} />
      <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} />
      <Stack.Screen name="OnlineSupport" component={OnlineSupportScreen} />
      <Stack.Screen name="Success" component={SuccessScreen} />
    </Stack.Navigator>
  );
}
