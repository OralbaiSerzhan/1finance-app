import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenHeader } from '../components/FinanceUi';
import { PrimaryButton } from '../components/PrimaryButton';
import { TransactionItem } from '../components/TransactionItem';
import { COLORS, RADII } from '../constants/theme';
import { useAppContext } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import { CategoryId, RootStackParamList, TransactionType } from '../types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export const SearchScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const { transactions } = useAppContext();

  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [dateFilter, setDateFilter] = useState('30 /APR/2023');
  const [reportType, setReportType] = useState<TransactionType>('expense');
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [hasSearched, setHasSearched] = useState(true);

  const results = useMemo(() => {
    if (!hasSearched) return [];
    return transactions.filter((t) => {
      if (t.type !== reportType) return false;
      if (selectedCategory !== 'all' && t.category !== selectedCategory) return false;
      if (query.trim().length > 0) {
        const q = query.trim().toLowerCase();
        return (
          t.title.toLowerCase().includes(q) ||
          t.subtitle.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [hasSearched, query, reportType, selectedCategory, transactions]);

  return (
    <SafeAreaView style={styles.root}>
      <ScreenHeader
        title="Search"
        onBack={() => navigation.goBack()}
        onBellPress={() => navigation.navigate('Notifications')}
      />

      <View style={styles.searchBarWrap}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search..."
          placeholderTextColor={COLORS.textMuted}
          style={styles.searchInput}
        />
      </View>

      <View style={styles.sheet}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.fieldLabel}>Categories</Text>
          <TouchableOpacity
            style={styles.selectBox}
            onPress={() => setShowCategoryPicker((prev) => !prev)}
          >
            <Text style={styles.selectText}>
              {selectedCategory === 'all'
                ? 'Select the category'
                : CATEGORIES.find((c) => c.id === selectedCategory)?.label ?? selectedCategory}
            </Text>
            <Ionicons name="chevron-down" size={18} color={COLORS.primaryDark} />
          </TouchableOpacity>

          {showCategoryPicker ? (
            <View style={styles.chipsWrap}>
              <TouchableOpacity
                style={[styles.chip, selectedCategory === 'all' && styles.chipActive]}
                onPress={() => {
                  setSelectedCategory('all');
                  setShowCategoryPicker(false);
                }}
              >
                <Text style={styles.chipText}>All</Text>
              </TouchableOpacity>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.chip, selectedCategory === cat.id && styles.chipActive]}
                  onPress={() => {
                    setSelectedCategory(cat.id);
                    setShowCategoryPicker(false);
                  }}
                >
                  <Text style={styles.chipText}>{cat.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : null}

          <Text style={styles.fieldLabel}>Date</Text>
          <View style={styles.selectBox}>
            <TextInput
              value={dateFilter}
              onChangeText={setDateFilter}
              style={styles.dateInput}
            />
            <Ionicons name="calendar-outline" size={18} color={COLORS.primaryDark} />
          </View>

          <Text style={styles.fieldLabel}>Report</Text>
          <View style={styles.radioRow}>
            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setReportType('income')}
            >
              <View style={[styles.radioOuter, reportType === 'income' && styles.radioOuterActive]}>
                {reportType === 'income' ? <View style={styles.radioInner} /> : null}
              </View>
              <Text style={styles.radioLabel}>Income</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setReportType('expense')}
            >
              <View style={[styles.radioOuter, reportType === 'expense' && styles.radioOuterActive]}>
                {reportType === 'expense' ? <View style={styles.radioInner} /> : null}
              </View>
              <Text style={styles.radioLabel}>Expense</Text>
            </TouchableOpacity>
          </View>

          <PrimaryButton
            title="Search"
            onPress={() => setHasSearched(true)}
            style={styles.searchBtn}
          />

          <View style={styles.resultsList}>
            {results.length === 0 ? (
              <Text style={styles.emptyText}>No matching transactions found.</Text>
            ) : (
              results.map((item) => (
                <View key={item.id} style={styles.resultCard}>
                  <TransactionItem item={item} />
                </View>
              ))
            )}
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
  searchBarWrap: {
    paddingHorizontal: 20,
    paddingBottom: 18,
  },
  searchInput: {
    backgroundColor: COLORS.surfaceWhite,
    borderRadius: RADII.full,
    paddingHorizontal: 18,
    height: 44,
    fontSize: 14,
    color: COLORS.textDark,
  },
  sheet: {
    flex: 1,
    backgroundColor: COLORS.backgroundMint,
    borderTopLeftRadius: RADII.xl,
    borderTopRightRadius: RADII.xl,
    paddingHorizontal: 22,
    paddingTop: 22,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 8,
    marginTop: 6,
  },
  selectBox: {
    backgroundColor: COLORS.cardLight,
    borderRadius: RADII.md,
    paddingHorizontal: 14,
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  selectText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  dateInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textDark,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
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
  radioRow: {
    flexDirection: 'row',
    gap: 28,
    marginVertical: 8,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: COLORS.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: {
    borderColor: COLORS.primary,
  },
  radioInner: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  radioLabel: {
    fontSize: 14,
    color: COLORS.textDark,
  },
  searchBtn: {
    marginVertical: 18,
  },
  resultsList: {
    paddingBottom: 24,
    gap: 10,
  },
  resultCard: {
    backgroundColor: COLORS.cardLight,
    borderRadius: RADII.lg,
    paddingHorizontal: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.textMuted,
    marginTop: 12,
  },
});
