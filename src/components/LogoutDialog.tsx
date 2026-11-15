import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { colors } from './FinanceUi';
import { GreenButton } from './ProfileUi';

type Props = { visible: boolean; onConfirm: () => void; onCancel: () => void };

export default function LogoutDialog({ visible, onConfirm, onCancel }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={s.backdrop}>
        <View style={s.card}>
          <Text style={s.title}>End Session</Text>
          <Text style={s.text}>Are you sure you want to log out?</Text>
          <GreenButton label="Yes, End Session" onPress={onConfirm} style={{ alignSelf: 'stretch' }} />
          <GreenButton label="Cancel" soft onPress={onCancel} style={{ alignSelf: 'stretch', marginTop: 10 }} />
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center', padding: 32 },
  card: { width: '100%', backgroundColor: '#fff', borderRadius: 16, padding: 20 },
  title: { fontSize: 15, fontWeight: '700', color: colors.dark, textAlign: 'center' },
  text: { fontSize: 12, color: colors.dark, textAlign: 'center', marginVertical: 14 },
});
