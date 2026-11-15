import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { COLORS, RADII } from '../constants/theme';

interface AppInputProps extends TextInputProps {
  label?: string;
  rightElement?: React.ReactNode;
}

export const AppInput: React.FC<AppInputProps> = ({ label, rightElement, style, ...rest }) => {
  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.inputRow}>
        <TextInput
          placeholderTextColor={COLORS.textMuted}
          style={[styles.input, style]}
          {...rest}
        />
        {rightElement}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 6,
  },
  inputRow: {
    backgroundColor: COLORS.cardLight,
    borderRadius: RADII.md,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    minHeight: 46,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textDark,
    paddingVertical: 10,
  },
});
