import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADII } from '../constants/theme';
import { CategoryId, Transaction } from '../types';
import { formatCurrency } from '../utils/format';

const CATEGORY_ICON_MAP: Record<CategoryId, keyof typeof Ionicons.glyphMap> = {
  food: 'restaurant-outline',
  transport: 'bus-outline',
  medicine: 'medkit-outline',
  groceries: 'bag-handle-outline',
  rent: 'key-outline',
  gifts: 'gift-outline',
  savings: 'wallet-outline',
  entertainment: 'film-outline',
  salary: 'cash-outline',
  others: 'layers-outline',
};

interface TransactionItemProps {
  item: Transaction;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ item }) => {
  const isIncome = item.type === 'income';
  const iconName = CATEGORY_ICON_MAP[item.category] ?? 'cash-outline';

  return (
    <View style={styles.row}>
      <View style={[styles.iconBox, { backgroundColor: isIncome ? COLORS.blueSoft : COLORS.blueAccent }]}>
        <Ionicons name={iconName} size={22} color={COLORS.surfaceWhite} />
      </View>

      <View style={styles.middle}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.time}>
          {item.time} - {item.dateLabel}
        </Text>
      </View>

      <View style={styles.divider} />
      <Text style={styles.subtitle}>{item.subtitle}</Text>
      <View style={styles.divider} />

      <Text style={[styles.amount, isIncome ? styles.incomeText : styles.expenseText]}>
        {isIncome ? formatCurrency(item.amount) : `-${formatCurrency(item.amount)}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: RADII.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  middle: {
    flex: 1.2,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  time: {
    fontSize: 11,
    color: COLORS.blueAccent,
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: COLORS.primary,
    marginHorizontal: 8,
    opacity: 0.4,
  },
  subtitle: {
    flex: 0.7,
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  amount: {
    flex: 0.9,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'right',
  },
  incomeText: {
    color: COLORS.textDark,
  },
  expenseText: {
    color: COLORS.blueAccent,
  },
});
