import { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import AuthLayout from '../components/AuthLayout';
import AppInput from '../components/AppInput';
import PrimaryButton from '../components/PrimaryButton';

type Props = NativeStackScreenProps<RootStackParamList, 'NewPassword'>;

export default function NewPasswordScreen({ navigation }: Props) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  return (
    <AuthLayout title="New Password">
      <AppInput label="New Password" secure value={password} onChangeText={setPassword} />
      <AppInput label="Confirm New Password" secure value={confirm} onChangeText={setConfirm} />
      <PrimaryButton label="Change Password" onPress={() => navigation.navigate('PasswordChanged')} />
    </AuthLayout>
  );
}