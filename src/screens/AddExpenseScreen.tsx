import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppInput } from '../components/AppInput';
import { ScreenHeader } from '../components/FinanceUi';
import { PrimaryButton } from '../components/PrimaryButton';
import { COLORS, RADII } from '../constants/theme';
import { useAppContext } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import { CategoryId, RootStackParamList } from '../types';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = RouteProp<RootStackParamList, 'AddExpense'>;

export const AddExpenseScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { addExpense } = useAppContext();

  const [dateLabel, setDateLabel] = useState('April 30, 2024');
  const [category, setCategory] = useState<CategoryId>(
    route.params?.defaultCategory ?? 'food'
  );
  const [showPicker, setShowPicker] = useState(false);
  const [amount, setAmount] = useState('26.00');
  const [title, setTitle] = useState('Dinner');
  const [note, setNote] = useState('');

  const handleSave = () => {
    const parsed = parseFloat(amount.replace(/[^0-9.]/g, ''));
    if (Number.isNaN(parsed) || parsed <= 0) {
      Alert.alert('Invalid amount', 'Please enter a valid expense amount.');
      return;
    }

    addExpense({
      title,
      category,
      amount: parsed,
      dateLabel: dateLabel.split(',')[0] || 'April 30',
      date: '2024-04-30',
      month: 'April',
      note,
    });
    navigation.goBack();
  };

  const selectedLabel =
    CATEGORIES.find((c) => c.id === category)?.label ?? 'Select the category';

  return (
    <SafeAreaView style={styles.root}>
      <ScreenHeader
        title="Add Expenses"
        onBack={() => navigation.goBack()}
        onBellPress={() => navigation.navigate('Notifications')}
      />

      <View style={styles.sheet}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <AppInput
            label="Date"
            value={dateLabel}
            onChangeText={setDateLabel}
            rightElement={<Ionicons name="calendar-outline" size={18} color={COLORS.primaryDark} />}
          />

          <Text style={styles.label}>Category</Text>
          <TouchableOpacity
            style={styles.selectBox}
            onPress={() => setShowPicker((prev) => !prev)}
          >
            <Text style={styles.selectText}>{selectedLabel}</Text>
            <Ionicons name="chevron-down" size={18} color={COLORS.primaryDark} />
          </TouchableOpacity>

          {showPicker ? (
            <View style={styles.chipsWrap}>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.chip, category === cat.id && styles.chipActive]}
                  onPress={() => {
                    setCategory(cat.id);
                    setShowPicker(false);
                  }}
                >
                  <Text style={styles.chipText}>{cat.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : null}

          <AppInput
            label="Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            placeholder="$0.00"
          />

          <AppInput
            label="Expense Title"
            value={title}
            onChangeText={setTitle}
            placeholder="Dinner"
          />

          <AppInput
            label="Enter Message"
            value={note}
            onChangeText={setNote}
            placeholder="Optional note..."
            multiline
            numberOfLines={4}
            style={styles.textArea}
          />

          <PrimaryButton title="Save" onPress={handleSave} style={styles.saveBtn} />
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
    paddingHorizontal: 22,
    paddingTop: 26,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 6,
  },
  selectBox: {
    backgroundColor: COLORS.cardLight,
    borderRadius: RADII.md,
    height: 46,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  selectText: {
    fontSize: 14,
    color: COLORS.textDark,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADII.full,
    backgroundColor: COLORS.cardLight,
  },
  chipActive: {
    backgroundColor: COLORS.primary,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  textArea: {
    minHeight: 96,
    textAlignVertical: 'top',
  },
  saveBtn: {
    marginTop: 12,
    marginBottom: 30,
  },
});
