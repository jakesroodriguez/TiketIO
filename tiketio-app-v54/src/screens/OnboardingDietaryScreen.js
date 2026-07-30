import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../theme';

const DIETARY_OPTIONS = [
  { id: 'vegan', label: 'Vegano', icon: 'leaf-outline' },
  { id: 'gluten', label: 'Sin Gluten', icon: 'ban-outline' },
  { id: 'lactose', label: 'Sin Lactosa', icon: 'water-outline' },
  { id: 'fitness', label: 'Fitness', icon: 'fitness-outline' },
  { id: 'keto', label: 'Keto', icon: 'flame-outline' },
  { id: 'veggie', label: 'Vegetariano', icon: 'flower-outline' },
];

export default function OnboardingDietaryScreen({ onFinish, onSkip, onBack }) {
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
        <View style={styles.dot} />
        <View style={[styles.dot, styles.dotActive, { backgroundColor: COLORS.primary }]} />
      </View>
      <Text style={styles.stepBadge}>PASO 3 DE 3</Text>
      <Text style={[styles.title, { color: COLORS.onSurface }]}>Tu perfil dietético</Text>
      <Text style={[styles.subtitle, { color: COLORS.outline }]}>
        Personaliza tus recomendaciones de ahorro y ofertas
      </Text>

      <View style={[styles.card, { backgroundColor: COLORS.surface }, SHADOWS.card]}>
        <View style={styles.cardHeader}>
          <Ionicons name="nutrition-outline" size={22} color={COLORS.primary} />
          <Text style={[styles.cardTitle, { color: COLORS.onSurface }]}>Preferencias</Text>
        </View>
        <Text style={[styles.cardDesc, { color: COLORS.onSurfaceVariant }]}>
          Dinos qué alimentos prefieres evitar
        </Text>

        <View style={styles.tagsGrid}>
          {DIETARY_OPTIONS.map((tag) => {
            const isActive = selected.includes(tag.id);
            return (
              <TouchableOpacity
                key={tag.id}
                activeOpacity={0.8}
                onPress={() => toggle(tag.id)}
                style={[
                  styles.tag,
                  {
                    backgroundColor: isActive ? COLORS.primary : COLORS.surfaceContainerLow,
                    borderColor: isActive ? COLORS.primary : 'transparent',
                  },
                ]}
              >
                <Ionicons name={tag.icon} size={16} color={isActive ? COLORS.white : COLORS.outline} />
                <Text style={[styles.tagText, { color: isActive ? COLORS.white : COLORS.onSurfaceVariant }]}>
                  {tag.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={[styles.infoBanner, { backgroundColor: COLORS.primaryLight }]}>
          <Ionicons name="information-circle-outline" size={16} color={COLORS.primary} />
          <Text style={[styles.infoText, { color: COLORS.primary }]}>
            Puedes cambiar esto en cualquier momento desde Ajustes
          </Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.88}
        style={[styles.primaryBtn, { backgroundColor: COLORS.primaryContainer }, SHADOWS.button]}
        onPress={onFinish}
      >
        <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
        <Text style={styles.primaryBtnText}>Finalizar y entrar</Text>
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
  card: { width: '100%', borderRadius: 24, padding: 20, marginBottom: 20, gap: 14 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  cardTitle: { fontSize: 17, fontWeight: '700' },
  cardDesc: { fontSize: 14, lineHeight: 20 },
  tagsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  tag: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 11, borderRadius: 24, borderWidth: 1, gap: 6 },
  tagText: { fontSize: 14, fontWeight: '600' },
  infoBanner: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 14, borderRadius: 14 },
  infoText: { fontSize: 12, fontWeight: '600', flex: 1 },
  primaryBtn: { width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 18, borderRadius: 30, gap: 10, marginBottom: 14 },
  primaryBtnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  skipBtn: { padding: 8 },
  skipText: { fontSize: 14, fontWeight: '600' },
});
