import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADII } from '../constants/theme';
import { formatCurrency } from '../utils/format';

interface ScreenHeaderProps {
  title: string;
  onBack?: () => void;
  onBellPress?: () => void;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  onBack,
  onBellPress,
}) => {
  return (
    <View style={styles.header}>
      {onBack ? (
        <TouchableOpacity onPress={onBack} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={22} color={COLORS.textDark} />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
      <Text style={styles.headerTitle}>{title}</Text>
      {onBellPress ? (
        <TouchableOpacity onPress={onBellPress} style={styles.bellButton}>
          <Ionicons name="notifications-outline" size={18} color={COLORS.textDark} />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
};

interface BalanceSummaryCardProps {
  totalBalance: number;
  totalExpense: number;
  goalAmount?: number;
}

export const BalanceSummaryCard: React.FC<BalanceSummaryCardProps> = ({
  totalBalance,
  totalExpense,
  goalAmount = 20000,
}) => {
  const pct = Math.min(100, Math.round((totalExpense / goalAmount) * 100));

  return (
    <View style={styles.summaryWrapper}>
      <View style={styles.statsRow}>
        <View style={styles.statCol}>
          <Text style={styles.statLabel}>Total Balance</Text>
          <Text style={styles.balanceValue}>{formatCurrency(totalBalance)}</Text>
        </View>
        <View style={styles.vertLine} />
        <View style={styles.statCol}>
          <Text style={styles.statLabel}>Total Expense</Text>
          <Text style={styles.expenseValue}>-{formatCurrency(totalExpense)}</Text>
        </View>
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${Math.max(pct, 20)}%` }]}>
          <Text style={styles.progressPct}>{pct}%</Text>
        </View>
        <Text style={styles.goalText}>{formatCurrency(goalAmount)}</Text>
      </View>

      <View style={styles.hintRow}>
        <Ionicons name="checkbox-outline" size={14} color={COLORS.textDark} />
        <Text style={styles.hintText}>{pct}% Of Your Expenses, Looks Good.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 14,
  },
  iconButton: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.surfaceWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    width: 34,
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  summaryWrapper: {
    paddingHorizontal: 22,
    paddingBottom: 18,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statCol: {
    flex: 1,
  },
  vertLine: {
    width: 1,
    height: 36,
    backgroundColor: COLORS.surfaceWhite,
    marginHorizontal: 14,
    opacity: 0.6,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textDark,
    marginBottom: 2,
  },
  balanceValue: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.surfaceWhite,
  },
  expenseValue: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.blueAccent,
  },
  progressTrack: {
    height: 24,
    borderRadius: RADII.full,
    backgroundColor: COLORS.surfaceWhite,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.textDark,
    borderRadius: RADII.full,
    justifyContent: 'center',
    paddingLeft: 12,
  },
  progressPct: {
    color: COLORS.surfaceWhite,
    fontSize: 11,
    fontWeight: '700',
  },
  goalText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  hintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  hintText: {
    fontSize: 12,
    color: COLORS.textDark,
    fontWeight: '500',
  },
});
