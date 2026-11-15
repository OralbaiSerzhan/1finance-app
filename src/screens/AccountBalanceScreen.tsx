import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenShell, BalanceSummary, TxRow, colors } from '../components/FinanceUi';

export default function AccountBalanceScreen() {
  const navigation = useNavigation();
  return (
    <ScreenShell
      title="Account Balance"
      onBack={() => navigation.goBack()}
      header={
        <View>
          <BalanceSummary balance="$7,783.00" expense="-$1.187.40" />
          <View style={s.cards}>
            <View style={s.card}>
              <Text style={s.cardIcon}>↗</Text>
              <Text style={s.cardLabel}>Income</Text>
              <Text style={s.cardValue}>$4,000.00</Text>
            </View>
            <View style={s.card}>
              <Text style={[s.cardIcon, { color: colors.blue }]}>↘</Text>
              <Text style={s.cardLabel}>Expense</Text>
              <Text style={[s.cardValue, { color: colors.blue }]}>$1.187.40</Text>
            </View>
          </View>
        </View>
      }
    >
      <View style={s.head}>
        <Text style={s.headTitle}>Transactions</Text>
        <Pressable>
          <Text style={s.seeAll}>See all</Text>
        </Pressable>
      </View>
      <TxRow title="Salary" time="18:27 - April 30" category="Monthly" amount="$4,000,00" tone="light" />
      <TxRow title="Groceries" time="17:00 - April 24" category="Pantry" amount="-$100,00" negative />
      <TxRow title="Rent" time="8:30 - April 15" category="Rent" amount="-$674,40" negative tone="strong" />
      <TxRow title="Transport" time="9:30 - April 08" category="Fuel" amount="-$4,13" negative />
    </ScreenShell>
  );
}

const s = StyleSheet.create({
  cards: { flexDirection: 'row', gap: 16, paddingHorizontal: 24, marginTop: 16 },
  card: {
    flex: 1,
    backgroundColor: colors.light,
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 14,
  },
  cardIcon: { fontSize: 18, color: colors.green, fontWeight: '700' },
  cardLabel: { fontSize: 13, color: colors.dark, marginTop: 4 },
  cardValue: { fontSize: 16, fontWeight: '700', color: colors.dark, marginTop: 2 },
  head: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  headTitle: { fontSize: 16, fontWeight: '700', color: colors.dark },
  seeAll: { fontSize: 12, color: colors.dark },
});
