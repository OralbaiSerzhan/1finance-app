import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BalanceSummaryCard } from '../components/FinanceUi';
import { TransactionItem } from '../components/TransactionItem';
import { COLORS, RADII } from '../constants/theme';
import { useAppContext } from '../context/AppContext';
import { RootStackParamList } from '../types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const { user, totalBalance, totalExpense, transactions } = useAppContext();
  const isDark = user.darkTheme;

  return (
    <SafeAreaView style={[styles.root, isDark && { backgroundColor: COLORS.darkBg }]}>
      <View style={styles.topHeader}>
        <View>
          <Text style={styles.greeting}>Hi, Welcome Back</Text>
          <Text style={styles.userName}>{user.name}</Text>
        </View>
        <TouchableOpacity
          style={styles.bellBtn}
          onPress={() => navigation.navigate('Notifications')}
        >
          <Ionicons name="notifications-outline" size={20} color={COLORS.textDark} />
        </TouchableOpacity>
      </View>

      <BalanceSummaryCard totalBalance={totalBalance} totalExpense={totalExpense} />

      <View style={[styles.sheet, isDark && { backgroundColor: COLORS.darkSurface }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.quickRow}>
            <TouchableOpacity
              style={styles.quickBtn}
              onPress={() => navigation.navigate('QuickAnalysis')}
            >
              <Ionicons name="analytics-outline" size={20} color={COLORS.textDark} />
              <Text style={styles.quickLabel}>Quick Analysis</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickBtn}
              onPress={() => navigation.navigate('AccountBalance')}
            >
              <Ionicons name="wallet-outline" size={20} color={COLORS.textDark} />
              <Text style={styles.quickLabel}>Balance</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickBtn}
              onPress={() => navigation.navigate('Search')}
            >
              <Ionicons name="search-outline" size={20} color={COLORS.textDark} />
              <Text style={styles.quickLabel}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickBtn}
              onPress={() => navigation.navigate('Calendar')}
            >
              <Ionicons name="calendar-outline" size={20} color={COLORS.textDark} />
              <Text style={styles.quickLabel}>Calendar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, isDark && { color: COLORS.darkText }]}>
              Recent Transactions
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('AddExpense')}>
              <Text style={styles.addLink}>+ Add Expense</Text>
            </TouchableOpacity>
          </View>

          {transactions.slice(0, 6).map((item) => (
            <TransactionItem key={item.id} item={item} />
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
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: 14,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  userName: {
    fontSize: 13,
    color: COLORS.textDark,
    opacity: 0.85,
  },
  bellBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.surfaceWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheet: {
    flex: 1,
    backgroundColor: COLORS.backgroundMint,
    borderTopLeftRadius: RADII.xl,
    borderTopRightRadius: RADII.xl,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  quickRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 8,
  },
  quickBtn: {
    flex: 1,
    backgroundColor: COLORS.cardLight,
    borderRadius: RADII.md,
    paddingVertical: 12,
    alignItems: 'center',
    gap: 4,
  },
  quickLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  addLink: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primaryDark,
  },
});
