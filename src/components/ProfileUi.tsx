import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, StyleProp, ViewStyle, KeyboardTypeOptions } from 'react-native';
import { colors } from './FinanceUi';

type RowProps = { label: string; onPress?: () => void; icon?: string; bold?: boolean };

export function MenuRow({ label, onPress, icon }: RowProps) {
  return (
    <Pressable onPress={onPress} style={s.row}>
      {icon ? (
        <View style={s.rowIcon}>
          <Text style={{ fontSize: 14 }}>{icon}</Text>
        </View>
      ) : null}
      <Text style={s.rowLabel}>{label}</Text>
      <Text style={s.chevron}>›</Text>
    </Pressable>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
};

export function Field({ label, value, onChangeText, keyboardType, maxLength }: FieldProps) {
  const [hidden, setHidden] = useState(true);
  return (
    <View style={{ marginBottom: 18 }}>
      <Text style={s.fieldLabel}>{label}</Text>
      <View style={s.fieldBox}>
        <TextInput
          style={s.input}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={hidden}
          keyboardType={keyboardType}
          maxLength={maxLength}
          placeholder="••••••••"
          placeholderTextColor="#8FB59B"
        />
        <Pressable onPress={() => setHidden((h) => !h)} hitSlop={10}>
          <Text style={{ fontSize: 14 }}>{hidden ? '🙈' : '👁'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

type BtnProps = {
  label: string;
  onPress?: () => void;
  soft?: boolean;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

export function GreenButton({ label, onPress, soft, style, disabled }: BtnProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[s.btn, soft && s.btnSoft, disabled && { opacity: 0.5 }, style]}
    >
      <Text style={[s.btnText, soft && { fontWeight: '500' }]}>{label}</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGreen,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rowLabel: { flex: 1, fontSize: 14, color: colors.dark },
  chevron: { fontSize: 22, color: colors.dark },
  fieldLabel: { fontSize: 13, color: colors.dark, marginBottom: 6 },
  fieldBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGreen,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 44,
  },
  input: { flex: 1, color: colors.dark, fontSize: 14 },
  btn: {
    alignSelf: 'center',
    minWidth: 160,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  btnSoft: { backgroundColor: colors.lightGreen },
  btnText: { fontSize: 13, fontWeight: '600', color: colors.dark },
});
