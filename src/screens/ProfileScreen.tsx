import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenHeader } from '../components/FinanceUi';
import { LogoutDialog } from '../components/LogoutDialog';
import { COLORS, RADII } from '../constants/theme';
import { useAppContext } from '../context/AppContext';
import { RootStackParamList } from '../types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

interface MenuRow {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  bgColor: string;
  onPress: () => void;
}

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const { user } = useAppContext();
  const [logoutVisible, setLogoutVisible] = useState(false);

  const menuItems: MenuRow[] = [
    {
      label: 'Edit Profile',
      icon: 'person-outline',
      bgColor: COLORS.blueSoft,
      onPress: () => navigation.navigate('EditProfile'),
    },
    {
      label: 'Security',
      icon: 'shield-checkmark-outline',
      bgColor: COLORS.blueSoft,
      onPress: () => navigation.navigate('Security'),
    },
    {
      label: 'Setting',
      icon: 'settings-outline',
      bgColor: COLORS.blueAccent,
      onPress: () => navigation.navigate('Settings'),
    },
    {
      label: 'Help',
      icon: 'help-buoy-outline',
      bgColor: COLORS.blueSoft,
      onPress: () => navigation.navigate('OnlineSupport'),
    },
    {
      label: 'Logout',
      icon: 'log-out-outline',
      bgColor: COLORS.blueSoft,
      onPress: () => setLogoutVisible(true),
    },
  ];

  return (
    <SafeAreaView style={[styles.root, user.darkTheme && { backgroundColor: COLORS.darkBg }]}>
      <ScreenHeader
        title="Profile"
        onBack={() => navigation.goBack()}
        onBellPress={() => navigation.navigate('Notifications')}
      />

      <View style={[styles.sheet, user.darkTheme && { backgroundColor: COLORS.darkSurface }]}>
        <View style={styles.avatarWrap}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={44} color={COLORS.surfaceWhite} />
          </View>
          <Text style={[styles.name, user.darkTheme && { color: COLORS.darkText }]}>
            {user.name}
          </Text>
          <Text style={styles.userId}>ID: {user.userId}</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.menuList}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.label}
                style={styles.menuRow}
                activeOpacity={0.75}
                onPress={item.onPress}
              >
                <View style={[styles.iconBox, { backgroundColor: item.bgColor }]}>
                  <Ionicons name={item.icon} size={22} color={COLORS.surfaceWhite} />
                </View>
                <Text style={[styles.menuLabel, user.darkTheme && { color: COLORS.darkText }]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <LogoutDialog
        visible={logoutVisible}
        onCancel={() => setLogoutVisible(false)}
        onConfirm={() => {
          setLogoutVisible(false);
          navigation.navigate('MainTabs');
        }}
      />
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
    marginBottom: 24,
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
  name: {
    fontSize: 19,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  userId: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  menuList: {
    gap: 18,
    paddingBottom: 30,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: RADII.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textDark,
  },
});
