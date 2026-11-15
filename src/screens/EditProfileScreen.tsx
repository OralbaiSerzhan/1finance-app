import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppInput } from '../components/AppInput';
import { ScreenHeader } from '../components/FinanceUi';
import { PrimaryButton } from '../components/PrimaryButton';
import { COLORS, RADII } from '../constants/theme';
import { useAppContext } from '../context/AppContext';
import { RootStackParamList } from '../types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const { user, updateProfile } = useAppContext();

  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [pushNotifications, setPushNotifications] = useState(user.pushNotifications);
  const [darkTheme, setDarkTheme] = useState(user.darkTheme);

  const handleUpdate = () => {
    updateProfile({
      name: name.trim() || user.name,
      phone: phone.trim() || user.phone,
      email: email.trim() || user.email,
      pushNotifications,
      darkTheme,
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.root, darkTheme && { backgroundColor: COLORS.darkBg }]}>
      <ScreenHeader
        title="Edit My Profile"
        onBack={() => navigation.goBack()}
        onBellPress={() => navigation.navigate('Notifications')}
      />

      <View style={[styles.sheet, darkTheme && { backgroundColor: COLORS.darkSurface }]}>
        <View style={styles.avatarWrap}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={44} color={COLORS.surfaceWhite} />
            <View style={styles.camBadge}>
              <Ionicons name="camera-outline" size={13} color={COLORS.surfaceWhite} />
            </View>
          </View>
          <Text style={[styles.name, darkTheme && { color: COLORS.darkText }]}>{user.name}</Text>
          <Text style={styles.userId}>ID: {user.userId}</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[styles.sectionTitle, darkTheme && { color: COLORS.darkText }]}>
            Account Settings
          </Text>

          <AppInput label="Username" value={name} onChangeText={setName} />
          <AppInput
            label="Phone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <AppInput
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={styles.toggleRow}>
            <Text style={[styles.toggleLabel, darkTheme && { color: COLORS.darkText }]}>
              Push Notifications
            </Text>
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
              trackColor={{ false: '#C6D8D0', true: COLORS.primary }}
              thumbColor={COLORS.surfaceWhite}
            />
          </View>

          <View style={styles.toggleRow}>
            <Text style={[styles.toggleLabel, darkTheme && { color: COLORS.darkText }]}>
              Turn Dark Theme
            </Text>
            <Switch
              value={darkTheme}
              onValueChange={setDarkTheme}
              trackColor={{ false: '#C6D8D0', true: COLORS.primary }}
              thumbColor={COLORS.surfaceWhite}
            />
          </View>

          <PrimaryButton title="Update Profile" onPress={handleUpdate} style={styles.btn} />
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
    marginTop: 32,
    backgroundColor: COLORS.backgroundMint,
    borderTopLeftRadius: RADII.xl,
    borderTopRightRadius: RADII.xl,
    paddingHorizontal: 24,
  },
  avatarWrap: {
    alignItems: 'center',
    marginTop: -46,
    marginBottom: 18,
  },
  avatarCircle: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: COLORS.textDark,
    borderWidth: 4,
    borderColor: COLORS.surfaceWhite,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  camBadge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.surfaceWhite,
  },
  name: {
    fontSize: 19,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  userId: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 14,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  toggleLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textDark,
  },
  btn: {
    marginTop: 18,
    marginBottom: 30,
  },
});
