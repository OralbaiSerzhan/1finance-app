import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { G, Path, Text as SvgText } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenHeader } from '../components/FinanceUi';
import { TransactionItem } from '../components/TransactionItem';
import { COLORS, RADII } from '../constants/theme';
import { useAppContext } from '../context/AppContext';
import { RootStackParamList } from '../types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAYS_APRIL = Array.from({ length: 30 }, (_, i) => i + 1);

function polarToCartesian(cx: number, cy: number, r: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(angleInRadians),
    y: cy + r * Math.sin(angleInRadians),
  };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
}

export const CalendarScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const { transactions } = useAppContext();

  const [selectedDay, setSelectedDay] = useState<number>(24);
  const [mode, setMode] = useState<'spends' | 'categories'>('spends');

  const aprilTransactions = useMemo(
    () => transactions.filter((t) => t.month === 'April'),
    [transactions]
  );

  const pieSlices = [
    { label: 'Others', pct: 79, color: '#1E88E5', start: 0, end: 284 },
    { label: 'Groceries', pct: 10, color: '#0068FF', start: 284, end: 320 },
    { label: 'Food', pct: 11, color: '#6DB6FE', start: 320, end: 360 },
  ];

  return (
    <SafeAreaView style={styles.root}>
      <ScreenHeader
        title="Calendar"
        onBack={() => navigation.goBack()}
        onBellPress={() => navigation.navigate('Notifications')}
      />

      <View style={styles.sheet}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.monthRow}>
            <Text style={styles.monthTitle}>April</Text>
            <Text style={styles.yearTitle}>2023</Text>
          </View>

          <View style={styles.weekRow}>
            {WEEKDAYS.map((d) => (
              <Text key={d} style={styles.weekday}>
                {d}
              </Text>
            ))}
          </View>

          <View style={styles.daysGrid}>
            {DAYS_APRIL.map((day) => {
              const active = day === selectedDay;
              return (
                <TouchableOpacity
                  key={day}
                  style={[styles.dayCell, active && styles.dayCellActive]}
                  onPress={() => setSelectedDay(day)}
                >
                  <Text style={[styles.dayText, active && styles.dayTextActive]}>{day}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.modeRow}>
            <TouchableOpacity
              style={[styles.modeBtn, mode === 'spends' && styles.modeBtnActive]}
              onPress={() => setMode('spends')}
            >
              <Text style={[styles.modeText, mode === 'spends' && styles.modeTextActive]}>
                Spends
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modeBtn, mode === 'categories' && styles.modeBtnActive]}
              onPress={() => setMode('categories')}
            >
              <Text style={[styles.modeText, mode === 'categories' && styles.modeTextActive]}>
                Categories
              </Text>
            </TouchableOpacity>
          </View>

          {mode === 'spends' ? (
            <View style={styles.listWrap}>
              {aprilTransactions.map((item) => (
                <TransactionItem key={item.id} item={item} />
              ))}
            </View>
          ) : (
            <View style={styles.pieSection}>
              <Svg width={200} height={200} viewBox="0 0 200 200">
                <G>
                  {pieSlices.map((s) => (
                    <Path
                      key={s.label}
                      d={describeArc(100, 100, 88, s.start, s.end)}
                      fill={s.color}
                      stroke={COLORS.backgroundMint}
                      strokeWidth={2}
                    />
                  ))}
                  <SvgText x={125} y={115} fill="#FFF" fontSize={14} fontWeight="bold">
                    79%
                  </SvgText>
                  <SvgText x={50} y={108} fill="#FFF" fontSize={12} fontWeight="bold">
                    10%
                  </SvgText>
                  <SvgText x={68} y={62} fill="#FFF" fontSize={12} fontWeight="bold">
                    11%
                  </SvgText>
                </G>
              </Svg>

              <View style={styles.legendRow}>
                {pieSlices.map((s) => (
                  <View key={s.label} style={styles.legendItem}>
                    <View style={[styles.dot, { backgroundColor: s.color }]} />
                    <Text style={styles.legendText}>{s.label}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  sheet: {
    flex: 1,
    backgroundColor: COLORS.backgroundMint,
    borderTopLeftRadius: RADII.xl,
    borderTopRightRadius: RADII.xl,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  monthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primaryDark,
  },
  yearTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primaryDark,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  weekday: {
    width: '14.2%',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.blueAccent,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 18,
  },
  dayCell: {
    width: '14.2%',
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  dayCellActive: {
    backgroundColor: COLORS.primary,
  },
  dayText: {
    fontSize: 13,
    color: COLORS.textDark,
  },
  dayTextActive: {
    fontWeight: '700',
    color: COLORS.textDark,
  },
  modeRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  modeBtn: {
    flex: 1,
    height: 38,
    borderRadius: RADII.full,
    backgroundColor: COLORS.cardLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeBtnActive: {
    backgroundColor: COLORS.primary,
  },
  modeText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  modeTextActive: {
    fontWeight: '700',
  },
  listWrap: {
    paddingBottom: 24,
  },
  pieSection: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingBottom: 30,
  },
  legendRow: {
    flexDirection: 'row',
    gap: 18,
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 13,
    color: COLORS.textDark,
    fontWeight: '500',
  },
});
