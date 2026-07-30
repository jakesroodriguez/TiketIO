import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
  ScrollView, Animated, Dimensions,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Svg, { Path, Circle, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import { useTheme } from '../theme';

const { width } = Dimensions.get('window');
const CHART_W = width - 40;
const CHART_H = 160;

function SpendChart({ color }) {
  const w = CHART_W - 12;
  const h = CHART_H;
  const y0 = h - 30;
  const d = `M 0,${y0} C ${w/4},${y0} ${w/2},${y0} ${w},${y0}`;
  const fill = `M 0,${y0} C ${w/4},${y0} ${w/2},${y0} ${w},${y0} L ${w},${h} L 0,${h} Z`;
  return (
    <Svg width={w} height={h}>
      <Defs>
        <SvgGradient id="dashGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={color} stopOpacity="0.30" />
          <Stop offset="1" stopColor={color} stopOpacity="0.0" />
        </SvgGradient>
      </Defs>
      <Path d={fill} fill="url(#dashGrad)" />
      <Path d={d} stroke={color} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <Circle cx={w} cy={y0} r="6" fill={color} />
      <Circle cx={w} cy={y0} r="14" fill={color} fillOpacity="0.18" />
    </Svg>
  );
}

const PERIODS = ['Esta Semana', 'Este Mes', '3 Meses'];

const STAT_CARDS = [
  { label: 'Tickets escaneados', value: '0',   sub: 'Este mes',   icon: 'receipt-outline',          color: '#3EB489' },
  { label: 'Dinero ahorrado',    value: '0 €', sub: 'Este mes',   icon: 'shield-checkmark-outline', color: '#22c55e' },
  { label: 'Gasto medio',        value: '0 €', sub: 'Por ticket', icon: 'radio-button-on-outline',  color: '#6366f1' },
  { label: 'Categoría top',      value: '—',   sub: 'Sin datos',  icon: 'bag-handle-outline',        color: '#f97316' },
];

export default function DashboardScreen({ onOpenOcr }) {
  const { COLORS, SHADOWS } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [period, setPeriod] = useState('Este Mes');
  const s = makeStyles(COLORS);

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 550, useNativeDriver: true }).start();
  }, []);

  return (
    <Animated.ScrollView
      contentContainerStyle={s.scrollContent}
      showsVerticalScrollIndicator={false}
      style={[s.mainContainer, { opacity: fadeAnim }]}
    >
      {/* ── Chart Card (Swiss Fintech Hero Card) ── */}
      <View style={[s.chartCard, SHADOWS.card]}>
        {/* Period Selector Chips */}
        <View style={s.periodRow}>
          {PERIODS.map((p) => (
            <TouchableOpacity
              key={p}
              activeOpacity={0.75}
              onPress={() => setPeriod(p)}
              style={[
                s.periodChip,
                period === p ? { backgroundColor: COLORS.primaryContainer } : { backgroundColor: COLORS.surfaceContainerLow },
              ]}
            >
              <Text style={[
                s.periodText,
                { color: period === p ? '#FFFFFF' : COLORS.onSurfaceVariant, fontWeight: period === p ? '700' : '600' },
              ]}>
                {p}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[s.totalAmount, { color: COLORS.primary }]}>0,00 €</Text>
        <View style={s.totalMeta}>
          <Text style={[s.totalLabel, { color: COLORS.outline }]}>Total gastado en compras</Text>
          <View style={[s.changePill, { backgroundColor: COLORS.surfaceContainerLow }]}>
            <Ionicons name="remove-outline" size={12} color={COLORS.outline} />
            <Text style={[s.changeText, { color: COLORS.outline }]}>Sin tickets registrados</Text>
          </View>
        </View>

        <View style={s.chartWrap}>
          <SpendChart color={COLORS.primaryContainer} />
        </View>

        <View style={s.xLabels}>
          {['1 Jul','8 Jul','15 Jul','22 Jul','29 Jul'].map((l) => (
            <Text key={l} style={[s.xLabel, { color: COLORS.outlineVariant }]}>{l}</Text>
          ))}
        </View>
      </View>

      {/* ── High-Contrast Scan Action Banner ── */}
      <TouchableOpacity
        activeOpacity={0.88}
        style={[s.scanBtn, { backgroundColor: COLORS.primaryContainer }, SHADOWS.button]}
        onPress={onOpenOcr}
      >
        <View style={s.scanIconCircle}>
          <Ionicons name="scan-outline" size={24} color="#FFFFFF" />
        </View>
        <View style={s.scanTextWrap}>
          <Text style={s.scanBtnTitle}>Escanear nuevo ticket</Text>
          <Text style={s.scanBtnSub}>Reconocimiento ultrarrápido con IA</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
      </TouchableOpacity>

      {/* ── 4 Stat Cards Grid ── */}
      <View style={s.grid}>
        {STAT_CARDS.map((c, i) => (
          <View key={i} style={[s.statCard, SHADOWS.card]}>
            <Text style={[s.statLabel, { color: COLORS.outline }]}>{c.label}</Text>
            <View style={s.statBottom}>
              <View>
                <Text style={[s.statValue, { color: COLORS.primary }]}>{c.value}</Text>
                <Text style={[s.statSub, { color: COLORS.outline }]}>{c.sub}</Text>
              </View>
              <View style={[s.statIconBg, { backgroundColor: c.color + '16' }]}>
                <Ionicons name={c.icon} size={22} color={c.color} />
              </View>
            </View>
          </View>
        ))}
      </View>
    </Animated.ScrollView>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 110,
    gap: 16,
  },
  chartCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 22,
    overflow: 'hidden',
  },
  periodRow: { flexDirection: 'row', gap: 8, marginBottom: 18 },
  periodChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 999 },
  periodText: { fontSize: 13 },
  totalAmount: { fontSize: 40, fontWeight: '900', letterSpacing: -1.5, marginBottom: 4 },
  totalMeta: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  totalLabel: { fontSize: 13, fontWeight: '500' },
  changePill: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  changeText: { fontSize: 12, fontWeight: '600' },
  chartWrap: { marginBottom: 10, marginHorizontal: -4 },
  xLabels: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 4 },
  xLabel: { fontSize: 12, fontWeight: '600' },

  scanBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 24,
    gap: 14,
  },
  scanIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanTextWrap: {
    flex: 1,
  },
  scanBtnTitle: { color: '#FFFFFF', fontSize: 17, fontWeight: '800' },
  scanBtnSub: { color: 'rgba(255, 255, 255, 0.85)', fontSize: 12, fontWeight: '500', marginTop: 1 },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
  statCard: {
    width: '47.5%',
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 18,
    gap: 14,
    overflow: 'hidden',
  },
  statLabel: { fontSize: 13, fontWeight: '600' },
  statBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  statValue: { fontSize: 24, fontWeight: '900', letterSpacing: -0.5 },
  statSub: { fontSize: 12, marginTop: 3 },
  statIconBg: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
});
