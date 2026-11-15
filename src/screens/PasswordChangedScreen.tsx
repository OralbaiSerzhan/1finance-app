import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { colors } from '../constants/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'PasswordChanged'>;

export default function PasswordChangedScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.ring}>
        <View style={styles.dot} />
      </View>
      <Text style={styles.text}>Password Has Been{'\n'}Changed Successfully</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Login')}>
        <Text style={styles.buttonText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', padding: 24 },
  ring: {
    width: 120, height: 120, borderRadius: 60, borderWidth: 3, borderColor: colors.white,
    justifyContent: 'center', alignItems: 'center', marginBottom: 30,
  },
  dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.white },
  text: { color: colors.white, textAlign: 'center', fontSize: 16, fontWeight: '600', marginBottom: 40 },
  button: { backgroundColor: colors.white, paddingVertical: 14, paddingHorizontal: 40, borderRadius: 12 },
  buttonText: { color: colors.primary, fontWeight: '700' },
});