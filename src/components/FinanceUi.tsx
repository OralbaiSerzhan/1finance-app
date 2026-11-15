import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const colors = {
  green: '#00D09E',
  dark: '#052224',
  light: '#F1FFF3',
  lightGreen: '#DFF7E2',
  blue: '#0068FF',
  lightBlue: '#6DB6FE',
  midBlue: '#3299FF',
};

type ShellProps = {
  title: string;
  onBack?: () => void;
  header?: React.ReactNode;
  children: React.ReactNode;
};

export function ScreenShell({ title, onBack, header, children }: ShellProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      <View style={s.topBar}>
        <Pressable onPress={onBack} hitSlop={12} style={s.side}>
          <Text style={s.back}>←</Text>
        </Pressable>
        <Text style={s.title}>{title}</Text>
        <View style={s.bell}>
          <Text style={{ fontSize: 14 }}>🔔</Text>
        </View>
      </View>
      {header}
      <View style={s.sheet}>
        <ScrollView
          contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </View>
    </View>
  );
}

type SummaryProps = { balance: string; expense: string; percent?: number; goal?: string };

export function BalanceSummary({ balance, expense, percent = 30, goal = '$20,000.00' }: SummaryProps) {
  return (
    <View style={s.summary}>
      <View style={s.summaryRow}>
        <View style={{ flex: 1 }}>
          <Text style={s.smallLight}>Total Balance</Text>
          <Text style={s.bigWhite}>{balance}</Text>
        </View>
        <View style={s.vDivider} />
        <View style={{ flex: 1, paddingLeft: 16 }}>
          <Text style={s.smallLight}>Total Expense</Text>
          <Text style={s.bigBlue}>{expense}</Text>
        </View>
      </View>
      <View style={s.progress}>
        <View style={[s.progressDark, { width: `${percent}%` }]}>
          <Text style={s.progressText}>{percent}%</Text>
        </View>
        <Text style={s.progressGoal}>{goal}</Text>
      </View>
      <Text style={s.hint}>☑ {percent}% Of Your Expenses, Looks Good.</Text>
    </View>
  );
}

type TxProps = {
  title: string;
  time: string;
  category: string;
  amount: string;
  negative?: boolean;
  tone?: 'light' | 'mid' | 'strong';
};

export function TxRow({ title, time, category, amount, negative, tone = 'mid' }: TxProps) {
  const bg =
    tone === 'light' ? colors.lightBlue : tone === 'strong' ? colors.blue : colors.midBlue;
  return (
    <View style={s.tx}>
      <View style={[s.txIcon, { backgroundColor: bg }]}>
        <Text style={{ fontSize: 18 }}>💳</Text>
      </View>
      <View style={{ flex: 1.4 }}>
        <Text style={s.txTitle}>{title}</Text>
        <Text style={s.txTime}>{time}</Text>
      </View>
      <View style={s.txDivider} />
      <Text style={s.txCat}>{category}</Text>
      <View style={s.txDivider} />
      <Text style={[s.txAmount, negative && { color: colors.blue }]}>{amount}</Text>
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
  side: { width: 32 },
  back: { fontSize: 24, color: '#fff' },
  title: { fontSize: 20, fontWeight: '700', color: colors.dark },
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
    marginTop: 16,
    backgroundColor: colors.light,
    borderTopLeftRadius: 56,
    borderTopRightRadius: 56,
    overflow: 'hidden',
  },
  summary: { paddingHorizontal: 24 },
  summaryRow: { flexDirection: 'row', alignItems: 'center' },
  vDivider: { width: 1, height: 44, backgroundColor: '#fff' },
  smallLight: { color: colors.dark, fontSize: 12 },
  bigWhite: { color: '#fff', fontSize: 24, fontWeight: '700' },
  bigBlue: { color: colors.blue, fontSize: 24, fontWeight: '700' },
  progress: {
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  progressDark: {
    height: 24,
    backgroundColor: colors.dark,
    justifyContent: 'center',
    paddingLeft: 10,
    borderRadius: 12,
  },
  progressText: { color: '#fff', fontSize: 11 },
  progressGoal: { position: 'absolute', right: 12, fontSize: 11, color: colors.dark, fontStyle: 'italic' },
  hint: { color: colors.dark, fontSize: 12, marginTop: 8 },
  tx: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  txIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  txTitle: { fontSize: 14, fontWeight: '600', color: colors.dark },
  txTime: { fontSize: 11, color: colors.blue, marginTop: 2 },
  txDivider: { width: 1, height: 36, backgroundColor: colors.green, marginHorizontal: 10 },
  txCat: { flex: 0.8, fontSize: 12, color: colors.dark, textAlign: 'center' },
  txAmount: { flex: 1, fontSize: 14, fontWeight: '600', color: colors.dark, textAlign: 'right' },
});
