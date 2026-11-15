import { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import AuthLayout from '../components/AuthLayout';
import AppInput from '../components/AppInput';
import PrimaryButton from '../components/PrimaryButton';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export default function SignUpScreen({ navigation }: Props) {
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', birthDate: '', password: '', confirm: '',
  });

  const update = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <AuthLayout title="Create Account">
      <AppInput label="Full Name" placeholder="Full Name" value={form.fullName} onChangeText={update('fullName')} />
      <AppInput label="Email" placeholder="example@example.com" value={form.email} onChangeText={update('email')} />
      <AppInput label="Mobile Number" placeholder="+ 123 456 789" value={form.phone} onChangeText={update('phone')} />
      <AppInput label="Date Of Birth" placeholder="DD / MM / YYYY" value={form.birthDate} onChangeText={update('birthDate')} />
      <AppInput label="Password" secure value={form.password} onChangeText={update('password')} />
      <AppInput label="Confirm Password" secure value={form.confirm} onChangeText={update('confirm')} />

      <PrimaryButton label="Sign Up" onPress={() => navigation.replace('Login')} />
    </AuthLayout>
  );
}
