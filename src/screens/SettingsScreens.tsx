import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ProfileExtrasParamList } from '../navigation/ProfileExtrasNavigator';
import { ScreenShell, colors } from '../components/FinanceUi';
import { MenuRow, Field, GreenButton } from '../components/ProfileUi';

type Nav = NativeStackNavigationProp<ProfileExtrasParamList>;

export function SettingsScreen() {
  const nav = useNavigation<Nav>();
  return (
    <ScreenShell title="Settings" onBack={() => nav.goBack()}>
      <MenuRow icon="🔔" label="Notification Settings" onPress={() => nav.navigate('NotificationSettings')} />
      <MenuRow icon="🔑" label="Password Settings" onPress={() => nav.navigate('PasswordSettings')} />
      <MenuRow icon="👤" label="Delete Account" onPress={() => nav.navigate('DeleteAccount')} />
    </ScreenShell>
  );
}

const SWITCHES: { key: string; label: string; on: boolean }[] = [
  { key: 'general', label: 'General Notification', on: true },
  { key: 'sound', label: 'Sound', on: true },
  { key: 'call', label: 'Sound Call', on: true },
  { key: 'vibrate', label: 'Vibrate', on: true },
  { key: 'tx', label: 'Transaction Update', on: false },
  { key: 'expense', label: 'Expense Reminder', on: false },
  { key: 'budget', label: 'Budget Notifications', on: false },
  { key: 'low', label: 'Low Balance Alerts', on: false },
];

export function NotificationSettingsScreen() {
  const nav = useNavigation<Nav>();
  const [state, setState] = useState<Record<string, boolean>>(
    Object.fromEntries(SWITCHES.map((x) => [x.key, x.on])),
  );
  return (
    <ScreenShell title="Notification Settings" onBack={() => nav.goBack()}>
      {SWITCHES.map((x) => (
        <View key={x.key} style={s.switchRow}>
          <Text style={s.switchLabel}>{x.label}</Text>
          <Switch
            value={state[x.key]}
            onValueChange={(v) => setState((p) => ({ ...p, [x.key]: v }))}
            trackColor={{ false: colors.lightGreen, true: colors.green }}
            thumbColor="#fff"
          />
        </View>
      ))}
    </ScreenShell>
  );
}

export function PasswordSettingsScreen() {
  const nav = useNavigation<Nav>();
  const [cur, setCur] = useState('');
  const [next, setNext] = useState('');
  const [conf, setConf] = useState('');

  const submit = () => {
    if (!cur || next.length < 8) return Alert.alert('Password', 'Жаңа құпиясөз кемінде 8 таңба болуы керек');
    if (next !== conf) return Alert.alert('Password', 'Жаңа құпиясөздер бірдей емес');
    nav.navigate('Success', { message: 'Password Has Been\nChanged Successfully' });
  };

  return (
    <ScreenShell title="Password Settings" onBack={() => nav.goBack()}>
      <Field label="Current Password" value={cur} onChangeText={setCur} />
      <Field label="New Password" value={next} onChangeText={setNext} />
      <Field label="Confirm New Password" value={conf} onChangeText={setConf} />
      <GreenButton label="Change Password" onPress={submit} style={{ marginTop: 12 }} />
    </ScreenShell>
  );
}

export function DeleteAccountScreen() {
  const nav = useNavigation<Nav>();
  const [pwd, setPwd] = useState('');

  const doDelete = () => {
    if (!pwd) return Alert.alert('Delete Account', 'Құпиясөзді енгізіңіз');
    // Демо: нақты өшіру жоқ, тек Login экранына қайтады
    (nav.getParent() as any)?.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <ScreenShell title="Delete Account" onBack={() => nav.goBack()}>
      <Text style={s.q}>Are You Sure You Want To Delete Your Account?</Text>
      <View style={s.warn}>
        <Text style={s.warnText}>
          This action will permanently delete all of your data, and you will not be able to recover it.
          Please keep the following in mind before proceeding.
        </Text>
        <Text style={s.warnText}>• All your expenses, income and associated transactions will be eliminated.</Text>
        <Text style={s.warnText}>• You will not be able to access your account or any related information.</Text>
        <Text style={s.warnText}>• This action cannot be undone.</Text>
      </View>
      <Text style={[s.q, { fontSize: 12, marginTop: 20 }]}>
        Please Enter Your Password To Confirm Deletion Of Your Account.
      </Text>
      <View style={{ marginTop: 10 }}>
        <Field label="" value={pwd} onChangeText={setPwd} />
      </View>
      <GreenButton label="Yes, Delete Account" onPress={doDelete} style={{ marginTop: 4 }} />
      <GreenButton label="Cancel" soft onPress={() => nav.goBack()} style={{ marginTop: 10 }} />
    </ScreenShell>
  );
}

const s = StyleSheet.create({
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  switchLabel: { fontSize: 13, color: colors.dark },
  q: { fontSize: 14, fontWeight: '600', color: colors.dark, textAlign: 'center' },
  warn: { backgroundColor: colors.lightGreen, borderRadius: 12, padding: 14, marginTop: 14 },
  warnText: { fontSize: 11, lineHeight: 16, color: colors.dark, marginBottom: 8 },
});
