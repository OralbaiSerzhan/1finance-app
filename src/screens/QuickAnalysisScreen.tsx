import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenShell, TxRow, colors } from '../components/FinanceUi';

// [income, expense] — биіктігі 0..1
const WEEKS: { label: string; income: number; expense: number }[] = [
  { label: '1st Week', income: 0.22, expense: 0.38 },
  { label: '2nd Week', income: 0.18, expense: 0.55 },
  { label: '3rd Week', income: 0.38, expense: 0.85 },
  { label: '4th Week', income: 0.7, expense: 0.5 },
];
const Y = ['15k', '10k', '5k', '1k'];

export default function QuickAnalysisScreen() {
  const navigation = useNavigation();
  return (
    <ScreenShell
      title="Quickly Analysis"
      onBack={() => navigation.goBack()}
      header={
        <View style={s.top}>
          <View style={s.ring}>
            <Text style={{ fontSize: 28 }}>🚗</Text>
            <Text style={s.ringText}>Savings{'\n'}On Goals</Text>
          </View>
          <View style={s.vDivider} />
          <View style={{ flex: 1, paddingLeft: 16 }}>
            <Text style={s.small}>Revenue Last Week</Text>
            <Text style={s.value}>$4.000.00</Text>
            <View style={s.hLine} />
            <Text style={s.small}>Food Last Week</Text>
            <Text style={[s.value, { color: colors.blue }]}>- $100.00</Text>
          </View>
        </View>
      }
    >
      <View style={s.chartCard}>
        <Text style={s.chartTitle}>April Expenses</Text>
        <View style={s.chartBody}>
          <View style={s.yAxis}>
            {Y.map((y) => (
              <Text key={y} style={s.yLabel}>{y}</Text>
            ))}
          </View>
          <View style={s.bars}>
            {WEEKS.map((w) => (
              <View key={w.label} style={s.group}>
                <View style={s.pair}>
                  <View style={[s.bar, { height: 110 * w.income, backgroundColor: colors.green }]} />
                  <View style={[s.bar, { height: 110 * w.expense, backgroundColor: colors.blue }]} />
                </View>
                <Text style={s.xLabel}>{w.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <TxRow title="Salary" time="18:27 - April 30" category="Monthly" amount="$4,000,00" tone="light" />
      <TxRow title="Groceries" time="17:00 - April 24" category="Pantry" amount="-$100,00" negative />
      <TxRow title="Rent" time="8:30 - April 15" category="Rent" amount="-$674,40" negative tone="strong" />
    </ScreenShell>
  );
}

const s = StyleSheet.create({
  top: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingTop: 8 },
  ring: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: colors.blue,
    backgroundColor: colors.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringText: { fontSize: 9, textAlign: 'center', color: colors.dark, marginTop: 2 },
  vDivider: { width: 1, height: 90, backgroundColor: '#fff', marginLeft: 16 },
  small: { fontSize: 11, color: colors.dark },
  value: { fontSize: 18, fontWeight: '700', color: colors.dark, marginBottom: 6 },
  hLine: { height: 1, backgroundColor: '#fff', marginBottom: 8 },
  chartCard: { backgroundColor: colors.lightGreen, borderRadius: 24, padding: 16, marginBottom: 20 },
  chartTitle: { fontSize: 13, fontWeight: '600', color: colors.dark, marginBottom: 12 },
  chartBody: { flexDirection: 'row', height: 150 },
  yAxis: { justifyContent: 'space-between', paddingBottom: 18, marginRight: 8 },
  yLabel: { fontSize: 9, color: colors.midBlue },
  bars: { flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end' },
  group: { alignItems: 'center' },
  pair: { flexDirection: 'row', alignItems: 'flex-end', gap: 4, height: 120 },
  bar: { width: 6, borderRadius: 3 },
  xLabel: { fontSize: 9, color: colors.dark, marginTop: 6 },
});
