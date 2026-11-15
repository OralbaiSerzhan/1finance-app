import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { BalanceSummaryCard, ScreenHeader } from '../components/FinanceUi';
import { TransactionItem } from '../components/TransactionItem';
import { COLORS, RADII } from '../constants/theme';
import { useAppContext } from '../context/AppContext';
import { formatCurrency } from '../utils/format';

export const NotificationScreen: React.FC = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.root}>
      <ScreenHeader title="Notification" onBack={() => navigation.goBack()} />
      <View style={styles.sheet}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {[
            { title: 'Reminder!', body: 'Set up your automatic savings to meet your savings goal.' },
            { title: 'New Update', body: 'Set up your automatic savings to meet your savings goal.' },
            { title: 'Transactions', body: 'A new transaction has been registered: Groceries -$100.00' },
          ].map((item, idx) => (
            <View key={idx} style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardBody}>{item.body}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export const SecurityScreen: React.FC = () => {
  const navigation = useNavigation();
  const [pinEnabled, setPinEnabled] = useState(true);
  const [biometric, setBiometric] = useState(false);

  return (
    <SafeAreaView style={styles.root}>
      <ScreenHeader title="Security" onBack={() => navigation.goBack()} />
      <View style={styles.sheet}>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Security PIN</Text>
          <Switch value={pinEnabled} onValueChange={setPinEnabled} />
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Fingerprint / Face ID</Text>
          <Switch value={biometric} onValueChange={setBiometric} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user, updateProfile } = useAppContext();

  return (
    <SafeAreaView style={styles.root}>
      <ScreenHeader title="Settings" onBack={() => navigation.goBack()} />
      <View style={styles.sheet}>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Push Notifications</Text>
          <Switch
            value={user.pushNotifications}
            onValueChange={(val) => updateProfile({ pushNotifications: val })}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Dark Theme</Text>
          <Switch
            value={user.darkTheme}
            onValueChange={(val) => updateProfile({ darkTheme: val })}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export const OnlineSupportScreen: React.FC = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.root}>
      <ScreenHeader title="Online Support" onBack={() => navigation.goBack()} />
      <View style={styles.sheet}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Support Center</Text>
          <Text style={styles.cardBody}>
            Our team is available 24/7. Contact us anytime regarding your transactions or account security.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export const QuickAnalysisScreen: React.FC = () => {
  const navigation = useNavigation();
  const { totalBalance, totalExpense, transactions } = useAppContext();
  return (
    <SafeAreaView style={styles.root}>
      <ScreenHeader title="Quickly Analysis" onBack={() => navigation.goBack()} />
      <BalanceSummaryCard totalBalance={totalBalance} totalExpense={totalExpense} />
      <View style={styles.sheet}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {transactions.slice(0, 5).map((item) => (
            <TransactionItem key={item.id} item={item} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export const AccountBalanceScreen: React.FC = () => {
  const navigation = useNavigation();
  const { totalBalance, totalIncome, totalExpense } = useAppContext();
  return (
    <SafeAreaView style={styles.root}>
      <ScreenHeader title="Account Balance" onBack={() => navigation.goBack()} />
      <View style={styles.sheet}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Balance</Text>
          <Text style={styles.bigAmount}>{formatCurrency(totalBalance)}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Income</Text>
          <Text style={styles.bigAmount}>{formatCurrency(totalIncome)}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Expense</Text>
          <Text style={[styles.bigAmount, { color: COLORS.blueAccent }]}>
            -{formatCurrency(totalExpense)}
          </Text>
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
    paddingTop: 24,
  },
  card: {
    backgroundColor: COLORS.cardLight,
    borderRadius: RADII.md,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  cardBody: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.cardLight,
    borderRadius: RADII.md,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  bigAmount: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: 4,
  },
});
