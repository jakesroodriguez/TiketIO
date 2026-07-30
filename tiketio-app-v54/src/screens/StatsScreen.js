import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Svg, { Circle, G } from 'react-native-svg';
import { useTheme } from '../theme';

const SIZE = 130;
const SW = 14;
const R = (SIZE - SW) / 2;
const CIRC = 2 * Math.PI * R;

function MiniDonut({ pct, color, bg }) {
  return (
    <View style={{ width: SIZE, height: SIZE, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={SIZE} height={SIZE}>
        <G rotation="-90" origin={`${SIZE / 2},${SIZE / 2}`}>
          <Circle cx={SIZE / 2} cy={SIZE / 2} r={R} stroke={bg} strokeWidth={SW} fill="none" />
          <Circle
            cx={SIZE / 2} cy={SIZE / 2} r={R}
            stroke={color} strokeWidth={SW} fill="none"
            strokeDasharray={CIRC}
            strokeDashoffset={CIRC * (1 - pct / 100)}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <View style={{ position: 'absolute', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: '800', color }}>{pct}%</Text>
      </View>
    </View>
  );
}

export default function StatsScreen() {
  const { COLORS, SHADOWS } = useTheme();
  const styles = makeStyles(COLORS);

  const statCards = [
    { label: 'Ahorro total', value: '0 €', icon: 'trending-down-outline', color: COLORS.primary },
    { label: 'Tickets escaneados', value: '0', icon: 'receipt-outline', color: COLORS.primaryContainer },
    { label: 'Supermercados', value: '0', icon: 'storefront-outline', color: '#6366f1' },
    { label: 'Descuento medio', value: '0%', icon: 'stats-chart-outline', color: '#f97316' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.pageTitle}>Mis estadísticas</Text>
      <Text style={styles.pageSubtitle}>Sigue tu progreso de ahorro</Text>

      {/* Stat grid */}
      <View style={styles.statGrid}>
        {statCards.map((s, i) => (
          <View key={i} style={[styles.statCard, { backgroundColor: COLORS.surface }, SHADOWS.card]}>
            <View style={[styles.statIconBg, { backgroundColor: s.color + '18' }]}>
              <Ionicons name={s.icon} size={22} color={s.color} />
            </View>
            <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
            <Text style={[styles.statLabel, { color: COLORS.outline }]}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* Donut chart section */}
      <View style={[styles.chartCard, { backgroundColor: COLORS.surface }, SHADOWS.card]}>
        <Text style={[styles.chartTitle, { color: COLORS.onSurface }]}>Distribución de ahorro</Text>
        <View style={styles.chartRow}>
          <MiniDonut pct={0} color={COLORS.primaryContainer} bg={COLORS.surfaceContainerLow} />
          <View style={styles.chartLegend}>
            {[
              { label: 'Alimentación', color: COLORS.primaryContainer },
              { label: 'Bebidas', color: '#6366f1' },
              { label: 'Higiene', color: '#f97316' },
            ].map((l, i) => (
              <View key={i} style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: l.color }]} />
                <Text style={[styles.legendText, { color: COLORS.onSurfaceVariant }]}>{l.label}</Text>
                <Text style={[styles.legendPercent, { color: COLORS.outline }]}>0%</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.emptyNotice, { backgroundColor: COLORS.primaryLight }]}>
          <Ionicons name="information-circle-outline" size={16} color={COLORS.primary} />
          <Text style={[styles.emptyNoticeText, { color: COLORS.primary }]}>
            Escanea tickets para ver tu distribución de gasto
          </Text>
        </View>
      </View>

      {/* History empty state */}
      <View style={[styles.historyCard, { backgroundColor: COLORS.surface }, SHADOWS.card]}>
        <Ionicons name="time-outline" size={40} color={COLORS.outlineVariant} />
        <Text style={[styles.historyTitle, { color: COLORS.onSurface }]}>Sin historial</Text>
        <Text style={[styles.historySub, { color: COLORS.outline }]}>
          Tu historial de tickets aparecerá aquí conforme los escanees
        </Text>
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
    marginBottom: 20,
  },
  statGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    width: '47%',
    borderRadius: 20,
    padding: 18,
    gap: 8,
  },
  statIconBg: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  chartCard: {
    borderRadius: 22,
    padding: 22,
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 18,
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  chartLegend: {
    flex: 1,
    paddingLeft: 20,
    gap: 14,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  legendPercent: {
    fontSize: 14,
    fontWeight: '700',
  },
  emptyNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 14,
  },
  emptyNoticeText: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  historyCard: {
    borderRadius: 22,
    padding: 32,
    alignItems: 'center',
    gap: 8,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 4,
  },
  historySub: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
});
