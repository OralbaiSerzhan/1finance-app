import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import AuthLayout from '../components/AuthLayout';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../constants/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Fingerprint'>;

export default function FingerprintScreen({ navigation }: Props) {
  return (
    <AuthLayout title="Security Fingerprint">
      <View style={styles.circle}>
        <Text style={styles.icon}>◉</Text>
      </View>
      <Text style={styles.heading}>Use Fingerprint To Access</Text>
      <Text style={styles.text}>Place your finger on the sensor to continue.</Text>
      <PrimaryButton label="Use Touch Id" onPress={() => navigation.replace('Main')} />
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 150, height: 150, borderRadius: 75, backgroundColor: colors.primary,
    alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginVertical: 24,
  },
  icon: { color: colors.white, fontSize: 60 },
  heading: { textAlign: 'center', color: colors.dark, fontWeight: '700', fontSize: 16 },
  text: { textAlign: 'center', color: colors.muted, marginVertical: 12 },
});