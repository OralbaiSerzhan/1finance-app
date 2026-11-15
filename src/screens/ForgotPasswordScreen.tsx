import { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import AuthLayout from '../components/AuthLayout';
import AppInput from '../components/AppInput';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../constants/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>;

export default function ForgotPasswordScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');

  return (
    <AuthLayout title="Forgot Password">
      <Text style={styles.heading}>Reset Password?</Text>
      <Text style={styles.text}>
        Enter the email address linked to your account and we will help you reset it.
      </Text>
      <AppInput label="Enter Email Address" placeholder="example@example.com" value={email} onChangeText={setEmail} />
      <PrimaryButton label="Next Step" onPress={() => navigation.navigate('SecurityPin')} />
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  heading: { color: colors.dark, fontWeight: '700', fontSize: 16, marginBottom: 8 },
  text: { color: colors.muted, marginBottom: 20 },
});