import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { colors, radius, spacing } from '../constants/theme';

const transactions = [
  { title: 'Salary', amount: '+$4,000.00' },
  { title: 'Groceries', amount: '-$105.00' },
  { title: 'Rent', amount: '-$574.40' },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hi, Welcome Back</Text>
        <Text style={styles.sub}>Good Morning</Text>
      </View>

      <ScrollView style={styles.card} contentContainerStyle={{ padding: spacing.lg }}>
        <View style={styles.balanceRow}>
          <View>
            <Text style={styles.label}>Total Balance</Text>
            <Text style={styles.amount}>$7,783.00</Text>
          </View>
          <View>
            <Text style={styles.label}>Total Expense</Text>
            <Text style={[styles.amount, { color: colors.expense }]}>-$1,187.40</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        {transactions.map((t) => (
          <View key={t.title} style={styles.item}>
            <Text style={styles.itemTitle}>{t.title}</Text>
            <Text style={styles.itemAmount}>{t.amount}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primary },
  header: { paddingTop: 60, paddingHorizontal: spacing.lg, paddingBottom: 30 },
  greeting: { color: colors.white, fontSize: 20, fontWeight: '700' },
  sub: { color: colors.white, opacity: 0.8 },
  card: { flex: 1, backgroundColor: colors.background, borderTopLeftRadius: 30, borderTopRightRadius: 30 },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: radius.md,
  },
  label: { color: colors.muted, fontSize: 12 },
  amount: { color: colors.dark, fontSize: 18, fontWeight: '700' },
  sectionTitle: { color: colors.dark, fontWeight: '700', fontSize: 16, marginTop: spacing.lg, marginBottom: spacing.sm },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
  },
  itemTitle: { color: colors.dark, fontWeight: '600' },
  itemAmount: { color: colors.dark },
});
