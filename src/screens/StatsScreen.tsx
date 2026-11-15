import { View, Text, StyleSheet } from 'react-native';
import { chartData } from '../data/mockData';
import BarChart from '../components/BarChart';
import { colors, radius, spacing } from '../constants/theme';

export default function StatsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Statistics</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Monthly Expenses</Text>
        <BarChart values={chartData.Monthly} height={160} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.lg, paddingTop: 60 },
  title: { color: colors.dark, fontSize: 22, fontWeight: '700', marginBottom: spacing.md },
  card: { backgroundColor: colors.white, borderRadius: radius.md, padding: spacing.md },
  cardTitle: { color: colors.dark, fontWeight: '600', marginBottom: spacing.md },
});