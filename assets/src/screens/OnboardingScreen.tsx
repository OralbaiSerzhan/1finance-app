import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { colors, radius } from '../constants/theme';

const pages = [
  { title: 'Welcome To\nExpense Manager' },
  { title: 'Are You Ready To\nTake Control Of\nYour Finances?' },
];

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export default function OnboardingScreen({ navigation }: Props) {
  const [index, setIndex] = useState(0);
  const isLast = index === pages.length - 1;

  const handleNext = () => {
    if (isLast) navigation.replace('Login');
    else setIndex(index + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>{pages[index].title}</Text>
      </View>
      <View style={styles.bottom}>
        <View style={styles.illustration} />
        <TouchableOpacity onPress={handleNext} style={styles.nextBtn}>
          <Text style={styles.nextText}>{isLast ? 'Start' : 'Next'}</Text>
        </TouchableOpacity>
        <View style={styles.dots}>
          {pages.map((_, i) => (
            <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primary },
  top: { flex: 0.4, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  title: { color: colors.dark, fontSize: 22, fontWeight: '700', textAlign: 'center' },
  bottom: {
    flex: 0.6,
    backgroundColor: colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    padding: 24,
  },
  illustration: { width: 220, height: 220, borderRadius: 110, backgroundColor: '#D6F5EA', marginVertical: 24 },
  nextBtn: { paddingVertical: 12, paddingHorizontal: 40, backgroundColor: colors.primary, borderRadius: radius.md },
  nextText: { color: colors.white, fontWeight: '600' },
  dots: { flexDirection: 'row', marginTop: 20, gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#C5D8D2' },
  dotActive: { backgroundColor: colors.primary },
});
