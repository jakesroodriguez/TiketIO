import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../theme';

const logoAsset = require('../../assets/logo.png');
const { width } = Dimensions.get('window');

export default function WelcomeScreen({ onStart }) {
  const { COLORS, SHADOWS } = useTheme();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(scaleAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();

    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.05, duration: 900, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
      ])
    );
    pulseLoop.start();
    return () => pulseLoop.stop();
  }, []);

  const styles = makeStyles(COLORS);

  return (
    <View style={styles.container}>
      {/* Background Ambient Blobs */}
      <View style={[styles.blob1, { backgroundColor: COLORS.primaryContainer }]} />
      <View style={[styles.blob2, { backgroundColor: COLORS.secondaryContainer }]} />

      {/* Hero Logo & Branding */}
      <Animated.View style={[styles.heroSection, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <Animated.View style={[styles.logoWrap, { transform: [{ scale: pulseAnim }] }]}>
          <Image source={logoAsset} style={styles.brandLogoImage} resizeMode="contain" />
        </Animated.View>

        <Text style={[styles.brandTitle, { color: COLORS.primary }]}>TiketIO</Text>
        <View style={[styles.tagPill, { backgroundColor: COLORS.primaryLight }]}>
          <Ionicons name="sparkles" size={14} color={COLORS.primary} />
          <Text style={[styles.tagPillText, { color: COLORS.primary }]}>IA & Ahorro Inteligente</Text>
        </View>
        <Text style={[styles.brandSubtitle, { color: COLORS.onSurfaceVariant }]}>
          Escanea los tickets del súper y descubre inmediatamente dónde y cuánto puedes ahorrar.
        </Text>
      </Animated.View>

      {/* Interactive Value Cards */}
      <Animated.View style={[styles.featuresGrid, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <View style={[styles.featureCard, { backgroundColor: COLORS.surface }, SHADOWS.card]}>
          <View style={[styles.featureIconBox, { backgroundColor: COLORS.primaryLight }]}>
            <Ionicons name="camera-outline" size={26} color={COLORS.primary} />
          </View>
          <View style={styles.featureContent}>
            <Text style={[styles.featureTitle, { color: COLORS.onSurface }]}>Cámara & OCR IA Real</Text>
            <Text style={[styles.featureDesc, { color: COLORS.outline }]}>Toma fotos directas de tus tickets físicos y extrae los precios al instante.</Text>
          </View>
        </View>

        <View style={[styles.featureCard, { backgroundColor: COLORS.surface }, SHADOWS.card]}>
          <View style={[styles.featureIconBox, { backgroundColor: 'rgba(34, 197, 94, 0.12)' }]}>
            <Ionicons name="trending-down-outline" size={26} color="#22c55e" />
          </View>
          <View style={styles.featureContent}>
            <Text style={[styles.featureTitle, { color: COLORS.onSurface }]}>Control de Gastos 100% Preciso</Text>
            <Text style={[styles.featureDesc, { color: COLORS.outline }]}>Visualiza tus gastos mensuales en gráficos sin datos inventados.</Text>
          </View>
        </View>

        <View style={[styles.featureCard, { backgroundColor: COLORS.surface }, SHADOWS.card]}>
          <View style={[styles.featureIconBox, { backgroundColor: 'rgba(99, 102, 241, 0.12)' }]}>
            <Ionicons name="storefront-outline" size={24} color="#6366f1" />
          </View>
          <View style={styles.featureContent}>
            <Text style={[styles.featureTitle, { color: COLORS.onSurface }]}>Supermercados Cercanos</Text>
            <Text style={[styles.featureDesc, { color: COLORS.outline }]}>Compara entre Mercadona, Carrefour, Lidl y más.</Text>
          </View>
        </View>
      </Animated.View>

      {/* CTA Box */}
      <Animated.View style={[styles.ctaBox, { opacity: fadeAnim }]}>
        <TouchableOpacity
          activeOpacity={0.88}
          style={[styles.startBtn, { backgroundColor: COLORS.primaryContainer }, SHADOWS.button]}
          onPress={onStart}
        >
          <Text style={styles.startBtnText}>Empezar gratis ahora</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={[styles.footerText, { color: COLORS.outline }]}>
          Sin registros complejos · Rápido y privado
        </Text>
      </Animated.View>
    </View>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 36,
  },
  blob1: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 260,
    height: 260,
    borderRadius: 130,
    opacity: 0.1,
  },
  blob2: {
    position: 'absolute',
    bottom: 30,
    left: -50,
    width: 220,
    height: 220,
    borderRadius: 110,
    opacity: 0.12,
  },
  heroSection: {
    alignItems: 'center',
    marginTop: 4,
  },
  logoWrap: {
    width: 100,
    height: 100,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandLogoImage: {
    width: 96,
    height: 96,
  },
  brandTitle: {
    fontSize: 40,
    fontWeight: '900',
    letterSpacing: -1,
    marginBottom: 6,
  },
  tagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  tagPillText: {
    fontSize: 13,
    fontWeight: '700',
  },
  brandSubtitle: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 8,
  },
  featuresGrid: {
    gap: 14,
    marginVertical: 6,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 22,
    gap: 16,
    overflow: 'hidden',
  },
  featureIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 3,
  },
  featureDesc: {
    fontSize: 12,
    lineHeight: 17,
  },
  ctaBox: {
    width: '100%',
    alignItems: 'center',
    gap: 10,
  },
  startBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 28,
    gap: 10,
  },
  startBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  footerText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
