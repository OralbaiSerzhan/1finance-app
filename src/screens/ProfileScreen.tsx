import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { colors } from '../components/FinanceUi';
import LogoutDialog from '../components/LogoutDialog';

type Item = { key: string; label: string; icon: string; tone: string };

const ITEMS: Item[] = [
  { key: 'edit', label: 'Edit Profile', icon: '👤', tone: colors.lightBlue },
  { key: 'security', label: 'Security', icon: '🛡', tone: colors.midBlue },
  { key: 'settings', label: 'Setting', icon: '⚙', tone: colors.blue },
  { key: 'help', label: 'Help', icon: '❓', tone: colors.lightBlue },
  { key: 'logout', label: 'Logout', icon: '⎋', tone: colors.midBlue },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  // Хук ЦЕХТЫҢ ІШІНДЕ болуы керек
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [showLogout, setShowLogout] = useState(false);

  const onPress = (key: string) => {
    switch (key) {
      case 'edit':
        Alert.alert('Edit Profile', 'Бұл экран әзірше жасалмаған');
        break;
      case 'security':
        navigation.navigate('ProfileExtras', { screen: 'Security' });
        break;
      case 'settings':
        navigation.navigate('ProfileExtras', { screen: 'Settings' });
        break;
      case 'help':
        navigation.navigate('ProfileExtras', { screen: 'OnlineSupport' });
        break;
      case 'logout':
        setShowLogout(true);
        break;
    }
  };

  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      <View style={s.topBar}>
        <Text style={s.title}>Profile</Text>
        <Pressable style={s.bell} onPress={() => navigation.navigate('Notification')} hitSlop={10}>
          <Text style={{ fontSize: 14 }}>🔔</Text>
        </Pressable>
      </View>

      <View style={s.avatarWrap}>
        <View style={s.avatar}>
          <Text style={{ fontSize: 48 }}>👤</Text>
        </View>
      </View>

      <View style={s.sheet}>
        <Text style={s.name}>John Smith</Text>
        <Text style={s.id}>ID: 25030024</Text>

        <View style={{ marginTop: 24 }}>
          {ITEMS.map((it) => (
            <Pressable key={it.key} style={s.row} onPress={() => onPress(it.key)}>
              <View style={[s.icon, { backgroundColor: it.tone }]}>
                <Text style={{ fontSize: 16, color: '#fff' }}>{it.icon}</Text>
              </View>
              <Text style={s.label}>{it.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <LogoutDialog
        visible={showLogout}
        onCancel={() => setShowLogout(false)}
        onConfirm={() => {
          setShowLogout(false);
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        }}
      />
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.green },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  title: { flex: 1, textAlign: 'center', fontSize: 20, fontWeight: '700', color: colors.dark, marginLeft: 32 },
  bell: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarWrap: { alignItems: 'center', zIndex: 2, marginBottom: -50 },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.lightGreen,
    borderWidth: 3,
    borderColor: colors.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheet: {
    flex: 1,
    marginTop: 0,
    paddingTop: 64,
    paddingHorizontal: 32,
    backgroundColor: colors.light,
    borderTopLeftRadius: 56,
    borderTopRightRadius: 56,
  },
  name: { fontSize: 18, fontWeight: '700', color: colors.dark, textAlign: 'center' },
  id: { fontSize: 12, color: colors.dark, textAlign: 'center', marginTop: 2 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 22 },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  label: { fontSize: 14, color: colors.dark, fontWeight: '500' },
});
