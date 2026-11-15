import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, RADII } from '../constants/theme';
import { PeriodOption } from '../types';

interface PeriodToggleProps {
  value: PeriodOption;
  onChange: (period: PeriodOption) => void;
}

const OPTIONS: PeriodOption[] = ['Daily', 'Weekly', 'Monthly', 'Year'];

export const PeriodToggle: React.FC<PeriodToggleProps> = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      {OPTIONS.map((option) => {
        const active = option === value;
        return (
          <TouchableOpacity
            key={option}
            onPress={() => onChange(option)}
            style={[styles.tab, active && styles.activeTab]}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, active && styles.activeTabText]}>{option}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardLight,
    borderRadius: RADII.lg,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: RADII.lg,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textDark,
  },
  activeTabText: {
    fontWeight: '700',
  },
});
