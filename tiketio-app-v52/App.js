import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const DIETARY_OPTIONS = [
  'Vegano',
  'Sin Gluten',
  'Sin Lactosa',
  'Fitness',
  'Keto',
  'Vegetariano',
];

export default function App() {
  const [selectedTags, setSelectedTags] = useState(['Sin Gluten']);

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f7f9fb" />
      
      {/* Background ambient blurs */}
      <View style={styles.topBlur} />
      <View style={styles.bottomBlur} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.brandTitle}>TiketIO</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Step Indicator & Messaging */}
        <View style={styles.stepContainer}>
          <View style={styles.stepIndicatorsRow}>
            <View style={styles.stepDot} />
            <View style={styles.stepDot} />
            <View style={[styles.stepDot, styles.stepDotActive]} />
          </View>
          <Text style={styles.stepBadge}>PASO 3 DE 3</Text>
          <Text style={styles.title}>Configura tu perfil</Text>
        </View>

        {/* Glassmorphic Container Card */}
        <View style={styles.glassCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Preferencias</Text>
            <Text style={styles.cardIcon}>🍽️</Text>
          </View>

          <Text style={styles.cardDescription}>
            Dinos qué alimentos prefieres evitar para personalizar tus recomendaciones de ahorro.
          </Text>

          {/* Interactive Tags */}
          <View style={styles.tagsGrid}>
            {DIETARY_OPTIONS.map((tag) => {
              const isActive = selectedTags.includes(tag);
              return (
                <TouchableOpacity
                  key={tag}
                  activeOpacity={0.8}
                  onPress={() => toggleTag(tag)}
                  style={[
                    styles.tag,
                    isActive ? styles.tagActive : styles.tagInactive,
                  ]}
                >
                  <Text
                    style={[
                      styles.tagText,
                      isActive ? styles.tagTextActive : styles.tagTextInactive,
                    ]}
                  >
                    {isActive ? `✓  ${tag}` : tag}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Info Banner */}
          <View style={styles.infoBanner}>
            <Text style={styles.infoIcon}>ℹ️</Text>
            <Text style={styles.infoText}>
              Podrás cambiar estas preferencias en cualquier momento desde los ajustes de tu cuenta.
            </Text>
          </View>
        </View>

        {/* Action Button */}
        <View style={styles.actionSection}>
          <TouchableOpacity activeOpacity={0.85} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Finalizar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.skipButton}>
            <Text style={styles.skipText}>Omitir este paso por ahora</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f9fb',
  },
  topBlur: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#2ebd85',
    opacity: 0.1,
  },
  bottomBlur: {
    position: 'absolute',
    bottom: -50,
    left: -50,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#7efaba',
    opacity: 0.12,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  closeButton: {
    padding: 8,
  },
  closeIcon: {
    fontSize: 20,
    color: '#3d4a42',
    fontWeight: '600',
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#006c48',
    letterSpacing: -0.5,
  },
  stepContainer: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 24,
  },
  stepIndicatorsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e0e3e5',
  },
  stepDotActive: {
    width: 24,
    borderRadius: 4,
    backgroundColor: '#006c48',
  },
  stepBadge: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6d7a71',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#191c1e',
  },
  glassCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#191c1e',
  },
  cardIcon: {
    fontSize: 20,
  },
  cardDescription: {
    fontSize: 15,
    color: '#3d4a42',
    lineHeight: 22,
    marginBottom: 20,
  },
  tagsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  tag: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
  },
  tagInactive: {
    backgroundColor: '#f2f4f6',
    borderColor: 'transparent',
  },
  tagActive: {
    backgroundColor: '#006c48',
    borderColor: '#006c48',
  },
  tagText: {
    fontSize: 14,
    fontWeight: '600',
  },
  tagTextInactive: {
    color: '#3d4a42',
  },
  tagTextActive: {
    color: '#ffffff',
  },
  infoBanner: {
    flexDirection: 'row',
    backgroundColor: '#eceef0',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    gap: 10,
  },
  infoIcon: {
    fontSize: 16,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: '#3d4a42',
    lineHeight: 16,
  },
  actionSection: {
    width: '100%',
    marginTop: 32,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#2ebd85',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2ebd85',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 5,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  skipButton: {
    marginTop: 18,
    alignItems: 'center',
    padding: 8,
  },
  skipText: {
    color: '#6d7a71',
    fontSize: 14,
    fontWeight: '600',
  },
});
