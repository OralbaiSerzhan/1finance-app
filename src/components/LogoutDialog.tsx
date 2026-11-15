import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, RADII } from '../constants/theme';

interface LogoutDialogProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const LogoutDialog: React.FC<LogoutDialogProps> = ({
  visible,
  onCancel,
  onConfirm,
}) => {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onCancel}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>End Session</Text>
          <Text style={styles.message}>Are you sure you want to log out?</Text>
          <TouchableOpacity style={styles.confirmBtn} onPress={onConfirm}>
            <Text style={styles.confirmText}>Yes, End Session</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(9, 48, 48, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: COLORS.surfaceWhite,
    borderRadius: RADII.lg,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  confirmBtn: {
    width: '100%',
    height: 44,
    borderRadius: RADII.full,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  confirmText: {
    color: COLORS.textDark,
    fontWeight: '700',
    fontSize: 14,
  },
  cancelBtn: {
    width: '100%',
    height: 44,
    borderRadius: RADII.full,
    backgroundColor: COLORS.cardLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    color: COLORS.textDark,
    fontWeight: '600',
    fontSize: 14,
  },
});
