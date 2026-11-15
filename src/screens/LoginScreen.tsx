import { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import AuthLayout from '../components/AuthLayout';
import AppInput from '../components/AppInput';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../constants/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AuthLayout title="Welcome">
      <AppInput label="Username Or Email" placeholder="example@example.com" value={email} onChangeText={setEmail} />
      <AppInput label="Password" placeholder="********" secure value={password} onChangeText={setPassword} />

      <PrimaryButton label="Log In" onPress={() => navigation.replace('Main')} />

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity>

      <PrimaryButton label="Sign Up" onPress={() => navigation.navigate('SignUp')} />

      <TouchableOpacity onPress={() => navigation.navigate('Fingerprint')}>
        <Text style={styles.link}>
          Use <Text style={styles.linkBold}>Fingerprint</Text> To Access
        </Text>
      </TouchableOpacity>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  link: { textAlign: 'center', color: colors.muted, marginTop: 12 },
  linkBold: { color: colors.primary, fontWeight: '600' },
});