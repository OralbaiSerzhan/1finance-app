import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { colors, radius, spacing } from '../constants/theme';

type Props = { title: string; children: React.ReactNode };

export default function AuthLayout({ title, children }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <ScrollView style={styles.card} contentContainerStyle={styles.content}>
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primary },
  header: { paddingTop: 80, paddingBottom: 40, alignItems: 'center' },
  title: { color: colors.white, fontSize: 22, fontWeight: '700' },
  card: {
    flex: 1,
    backgroundColor: colors.background,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
  },
  content: { padding: spacing.lg },
});
