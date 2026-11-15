import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BalanceSummaryCard, ScreenHeader } from '../components/FinanceUi';
import { COLORS, RADII } from '../constants/theme';
import { useAppContext } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import { RootStackParamList } from '../types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export const CategoriesScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const { totalBalance, totalExpense, user } = useAppContext();

  return (
    <SafeAreaView style={[styles.root, user.darkTheme && { backgroundColor: COLORS.darkBg }]}>
      <ScreenHeader
        title="Categories"
        onBack={() => navigation.goBack()}
        onBellPress={() => navigation.navigate('Notifications')}
      />
      <BalanceSummaryCard totalBalance={totalBalance} totalExpense={totalExpense} />

      <View style={[styles.sheet, user.darkTheme && { backgroundColor: COLORS.darkSurface }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.grid}>
            {CATEGORIES.map((cat, idx) => (
              <TouchableOpacity
                key={cat.id}
                activeOpacity={0.85}
                style={styles.gridItem}
                onPress={() => navigation.navigate('CategoryDetail', { categoryId: cat.id })}
              >
                <View style={[styles.iconCard, idx === 0 && styles.iconCardPrimary]}>
                  <Ionicons
                    name={cat.icon as keyof typeof Ionicons.glyphMap}
                    size={30}
                    color={COLORS.surfaceWhite}
                  />
                </View>
                <Text style={styles.catLabel}>{cat.label}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.gridItem}
              onPress={() => navigation.navigate('AddExpense')}
            >
              <View style={styles.iconCard}>
                <Ionicons name="add" size={34} color={COLORS.surfaceWhite} />
              </View>
              <Text style={styles.catLabel}>More</Text>
            </TouchableOpacity>
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
    paddingTop: 28,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 22,
    paddingBottom: 30,
  },
  gridItem: {
    width: '30%',
    alignItems: 'center',
  },
  iconCard: {
    width: 84,
    height: 84,
    borderRadius: RADII.lg,
    backgroundColor: COLORS.blueSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  iconCardPrimary: {
    backgroundColor: COLORS.blueAccent,
  },
  catLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textDark,
  },
});
