import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/theme';

export default function StatsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>StatsScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' },
  text: { color: colors.dark, fontSize: 18, fontWeight: '600' },
});
