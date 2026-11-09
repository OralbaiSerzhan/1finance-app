import { TextInput, Text, View, StyleSheet } from 'react-native';
import { colors, radius } from '../constants/theme';

type Props = {
  label: string;
  placeholder?: string;
  secure?: boolean;
  value: string;
  onChangeText: (text: string) => void;
};

export default function AppInput({ label, placeholder, secure, value, onChangeText }: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        secureTextEntry={secure}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 12 },
  label: { color: colors.dark, fontSize: 13, marginBottom: 4 },
  input: {
    backgroundColor: colors.inputBg,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.dark,
  },
});
