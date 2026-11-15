import { View, Text, StyleSheet } from 'react-native';
import { Transaction } from '../types';
import { colors, radius, spacing } from '../constants/theme';
import { formatMoney } from '../utils/format';

type Props = { item: Transaction };

export default function TransactionItem({ item }: Props) {
  const isIncome = item.type === 'income';
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <View style={styles.icon}>
          <Text style={styles.iconText}>{item.title[0]}</Text>
        </View>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.meta}>{item.category} · {item.date}</Text>
        </View>
      </View>
      <Text style={[styles.amount, { color: isIncome ? colors.income : colors.expense }]}>
        {isIncome ? '+' : '-'}{formatMoney(item.amount)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  icon: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#D6F5EA', justifyContent: 'center', alignItems: 'center',
  },
  iconText: { color: colors.primary, fontWeight: '700' },
  title: { color: colors.dark, fontWeight: '600' },
  meta: { color: colors.muted, fontSize: 12, marginTop: 2 },
  amount: { fontWeight: '600' },
});