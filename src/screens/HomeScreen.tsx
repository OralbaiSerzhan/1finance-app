import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { BalanceSummary, TxRow, colors } from '../components/FinanceUi';

type Period = 'Daily' | 'Weekly' | 'Monthly';
const PERIODS: Period[] = ['Daily', 'Weekly', 'Monthly'];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [period, setPeriod] = useState<Period>('Monthly');

  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      <View style={s.topBar}>
        <View>
          <Text style={s.hi}>Hi, Welcome Back</Text>
          <Text style={s.morning}>Good Morning</Text>
        </View>
        <Pressable style={s.bell} onPress={() => navigation.navigate('Notification')} hitSlop={10}>
          <Text style={{ fontSize: 14 }}>🔔</Text>
        </Pressable>
      </View>

      <Pressable onPress={() => navigation.navigate('AccountBalance')}>
        <BalanceSummary balance="$7,783.00" expense="-$1.187.40" />
      </Pressable>

      <View style={s.sheet}>
        <ScrollView
          contentContainerStyle={{ padding: 24, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          <Pressable style={s.goals} onPress={() => navigation.navigate('QuickAnalysis')}>
            <View style={s.ring}>
              <Text style={{ fontSize: 26 }}>🚗</Text>
              <Text style={s.ringText}>Savings{'\n'}On Goals</Text>
            </View>
            <View style={s.vDivider} />
            <View style={{ flex: 1, paddingLeft: 16 }}>
              <Text style={s.small}>Revenue Last Week</Text>
              <Text style={s.value}>$4.000.00</Text>
              <View style={s.hLine} />
              <Text style={s.small}>Food Last Week</Text>
              <Text style={[s.value, { color: colors.blue }]}>-$100.00</Text>
            </View>
          </Pressable>

          <View style={s.toggle}>
            {PERIODS.map((p) => (
              <Pressable
                key={p}
                onPress={() => setPeriod(p)}
                style={[s.toggleItem, period === p && s.toggleActive]}
              >
                <Text style={[s.toggleText, period === p && { color: colors.dark, fontWeight: '600' }]}>
                  {p}
                </Text>
              </Pressable>
            ))}
          </View>

          <TxRow title="Salary" time="18:27 - April 30" category="Monthly" amount="$4,000,00" tone="light" />
          <TxRow title="Groceries" time="17:00 - April 24" category="Pantry" amount="-$100,00" negative />
          <TxRow title="Rent" time="8:30 - April 15" category="Rent" amount="-$674,40" negative tone="strong" />
        </ScrollView>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.green },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  hi: { fontSize: 20, fontWeight: '700', color: colors.dark },
  morning: { fontSize: 12, color: colors.dark },
  bell: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheet: {
    flex: 1,
    marginTop: 20,
    backgroundColor: colors.light,
    borderTopLeftRadius: 56,
    borderTopRightRadius: 56,
    overflow: 'hidden',
  },
  goals: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.green,
    borderRadius: 24,
    padding: 16,
    marginBottom: 20,
  },
  ring: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 4,
    borderColor: colors.blue,
    backgroundColor: colors.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringText: { fontSize: 8, textAlign: 'center', color: colors.dark },
  vDivider: { width: 1, height: 80, backgroundColor: '#fff', marginLeft: 16 },
  small: { fontSize: 10, color: colors.dark },
  value: { fontSize: 16, fontWeight: '700', color: colors.dark, marginBottom: 4 },
  hLine: { height: 1, backgroundColor: '#fff', marginBottom: 6 },
  toggle: {
    flexDirection: 'row',
    backgroundColor: colors.lightGreen,
    borderRadius: 16,
    padding: 4,
    marginBottom: 20,
  },
  toggleItem: { flex: 1, alignItems: 'center', paddingVertical: 8, borderRadius: 14 },
  toggleActive: { backgroundColor: colors.green },
  toggleText: { fontSize: 12, color: colors.dark },
});
