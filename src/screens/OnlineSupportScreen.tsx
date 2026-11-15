import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenShell, colors } from '../components/FinanceUi';

type Msg = { id: string; text: string; mine?: boolean; time: string };

const INITIAL: Msg[] = [
  { id: '1', text: 'Welcome, I am your virtual assistant.', time: '14:00' },
  { id: '2', text: 'How can I help you today?', time: '14:00' },
  { id: '3', text: 'Hello! I have a question. How can I record my expenses by date?', mine: true, time: '14:01' },
  {
    id: '4',
    text: 'Response to your request:\nYou can register expenses in the top menu of the homepage.',
    time: '14:03',
  },
];

export default function OnlineSupportScreen() {
  const navigation = useNavigation();
  const [tab, setTab] = useState<'assistant' | 'help'>('assistant');
  const [msgs, setMsgs] = useState<Msg[]>(INITIAL);
  const [text, setText] = useState('');

  const send = () => {
    const t = text.trim();
    if (!t) return;
    const time = new Date().toTimeString().slice(0, 5);
    setMsgs((m) => [...m, { id: String(Date.now()), text: t, mine: true, time }]);
    setText('');
  };

  return (
    <ScreenShell title="Online Support" onBack={() => navigation.goBack()}>
      <View style={s.tabs}>
        {(['assistant', 'help'] as const).map((k) => (
          <Pressable key={k} style={[s.tab, tab === k && s.tabActive]} onPress={() => setTab(k)}>
            <Text style={s.tabText}>{k === 'assistant' ? 'Support Assistant' : 'Help Center'}</Text>
          </Pressable>
        ))}
      </View>

      {tab === 'assistant' ? (
        <>
          {msgs.map((m) => (
            <View key={m.id} style={{ alignItems: m.mine ? 'flex-end' : 'flex-start', marginBottom: 10 }}>
              <View style={[s.bubble, m.mine && s.bubbleMine]}>
                <Text style={s.bubbleText}>{m.text}</Text>
              </View>
              <Text style={s.time}>{m.time}</Text>
            </View>
          ))}
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={s.inputBar}>
              <TextInput
                style={s.input}
                value={text}
                onChangeText={setText}
                placeholder="Write here..."
                placeholderTextColor="#8FB59B"
                onSubmitEditing={send}
              />
              <Pressable onPress={send} hitSlop={10}>
                <Text style={{ fontSize: 16 }}>➤</Text>
              </Pressable>
            </View>
          </KeyboardAvoidingView>
        </>
      ) : (
        <Text style={s.help}>
          Help Center: жиі қойылатын сұрақтар осында болады. Қазір бұл бөлім бос.
        </Text>
      )}
    </ScreenShell>
  );
}

const s = StyleSheet.create({
  tabs: { flexDirection: 'row', backgroundColor: colors.lightGreen, borderRadius: 14, padding: 4, marginBottom: 16 },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 8, borderRadius: 12 },
  tabActive: { backgroundColor: colors.green },
  tabText: { fontSize: 12, color: colors.dark, fontWeight: '600' },
  bubble: { maxWidth: '80%', backgroundColor: colors.lightGreen, borderRadius: 14, padding: 10 },
  bubbleMine: { backgroundColor: colors.green },
  bubbleText: { fontSize: 12, color: colors.dark },
  time: { fontSize: 9, color: colors.dark, marginTop: 2 },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.green,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 8,
    marginTop: 10,
  },
  input: { flex: 1, backgroundColor: colors.light, borderRadius: 10, paddingHorizontal: 10, height: 34, fontSize: 12, color: colors.dark },
  help: { fontSize: 13, color: colors.dark, textAlign: 'center', marginTop: 40 },
});
