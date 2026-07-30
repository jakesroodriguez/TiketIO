import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../theme';

const TABS = [
  { id: 'dashboard', label: 'Inicio',     icon: 'home-outline',        iconActive: 'home' },
  { id: 'offers',    label: 'Chollos',    icon: 'pricetag-outline',    iconActive: 'pricetag' },
  { id: 'ocr',       label: '',           icon: 'scan-outline',        isCenter: true },
  { id: 'stats',     label: 'Stats',      icon: 'stats-chart-outline', iconActive: 'stats-chart' },
  { id: 'settings',  label: 'Ajustes',    icon: 'settings-outline',    iconActive: 'settings' },
];

export default function BottomNav({ activeTab, onSelectTab, onOpenOcr }) {
  const { COLORS, SHADOWS, islandStyle } = useTheme();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.15, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1,    duration: 1000, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  const islandRadius = islandStyle?.borderRadius ?? 36;

  return (
    <View style={styles.wrapper}>
      <View style={[
        styles.island,
        SHADOWS.island,
        {
          backgroundColor: COLORS.surface,
          borderRadius: islandRadius,
        },
      ]}>
        {TABS.map((tab) => {
          if (tab.isCenter) {
            return (
              <View key={tab.id} style={styles.centerSlot}>
                <Animated.View style={[
                  styles.pulseRing,
                  { backgroundColor: COLORS.primaryContainer + '28', transform: [{ scale: pulseAnim }] },
                ]} />
                <TouchableOpacity
                  activeOpacity={0.85}
                  style={[styles.centerFab, { backgroundColor: COLORS.primary }]}
                  onPress={onOpenOcr}
                >
                  <Ionicons name="scan-outline" size={24} color={COLORS.white} />
                </TouchableOpacity>
              </View>
            );
          }

          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              activeOpacity={0.7}
              style={styles.tabItem}
              onPress={() => onSelectTab(tab.id)}
            >
              {isActive && (
                <View style={[styles.activeDot, { backgroundColor: COLORS.primaryContainer }]} />
              )}
              <View style={[
                styles.tabIconWrap,
                isActive && { backgroundColor: COLORS.primaryLight },
              ]}>
                <Ionicons
                  name={isActive ? tab.iconActive : tab.icon}
                  size={20}
                  color={isActive ? COLORS.primary : COLORS.outlineVariant}
                />
              </View>
              <Text style={[
                styles.tabLabel,
                { color: isActive ? COLORS.primary : COLORS.outlineVariant,
                  fontWeight: isActive ? '700' : '500' },
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 18,
    left: 14,
    right: 14,
  },
  island: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    overflow: 'hidden',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    gap: 2,
    position: 'relative',
  },
  tabIconWrap: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    overflow: 'hidden',
  },
  activeDot: {
    position: 'absolute',
    top: -2,
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  tabLabel: {
    fontSize: 10,
  },
  centerSlot: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseRing: {
    position: 'absolute',
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  centerFab: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    overflow: 'hidden',
  },
});
