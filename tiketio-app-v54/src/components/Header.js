import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../theme';

const logoAsset = require('../../assets/logo.png');

const SCREEN_TITLES = {
  dashboard: 'Inicio',
  offers: 'Chollos',
  stats: 'Estadísticas',
  settings: 'Ajustes',
  onboarding_1: 'TiketIO',
  onboarding_2: 'TiketIO',
  onboarding_3: 'TiketIO',
};

export default function Header({ screen, showBack, onBack }) {
  const { COLORS } = useTheme();
  const styles = makeStyles(COLORS);
  const title = SCREEN_TITLES[screen] || 'TiketIO';

  return (
    <View style={styles.container}>
      <View style={styles.leftSlot}>
        {showBack ? (
          <TouchableOpacity activeOpacity={0.7} style={styles.iconBtn} onPress={onBack}>
            <Ionicons name="arrow-back" size={20} color={COLORS.onSurfaceVariant} />
          </TouchableOpacity>
        ) : (
          <Image source={logoAsset} style={styles.brandHeaderLogo} resizeMode="contain" />
        )}
      </View>

      <Text style={[styles.title, { color: COLORS.primary }]}>{title}</Text>

      <View style={styles.rightSlot}>
        <TouchableOpacity activeOpacity={0.7} style={[styles.iconBtn, { backgroundColor: COLORS.primaryLight }]}>
          <Ionicons name="notifications-outline" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 10,
    backgroundColor: COLORS.background,
  },
  leftSlot: { width: 40 },
  rightSlot: { width: 40, alignItems: 'flex-end' },
  brandHeaderLogo: {
    width: 32,
    height: 32,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
});
