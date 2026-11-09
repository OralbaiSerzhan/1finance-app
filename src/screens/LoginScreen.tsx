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
      <TouchableOpacity>
        <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity>

      <PrimaryButton label="Sign Up" onPress={() => navigation.navigate('SignUp')} />

      <Text style={styles.footer}>
        Don't have an account?{' '}
        <Text style={styles.linkBold} onPress={() => navigation.navigate('SignUp')}>Sign Up</Text>
      </Text>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  link: { textAlign: 'center', color: colors.muted, marginTop: 8 },
  footer: { textAlign: 'center', color: colors.muted, marginTop: 24 },
  linkBold: { color: colors.primary, fontWeight: '600' },
});
