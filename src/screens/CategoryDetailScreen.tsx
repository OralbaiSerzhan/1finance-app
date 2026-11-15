import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BalanceSummaryCard, ScreenHeader } from '../components/FinanceUi';
import { PrimaryButton } from '../components/PrimaryButton';
import { TransactionItem } from '../components/TransactionItem';
import { COLORS, RADII } from '../constants/theme';
import { useAppContext } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import { RootStackParamList } from '../types';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = RouteProp<RootStackParamList, 'CategoryDetail'>;

export const CategoryDetailScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { categoryId } = route.params;
  const { transactions, totalBalance, totalExpense } = useAppContext();

  const category = CATEGORIES.find((c) => c.id === categoryId);
  const title = category?.label ?? 'Category';

  const items = useMemo(
    () => transactions.filter((t) => t.category === categoryId),
    [categoryId, transactions]
  );

  const months = useMemo(
    () => Array.from(new Set(items.map((t) => t.month))),
    [items]
  );

  return (
    <SafeAreaView style={styles.root}>
      <ScreenHeader
        title={title}
        onBack={() => navigation.goBack()}
        onBellPress={() => navigation.navigate('Notifications')}
      />
      <BalanceSummaryCard totalBalance={totalBalance} totalExpense={totalExpense} />

      <View style={styles.sheet}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {items.length === 0 ? (
            <Text style={styles.empty}>No expenses in {title} yet.</Text>
          ) : (
            months.map((month, idx) => (
              <View key={month} style={styles.monthGroup}>
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
                {items
                  .filter((t) => t.month === month)
                  .map((item) => (
                    <TransactionItem key={item.id} item={item} />
                  ))}
              </View>
            ))
          )}
        </ScrollView>

        <View style={styles.footer}>
          <PrimaryButton
            title="Add Expenses"
            onPress={() => navigation.navigate('AddExpense', { defaultCategory: categoryId })}
          />
        </View>
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
    paddingTop: 22,
  },
  monthGroup: {
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
  empty: {
    textAlign: 'center',
    color: COLORS.textMuted,
    marginTop: 40,
    fontSize: 14,
  },
  footer: {
    paddingVertical: 16,
  },
});
