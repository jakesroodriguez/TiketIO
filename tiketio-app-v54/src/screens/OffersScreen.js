import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../theme';

const CATEGORY_FILTERS = ['Todos', 'Alimentación', 'Bebidas', 'Higiene', 'Mascotas'];

export default function OffersScreen() {
  const { COLORS, SHADOWS } = useTheme();
  const [activeFilter, setActiveFilter] = React.useState('Todos');
  const styles = makeStyles(COLORS);

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header copy */}
      <Text style={styles.pageTitle}>Chollos del día</Text>
      <Text style={styles.pageSubtitle}>Actualizado cada 24h con las mejores ofertas</Text>

      {/* Filter chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        {CATEGORY_FILTERS.map((f) => {
          const isActive = activeFilter === f;
          return (
            <TouchableOpacity
              key={f}
              activeOpacity={0.8}
              onPress={() => setActiveFilter(f)}
              style={[
                styles.filterChip,
                { backgroundColor: isActive ? COLORS.primary : COLORS.surfaceContainerLow },
              ]}
            >
              <Text style={[styles.filterText, { color: isActive ? COLORS.white : COLORS.onSurfaceVariant }]}>
                {f}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Empty state */}
      <View style={[styles.emptyCard, { backgroundColor: COLORS.surface }, SHADOWS.card]}>
        <Ionicons name="pricetags-outline" size={48} color={COLORS.outlineVariant} />
        <Text style={[styles.emptyTitle, { color: COLORS.onSurface }]}>Cargando ofertas...</Text>
        <Text style={[styles.emptySub, { color: COLORS.outline }]}>
          Completa tu perfil con tus supermercados y preferencias para ver chollos personalizados
        </Text>
        <View style={[styles.tipBox, { backgroundColor: COLORS.primaryLight }]}>
          <Ionicons name="bulb-outline" size={16} color={COLORS.primary} />
          <Text style={[styles.tipText, { color: COLORS.primary }]}>
            Cuantos más tickets escanees, más precisas serán tus ofertas
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 100,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.onSurface,
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 14,
    color: COLORS.outline,
    marginBottom: 18,
  },
  filterScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  filterChip: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 20,
    marginRight: 10,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
  },
  emptyCard: {
    borderRadius: 22,
    padding: 32,
    alignItems: 'center',
    gap: 10,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },
  emptySub: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  tipBox: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 14,
    borderRadius: 16,
    width: '100%',
  },
  tipText: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
});
