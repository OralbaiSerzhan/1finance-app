import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, radius } from '../constants/theme';

type Props = { label: string; onPress: () => void };

export default function PrimaryButton({ label, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: radius.md,
    alignItems: 'center',
    marginVertical: 8,
  },
  label: { color: colors.white, fontWeight: '600', fontSize: 16 },
});
