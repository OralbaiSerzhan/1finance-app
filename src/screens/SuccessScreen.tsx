import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ProfileExtrasParamList } from '../navigation/ProfileExtrasNavigator';
import { colors } from '../components/FinanceUi';

export default function SuccessScreen() {
  const nav = useNavigation<NativeStackNavigationProp<ProfileExtrasParamList>>();
  const { params } = useRoute<RouteProp<ProfileExtrasParamList, 'Success'>>();

  // 2.5 секундтан кейін автоматты түрде бастапқы экранға қайтады
  useEffect(() => {
    const t = setTimeout(() => nav.popToTop(), 2500);
    return () => clearTimeout(t);
  }, [nav]);

  return (
    <Pressable style={s.root} onPress={() => nav.popToTop()}>
      <View style={s.ring}>
        <View style={s.dot} />
      </View>
      <Text style={s.msg}>{params.message}</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.green, alignItems: 'center', justifyContent: 'center' },
  ring: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 6,
    borderColor: colors.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.light, position: 'absolute', left: 22, top: 40 },
  msg: { marginTop: 24, fontSize: 15, fontWeight: '700', color: colors.light, textAlign: 'center', lineHeight: 22 },
});
