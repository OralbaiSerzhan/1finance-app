import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenHeader } from '../components/FinanceUi';
import { TransactionItem } from '../components/TransactionItem';
import { COLORS, RADII } from '../constants/theme';
import { useAppContext } from '../context/AppContext';
import { RootStackParamList } from '../types';
import { formatCurrency } from '../utils/format';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type FilterMode = 'all' | 'income' | 'expense';

export const TransactionsScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const { transactions, totalBalance, totalIncome, totalExpense, user } = useAppContext();
  const [filter, setFilter] = useState<FilterMode>('all');

  const toggleFilter = (target: 'income' | 'expense') => {
    setFilter((prev) => (prev === target ? 'all' : target));
  };

  const filtered = useMemo(() => {
    if (filter === 'all') return transactions;
    return transactions.filter((t) => t.type === filter);
  }, [filter, transactions]);

  const months = useMemo(() => {
    const unique = Array.from(new Set(filtered.map((t) => t.month)));
    return unique;
  }, [filtered]);

  return (
    <SafeAreaView style={[styles.root, user.darkTheme && { backgroundColor: COLORS.darkBg }]}>
      <ScreenHeader
        title="Transaction"
        onBack={() => navigation.goBack()}
        onBellPress={() => navigation.navigate('Notifications')}
      />

      <View style={styles.cardsWrap}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>{formatCurrency(totalBalance)}</Text>
        </View>

        <View style={styles.splitRow}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => toggleFilter('income')}
            style={[styles.filterCard, filter === 'income' && styles.filterCardActive]}
          >
            <Ionicons
              name="arrow-up-circle-outline"
              size={20}
              color={filter === 'income' ? COLORS.surfaceWhite : COLORS.primaryDark}
            />
            <Text style={[styles.filterLabel, filter === 'income' && styles.activeText]}>
              Income
            </Text>
            <Text style={[styles.filterAmount, filter === 'income' && styles.activeText]}>
              {formatCurrency(totalIncome)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => toggleFilter('expense')}
            style={[styles.filterCard, filter === 'expense' && styles.filterCardActive]}
          >
            <Ionicons
              name="arrow-down-circle-outline"
              size={20}
              color={filter === 'expense' ? COLORS.surfaceWhite : COLORS.blueAccent}
            />
            <Text style={[styles.filterLabel, filter === 'expense' && styles.activeText]}>
              Expense
            </Text>
            <Text
              style={[
                styles.filterAmount,
                { color: COLORS.blueAccent },
                filter === 'expense' && styles.activeText,
              ]}
            >
              {formatCurrency(totalExpense)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.sheet, user.darkTheme && { backgroundColor: COLORS.darkSurface }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {months.map((month, idx) => (
            <View key={month} style={styles.monthSection}>
              <View style={styles.monthHeader}>
                <Text style={styles.monthTitle}>{month}</Text>
                {idx === 0 ? (
                  <TouchableOpacity
                    style={styles.calBtn}
                    onPress={() => navigation.navigate('Calendar')}
                  >
                    <Ionicons name="calendar-outline" size={16} color={COLORS.textDark} />
                  </TouchableOpacity>
                ) : null}
              </View>
              {filtered
                .filter((t) => t.month === month)
                .map((item) => (
                  <TransactionItem key={item.id} item={item} />
                ))}
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  cardsWrap: {
    paddingHorizontal: 20,
    paddingBottom: 18,
    gap: 10,
  },
  balanceCard: {
    backgroundColor: COLORS.surfaceWhite,
    borderRadius: RADII.md,
    paddingVertical: 14,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  balanceAmount: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  splitRow: {
    flexDirection: 'row',
    gap: 12,
  },
  filterCard: {
    flex: 1,
    backgroundColor: COLORS.surfaceWhite,
    borderRadius: RADII.md,
    paddingVertical: 12,
    alignItems: 'center',
    gap: 3,
  },
  filterCardActive: {
    backgroundColor: COLORS.blueAccent,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  filterAmount: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  activeText: {
    color: COLORS.surfaceWhite,
  },
  sheet: {
    flex: 1,
    backgroundColor: COLORS.backgroundMint,
    borderTopLeftRadius: RADII.xl,
    borderTopRightRadius: RADII.xl,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  monthSection: {
    marginBottom: 14,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  monthTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  calBtn: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
