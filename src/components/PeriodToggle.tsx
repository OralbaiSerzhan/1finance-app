import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Period } from '../types';
import { colors, radius } from '../constants/theme';

const options: Period[] = ['Daily', 'Weekly', 'Monthly'];

type Props = { value: Period; onChange: (p: Period) => void };

export default function PeriodToggle({ value, onChange }: Props) {
  return (
    <View style={styles.wrapper}>
      {options.map((opt) => {
        const active = opt === value;
        return (
          <TouchableOpacity
            key={opt}
            style={[styles.btn, active && styles.btnActive]}
            onPress={() => onChange(opt)}
          >
            <Text style={[styles.text, active && styles.textActive]}>{opt}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flexDirection: 'row', backgroundColor: colors.inputBg, borderRadius: radius.md, padding: 4 },
  btn: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: radius.md },
  btnActive: { backgroundColor: colors.primary },
  text: { color: colors.muted, fontWeight: '600' },
  textActive: { color: colors.white },
});