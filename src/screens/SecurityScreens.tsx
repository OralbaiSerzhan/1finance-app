import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ProfileExtrasParamList } from '../navigation/ProfileExtrasNavigator';
import { ScreenShell, colors } from '../components/FinanceUi';
import { MenuRow, Field, GreenButton } from '../components/ProfileUi';

type Nav = NativeStackNavigationProp<ProfileExtrasParamList>;

export function SecurityScreen() {
  const nav = useNavigation<Nav>();
  return (
    <ScreenShell title="Security" onBack={() => nav.goBack()}>
      <Text style={s.h}>Security</Text>
      <MenuRow label="Change Pin" onPress={() => nav.navigate('ChangePin')} />
      <MenuRow label="Fingerprint" onPress={() => nav.navigate('FingerprintList')} />
      <MenuRow label="Terms And Conditions" onPress={() => nav.navigate('Terms')} />
    </ScreenShell>
  );
}

export function ChangePinScreen() {
  const nav = useNavigation<Nav>();
  const [cur, setCur] = useState('');
  const [next, setNext] = useState('');
  const [conf, setConf] = useState('');

  const submit = () => {
    if (cur.length < 4 || next.length < 4) return Alert.alert('Pin', 'Pin кемінде 4 сан болуы керек');
    if (next !== conf) return Alert.alert('Pin', 'Жаңа pin екі жерде бірдей емес');
    nav.navigate('Success', { message: 'Pin Has Been\nChanged Successfully' });
  };

  return (
    <ScreenShell title="Change Pin" onBack={() => nav.goBack()}>
      <Field label="Current Pin" value={cur} onChangeText={setCur} keyboardType="number-pad" maxLength={6} />
      <Field label="New Pin" value={next} onChangeText={setNext} keyboardType="number-pad" maxLength={6} />
      <Field label="Confirm Pin" value={conf} onChangeText={setConf} keyboardType="number-pad" maxLength={6} />
      <GreenButton label="Change Pin" onPress={submit} style={{ marginTop: 12 }} />
    </ScreenShell>
  );
}

export function FingerprintListScreen() {
  const nav = useNavigation<Nav>();
  return (
    <ScreenShell title="Fingerprint" onBack={() => nav.goBack()}>
      <Pressable style={s.fpRow} onPress={() => nav.navigate('FingerprintDetail')}>
        <View style={[s.fpIcon, { backgroundColor: colors.lightBlue }]}>
          <Text style={{ fontSize: 18 }}>👆</Text>
        </View>
        <Text style={s.fpLabel}>John Fingerprint</Text>
        <Text style={s.chev}>›</Text>
      </Pressable>
      <Pressable style={s.fpRow} onPress={() => nav.navigate('AddFingerprint')}>
        <View style={[s.fpIcon, { backgroundColor: colors.midBlue }]}>
          <Text style={{ fontSize: 22, color: '#fff' }}>+</Text>
        </View>
        <Text style={s.fpLabel}>Add A Fingerprint</Text>
        <Text style={s.chev}>›</Text>
      </Pressable>
    </ScreenShell>
  );
}

export function FingerprintDetailScreen() {
  const nav = useNavigation<Nav>();
  return (
    <ScreenShell title="Jhon Fingerprint" onBack={() => nav.goBack()}>
      <View style={s.bigCircle}>
        <Text style={{ fontSize: 72 }}>👆</Text>
      </View>
      <View style={s.nameBox}>
        <Text style={s.nameText}>Jhon Fingerprint</Text>
      </View>
      <GreenButton
        label="Delete"
        style={{ marginTop: 40 }}
        onPress={() => nav.navigate('Success', { message: 'The Fingerprint Has\nBeen Successfully\nDeleted.' })}
      />
    </ScreenShell>
  );
}

export function AddFingerprintScreen() {
  const nav = useNavigation<Nav>();
  return (
    <ScreenShell title="Add Fingerprint" onBack={() => nav.goBack()}>
      <View style={s.bigCircle}>
        <Text style={{ fontSize: 72 }}>👆</Text>
      </View>
      <Text style={s.useTitle}>Use Fingerprint To Access</Text>
      <Text style={s.useText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
      </Text>
      <GreenButton
        label="Use Touch Id"
        soft
        style={{ alignSelf: 'stretch', marginTop: 24 }}
        onPress={() => nav.navigate('Success', { message: 'Fingerprint Has Been\nChanged Successfully' })}
      />
    </ScreenShell>
  );
}

export function TermsScreen() {
  const nav = useNavigation<Nav>();
  const [ok, setOk] = useState(false);
  return (
    <ScreenShell title="Terms And Conditions" onBack={() => nav.goBack()}>
      <Text style={s.tTitle}>Est Fugiat Assumenda Aut Reprehenderit</Text>
      <Text style={s.tText}>
        Lorem ipsum dolor sit amet. Et odio officia aut voluptate internos est omnis vitae ut architecto
        sunt non tenetur fuga ut provident vero. Quo aspernatur facere et consectetur ipsum et facere
        corrupti sit asperiores facere.
      </Text>
      <Text style={s.tText}>
        1. Ea voluptates omnis aut sequi sequi.{'\n'}
        2. Est dolore quae in aliquid ducimus et autem repellendus.{'\n'}
        3. Aut ipsum Quis qui porro quosi aut minus placeat!{'\n'}
        4. Sit consequatur neque ab vitae facere.
      </Text>
      <Text style={s.tText}>
        Aut quidem accusantium nam alias autem eum officiis placeat et omnis autem id officiis
        perspiciatis aut corrupti officiis eum aliquam provident.
      </Text>
      <Pressable style={s.check} onPress={() => setOk((v) => !v)}>
        <Text style={{ fontSize: 16 }}>{ok ? '☑' : '☐'}</Text>
        <Text style={s.checkText}>I accept all the terms and conditions</Text>
      </Pressable>
      <GreenButton
        label="Accept"
        disabled={!ok}
        style={{ marginTop: 12 }}
        onPress={() => nav.goBack()}
      />
    </ScreenShell>
  );
}

const s = StyleSheet.create({
  h: { fontSize: 15, fontWeight: '700', color: colors.dark, marginBottom: 8 },
  fpRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  fpIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  fpLabel: { flex: 1, fontSize: 13, color: colors.dark },
  chev: { fontSize: 22, color: colors.dark },
  bigCircle: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 28,
  },
  nameBox: { backgroundColor: colors.lightGreen, borderRadius: 12, paddingVertical: 10, alignItems: 'center' },
  nameText: { fontSize: 13, fontWeight: '700', color: colors.dark },
  useTitle: { fontSize: 15, fontWeight: '700', color: colors.dark, textAlign: 'center' },
  useText: { fontSize: 11, color: colors.dark, textAlign: 'center', marginTop: 8 },
  tTitle: { fontSize: 13, fontWeight: '700', color: colors.dark, marginBottom: 10 },
  tText: { fontSize: 11, lineHeight: 16, color: colors.dark, marginBottom: 12 },
  check: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  checkText: { fontSize: 11, color: colors.dark },
});
