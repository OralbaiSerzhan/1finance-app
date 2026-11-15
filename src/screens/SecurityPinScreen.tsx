import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import AuthLayout from '../components/AuthLayout';
import { colors, radius } from '../constants/theme';

const PIN_LENGTH = 6;
const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '<'];

type Props = NativeStackScreenProps<RootStackParamList, 'SecurityPin'>;

export default function SecurityPinScreen({ navigation }: Props) {
  const [pin, setPin] = useState('');

  useEffect(() => {
    if (pin.length === PIN_LENGTH) {
      const t = setTimeout(() => navigation.navigate('NewPassword'), 300);
      return () => clearTimeout(t);
    }
  }, [pin, navigation]);

  const handleKey = (k: string) => {
    if (k === '') return;
    if (k === '<') return setPin((p) => p.slice(0, -1));
    setPin((p) => (p.length < PIN_LENGTH ? p + k : p));
  };

  return (
    <AuthLayout title="Security Pin">
      <Text style={styles.label}>Enter Security Pin</Text>

      <View style={styles.dots}>
        {Array.from({ length: PIN_LENGTH }).map((_, i) => (
          <View key={i} style={[styles.dot, i < pin.length && styles.dotFilled]} />
        ))}
      </View>

      <View style={styles.keypad}>
        {keys.map((k, i) => (
          <TouchableOpacity key={i} style={styles.key} onPress={() => handleKey(k)} disabled={k === ''}>
            <Text style={styles.keyText}>{k === '<' ? '⌫' : k}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  label: { textAlign: 'center', color: colors.dark, fontWeight: '600', marginBottom: 20 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 12, marginBottom: 30 },
  dot: { width: 14, height: 14, borderRadius: 7, borderWidth: 1, borderColor: colors.primary },
  dotFilled: { backgroundColor: colors.primary },
  keypad: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  key: {
    width: '30%', height: 60, marginBottom: 12,
    backgroundColor: colors.white, borderRadius: radius.md,
    justifyContent: 'center', alignItems: 'center',
  },
  keyText: { fontSize: 22, color: colors.dark, fontWeight: '600' },
});