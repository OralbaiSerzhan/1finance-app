import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADII } from '../constants/theme';
import { ChartBarPoint } from '../data/mockData';

interface BarChartProps {
  data: ChartBarPoint[];
  onPressSearch?: () => void;
  onPressCalendar?: () => void;
}

export const BarChart = ({
  data,
  onPressSearch,
  onPressCalendar,
}: BarChartProps) => {
  const maxValue = Math.max(
    ...data.flatMap((d: ChartBarPoint) => [d.income, d.expense]),
    1
  );

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Income & Expenses</Text>
        <View style={styles.actions}>
          {onPressSearch ? (
            <TouchableOpacity style={styles.iconBtn} onPress={onPressSearch}>
              <Ionicons name="search-outline" size={16} color={COLORS.textDark} />
            </TouchableOpacity>
          ) : null}
          {onPressCalendar ? (
            <TouchableOpacity style={styles.iconBtn} onPress={onPressCalendar}>
              <Ionicons name="calendar-outline" size={16} color={COLORS.textDark} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <View style={styles.chartArea}>
        {data.map((item: ChartBarPoint) => {
          const incomeHeight = Math.max(8, (item.income / maxValue) * 110);
          const expenseHeight = Math.max(8, (item.expense / maxValue) * 110);
          return (
            <View key={item.label} style={styles.group}>
              <View style={styles.barsRow}>
                <View style={[styles.bar, styles.incomeBar, { height: incomeHeight }]} />
                <View style={[styles.bar, styles.expenseBar, { height: expenseHeight }]} />
              </View>
              <Text style={styles.xLabel}>{item.label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardLight,
    borderRadius: RADII.lg,
    padding: 16,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartArea: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 140,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  group: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  barsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    marginBottom: 6,
  },
  bar: {
    width: 7,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  incomeBar: {
    backgroundColor: COLORS.primary,
  },
  expenseBar: {
    backgroundColor: COLORS.blueAccent,
  },
  xLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
});
