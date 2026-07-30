import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../theme';

const RADIUS_OPTIONS = ['2 km', '5 km', '10 km', '15 km'];

export default function OnboardingLocationScreen({ onNext, onSkip }) {
  const { COLORS, SHADOWS } = useTheme();
  const [city, setCity] = useState('');
  const [selectedRadius, setSelectedRadius] = useState('5 km');
  const styles = makeStyles(COLORS);

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Steps */}
      <View style={styles.stepRow}>
        <View style={[styles.dot, styles.dotActive, { backgroundColor: COLORS.primary }]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
      <Text style={styles.stepBadge}>PASO 1 DE 3</Text>
      <Text style={[styles.title, { color: COLORS.onSurface }]}>¿Dónde compras?</Text>
      <Text style={[styles.subtitle, { color: COLORS.outline }]}>
        Usamos tu zona para encontrar las mejores ofertas cerca de ti
      </Text>

      {/* Card */}
      <View style={[styles.card, { backgroundColor: COLORS.surface }, SHADOWS.card]}>
        <View style={styles.cardHeader}>
          <Ionicons name="location" size={22} color={COLORS.primary} />
          <Text style={[styles.cardTitle, { color: COLORS.onSurface }]}>Tu zona de compra</Text>
        </View>

        <View style={[styles.inputWrap, { backgroundColor: COLORS.surfaceContainerLow }]}>
          <Ionicons name="search-outline" size={18} color={COLORS.outline} />
          <TextInput
            style={[styles.input, { color: COLORS.onSurface }]}
            value={city}
            onChangeText={setCity}
            placeholder="Ciudad o código postal..."
            placeholderTextColor={COLORS.outline}
          />
          {city ? (
            <TouchableOpacity onPress={() => setCity('')}>
              <Ionicons name="close-circle" size={18} color={COLORS.outline} />
            </TouchableOpacity>
          ) : null}
        </View>

        <TouchableOpacity activeOpacity={0.8} style={[styles.gpsBtn, { backgroundColor: COLORS.primaryLight }]}>
          <Ionicons name="navigate-outline" size={18} color={COLORS.primary} />
          <Text style={[styles.gpsBtnText, { color: COLORS.primary }]}>Usar mi ubicación actual (GPS)</Text>
        </TouchableOpacity>

        <Text style={[styles.label, { color: COLORS.onSurfaceVariant }]}>Radio de búsqueda:</Text>
        <View style={styles.radiusRow}>
          {RADIUS_OPTIONS.map((r) => {
            const a = selectedRadius === r;
            return (
              <TouchableOpacity
                key={r}
                activeOpacity={0.8}
                onPress={() => setSelectedRadius(r)}
                style={[styles.chip, { backgroundColor: a ? COLORS.primary : COLORS.surfaceContainerLow }]}
              >
                <Text style={[styles.chipText, { color: a ? COLORS.white : COLORS.onSurfaceVariant }]}>{r}</Text>
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
        <Text style={styles.primaryBtnText}>Continuar</Text>
        <Ionicons name="arrow-forward" size={18} color={COLORS.white} />
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
  inputWrap: { flexDirection: 'row', alignItems: 'center', borderRadius: 16, paddingHorizontal: 14, paddingVertical: 13, gap: 10 },
  input: { flex: 1, fontSize: 15, fontWeight: '500' },
  gpsBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 16, paddingVertical: 12, gap: 8 },
  gpsBtnText: { fontSize: 14, fontWeight: '600' },
  label: { fontSize: 13, fontWeight: '600' },
  radiusRow: { flexDirection: 'row', gap: 8 },
  chip: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 14 },
  chipText: { fontSize: 13, fontWeight: '600' },
  primaryBtn: { width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 18, borderRadius: 30, gap: 10, marginBottom: 14 },
  primaryBtnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  skipBtn: { padding: 8 },
  skipText: { fontSize: 14, fontWeight: '600' },
});
