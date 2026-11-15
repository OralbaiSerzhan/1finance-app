import { View, StyleSheet } from 'react-native';
import { colors } from '../constants/theme';

type Props = { values: number[]; height?: number };

export default function BarChart({ values, height = 120 }: Props) {
  const max = Math.max(...values, 1);
  return (
    <View style={[styles.row, { height }]}>
      {values.map((v, i) => (
        <View key={i} style={styles.col}>
          <View style={[styles.bar, { height: (v / max) * height }]} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  col: { flex: 1, justifyContent: 'flex-end' },
  bar: { backgroundColor: colors.primary, borderRadius: 6 },
});