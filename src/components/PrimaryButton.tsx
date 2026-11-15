import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { COLORS, RADII } from '../constants/theme';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  variant?: 'primary' | 'secondary';
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  style,
  variant = 'primary',
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.button,
        variant === 'secondary' ? styles.secondary : styles.primary,
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          variant === 'secondary' ? styles.secondaryLabel : styles.primaryLabel,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 44,
    borderRadius: RADII.full,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    alignSelf: 'center',
    minWidth: 170,
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.cardLight,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
  },
  primaryLabel: {
    color: COLORS.textDark,
  },
  secondaryLabel: {
    color: COLORS.textDark,
  },
});
