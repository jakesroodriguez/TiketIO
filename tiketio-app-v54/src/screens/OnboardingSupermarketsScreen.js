import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../theme';

const SUPERMARKETS = [
  { id: 'mercadona', name: 'Mercadona', icon: 'cart-outline' },
  { id: 'carrefour', name: 'Carrefour', icon: 'basket-outline' },
  { id: 'lidl', name: 'Lidl', icon: 'storefront-outline' },
  { id: 'eroski', name: 'Eroski', icon: 'bag-handle-outline' },
  { id: 'dia', name: 'Dia', icon: 'bag-outline' },
  { id: 'alcampo', name: 'Alcampo', icon: 'cube-outline' },
  { id: 'consum', name: 'Consum', icon: 'gift-outline' },
  { id: 'aldi', name: 'Aldi', icon: 'pricetags-outline' },
];

export default function OnboardingSupermarketsScreen({ onNext, onSkip, onBack }) {
  const { COLORS, SHADOWS } = useTheme();
  const [selected, setSelected] = useState([]);
  const styles = makeStyles(COLORS);

  const toggle = (id) => {
    setSelected(selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.stepRow}>
        <View style={styles.dot} />
        <View style={[styles.dot, styles.dotActive, { backgroundColor: COLORS.primary }]} />
        <View style={styles.dot} />
      </View>
      <Text style={styles.stepBadge}>PASO 2 DE 3</Text>
      <Text style={[styles.title, { color: COLORS.onSurface }]}>¿Dónde sueles comprar?</Text>
      <Text style={[styles.subtitle, { color: COLORS.outline }]}>
        Selecciona tus supermercados para comparar precios
      </Text>

      <View style={[styles.card, { backgroundColor: COLORS.surface }, SHADOWS.card]}>
        <View style={styles.cardHeader}>
          <Ionicons name="storefront-outline" size={22} color={COLORS.primary} />
          <Text style={[styles.cardTitle, { color: COLORS.onSurface }]}>Supermercados</Text>
          {selected.length > 0 && (
            <View style={[styles.badge, { backgroundColor: COLORS.primaryContainer }]}>
              <Text style={styles.badgeText}>{selected.length}</Text>
            </View>
          )}
        </View>

        <View style={styles.grid}>
          {SUPERMARKETS.map((s) => {
            const isActive = selected.includes(s.id);
            return (
              <TouchableOpacity
                key={s.id}
                activeOpacity={0.8}
                onPress={() => toggle(s.id)}
                style={[
                  styles.superCard,
                  {
                    backgroundColor: isActive ? COLORS.primaryLight : COLORS.surfaceContainerLow,
                    borderColor: isActive ? COLORS.primary : 'transparent',
                    borderWidth: 1.5,
                  },
                ]}
              >
                <View style={[styles.superIconBg, { backgroundColor: isActive ? COLORS.primary + '22' : COLORS.surfaceContainerHigh }]}>
                  <Ionicons name={s.icon} size={22} color={isActive ? COLORS.primary : COLORS.outline} />
                </View>
                <Text style={[styles.superName, { color: isActive ? COLORS.primary : COLORS.onSurface, fontWeight: isActive ? '700' : '500' }]}>
                  {s.name}
                </Text>
                {isActive && (
                  <Ionicons name="checkmark-circle" size={18} color={COLORS.primary} style={styles.checkIcon} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.88}
        style={[styles.primaryBtn, { backgroundColor: COLORS.primaryContainer }, SHADOWS.button]}
        onPress={onNext}
      >
        <Text style={styles.primaryBtnText}>
          Continuar{selected.length > 0 ? ` (${selected.length})` : ''}
        </Text>
        <Ionicons name="arrow-forward" size={18} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.skipBtn} onPress={onSkip}>
        <Text style={[styles.skipText, { color: COLORS.outline }]}>Omitir por ahora</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  container: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 40, alignItems: 'center' },
  stepRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.surfaceContainerHigh },
  dotActive: { width: 24, borderRadius: 4 },
  stepBadge: { fontSize: 11, fontWeight: '700', color: COLORS.outline, letterSpacing: 1.5, marginBottom: 6 },
  title: { fontSize: 26, fontWeight: '800', marginBottom: 6 },
  subtitle: { fontSize: 14, textAlign: 'center', lineHeight: 20, marginBottom: 24 },
  card: { width: '100%', borderRadius: 24, padding: 20, marginBottom: 20, gap: 16 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  cardTitle: { fontSize: 17, fontWeight: '700', flex: 1 },
  badge: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  superCard: { width: '47%', borderRadius: 18, padding: 14, alignItems: 'center', gap: 8, position: 'relative' },
  superIconBg: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center' },
  superName: { fontSize: 13 },
  checkIcon: { position: 'absolute', top: 6, right: 6 },
  primaryBtn: { width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 18, borderRadius: 30, gap: 10, marginBottom: 14 },
  primaryBtnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  skipBtn: { padding: 8 },
  skipText: { fontSize: 14, fontWeight: '600' },
});
