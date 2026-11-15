import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenShell, colors } from '../components/FinanceUi';

type Item = { icon: string; title: string; text: string; tag?: string; time: string };
type Group = { label: string; items: Item[] };

const GROUPS: Group[] = [
  {
    label: 'Today',
    items: [
      { icon: '🔔', title: 'Reminder!', text: 'Set up your automatic savings to meet your savings goal...', time: '17:00 - April 24' },
      { icon: '⭐', title: 'New Update', text: 'Set up your automatic savings to meet your savings goal...', time: '17:00 - April 24' },
    ],
  },
  {
    label: 'Yesterday',
    items: [
      { icon: '$', title: 'Transactions', text: 'A new transaction has been registered', tag: 'Groceries | Pantry | -$100,00', time: '17:00 - April 24' },
      { icon: '🔔', title: 'Reminder!', text: 'Set up your automatic savings to meet your savings goal...', time: '17:00 - April 24' },
    ],
  },
  {
    label: 'This Weekend',
    items: [
      { icon: '↘', title: 'Expense Record', text: 'We recommend that you be more attentive to your finances.', time: '17:00 - April 24' },
      { icon: '$', title: 'Transactions', text: 'A new transaction has been registered', tag: 'Food | Dinner | -$70,40', time: '17:00 - April 24' },
    ],
  },
];

export default function NotificationScreen() {
  const navigation = useNavigation();
  return (
    <ScreenShell title="Notification" onBack={() => navigation.goBack()}>
      {GROUPS.map((g) => (
        <View key={g.label} style={{ marginBottom: 8 }}>
          <Text style={s.group}>{g.label}</Text>
          {g.items.map((it, i) => (
            <View key={i} style={s.item}>
              <View style={s.row}>
                <View style={s.icon}>
                  <Text style={s.iconText}>{it.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.title}>{it.title}</Text>
                  <Text style={s.text}>{it.text}</Text>
                  {it.tag ? <Text style={s.tag}>{it.tag}</Text> : null}
                </View>
              </View>
              <Text style={s.time}>{it.time}</Text>
              <View style={s.line} />
            </View>
          ))}
        </View>
      ))}
    </ScreenShell>
  );
}

const s = StyleSheet.create({
  group: { fontSize: 13, color: colors.dark, marginBottom: 10 },
  item: { marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconText: { fontSize: 16, color: colors.dark, fontWeight: '700' },
  title: { fontSize: 14, fontWeight: '600', color: colors.dark },
  text: { fontSize: 12, color: colors.dark, marginTop: 2 },
  tag: { fontSize: 11, color: colors.blue, fontWeight: '600', marginTop: 4 },
  time: { fontSize: 11, color: colors.blue, textAlign: 'right', marginTop: 4 },
  line: { height: 1, backgroundColor: colors.green, marginTop: 6 },
});
