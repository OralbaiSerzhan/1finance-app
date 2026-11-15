import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BarChart } from '../components/BarChart';
import { BalanceSummaryCard, ScreenHeader } from '../components/FinanceUi';
import { PeriodToggle } from '../components/PeriodToggle';
import { COLORS, RADII } from '../constants/theme';
import { useAppContext } from '../context/AppContext';
import { CHART_DATA_BY_PERIOD, MY_TARGETS, TOTALS_BY_PERIOD } from '../data/mockData';
import { PeriodOption, RootStackParamList } from '../types';
import { formatCurrency } from '../utils/format';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export const StatsScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const { totalBalance, totalExpense, user } = useAppContext();
  const [period, setPeriod] = useState<PeriodOption>('Daily');

  const chartData = CHART_DATA_BY_PERIOD[period];
  const periodTotals = TOTALS_BY_PERIOD[period];

  return (
    <SafeAreaView style={[styles.root, user.darkTheme && { backgroundColor: COLORS.darkBg }]}>
      <ScreenHeader
        title="Analysis"
        onBack={() => navigation.goBack()}
        onBellPress={() => navigation.navigate('Notifications')}
      />
      <BalanceSummaryCard totalBalance={totalBalance} totalExpense={totalExpense} />

      <View style={[styles.sheet, user.darkTheme && { backgroundColor: COLORS.darkSurface }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <PeriodToggle value={period} onChange={setPeriod} />

          <BarChart
            data={chartData}
            onPressSearch={() => navigation.navigate('Search')}
            onPressCalendar={() => navigation.navigate('Calendar')}
          />

          <View style={styles.totalsRow}>
            <View style={styles.totalBox}>
              <Ionicons name="arrow-up-circle-outline" size={22} color={COLORS.primaryDark} />
              <Text style={styles.totalLabel}>Income</Text>
              <Text style={styles.incomeVal}>{formatCurrency(periodTotals.income)}</Text>
            </View>
            <View style={styles.totalBox}>
              <Ionicons name="arrow-down-circle-outline" size={22} color={COLORS.blueAccent} />
              <Text style={styles.totalLabel}>Expense</Text>
              <Text style={styles.expenseVal}>{formatCurrency(periodTotals.expense)}</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>My Targets</Text>
          <View style={styles.targetsRow}>
            {MY_TARGETS.map((target) => (
              <View key={target.id} style={styles.targetCard}>
                <View style={styles.circle}>
                  <Text style={styles.pctText}>{target.progress}%</Text>
                </View>
                <Text style={styles.targetTitle}>{target.title}</Text>
              </View>
            ))}
          </View>
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
  sheet: {
    flex: 1,
    backgroundColor: COLORS.backgroundMint,
    borderTopLeftRadius: RADII.xl,
    borderTopRightRadius: RADII.xl,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  totalBox: {
    alignItems: 'center',
    gap: 4,
  },
  totalLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  incomeVal: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  expenseVal: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.blueAccent,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 12,
  },
  targetsRow: {
    flexDirection: 'row',
    gap: 14,
    paddingBottom: 24,
  },
  targetCard: {
    flex: 1,
    backgroundColor: COLORS.blueSoft,
    borderRadius: RADII.lg,
    paddingVertical: 18,
    alignItems: 'center',
    gap: 10,
  },
  circle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 5,
    borderColor: COLORS.surfaceWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pctText: {
    color: COLORS.surfaceWhite,
    fontWeight: '700',
    fontSize: 15,
  },
  targetTitle: {
    color: COLORS.surfaceWhite,
    fontWeight: '700',
    fontSize: 14,
  },
});
