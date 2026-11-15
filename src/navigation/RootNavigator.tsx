import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LaunchScreen from '../screens/LaunchScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import SecurityPinScreen from '../screens/SecurityPinScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import PasswordChangedScreen from '../screens/PasswordChangedScreen';
import FingerprintScreen from '../screens/FingerprintScreen';
import MainTabs from './MainTabs';
import NotificationScreen from '../screens/NotificationScreen';
import AccountBalanceScreen from '../screens/AccountBalanceScreen';
import QuickAnalysisScreen from '../screens/QuickAnalysisScreen';
import type { NavigatorScreenParams } from '@react-navigation/native';
import ProfileExtrasNavigator, { ProfileExtrasParamList } from './ProfileExtrasNavigator';

export type RootStackParamList = {
  Launch: undefined;
  Onboarding: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  SecurityPin: undefined;
  NewPassword: undefined;
  PasswordChanged: undefined;
  Fingerprint: undefined;
  Main: undefined;
  ProfileExtras: NavigatorScreenParams<ProfileExtrasParamList> | undefined;
  Notification: undefined;
  AccountBalance: undefined;
  QuickAnalysis: undefined;
};


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Launch" component={LaunchScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="SecurityPin" component={SecurityPinScreen} />
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
      <Stack.Screen name="PasswordChanged" component={PasswordChangedScreen} />
      <Stack.Screen name="Fingerprint" component={FingerprintScreen} />
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="AccountBalance" component={AccountBalanceScreen} />
      <Stack.Screen name="QuickAnalysis" component={QuickAnalysisScreen} />
      <Stack.Screen name="ProfileExtras" component={ProfileExtrasNavigator} />
    </Stack.Navigator>
  );
}