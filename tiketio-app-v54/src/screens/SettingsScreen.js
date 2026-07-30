import React, { useState } from 'react';
import {
  StyleSheet, Text, View, ScrollView,
  TouchableOpacity, Switch, Alert, Linking
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme, PALETTES, ISLAND_STYLES } from '../theme';

export default function SettingsScreen() {
  const {
    COLORS, SHADOWS,
    paletteKey, setPaletteKey,
    islandStyleKey, setIslandStyleKey,
  } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const styles = makeStyles(COLORS);

  const handleNotImplemented = (feature) => {
    Alert.alert('Próximamente', `La función "${feature}" estará disponible en una próxima versión.`);
  };

  const sections = [
    {
      title: 'Cuenta',
      items: [
        { icon: 'person-circle-outline', label: 'Mi perfil', sub: 'Nombre, email y contraseña', action: () => handleNotImplemented('Mi perfil') },
        { icon: 'shield-checkmark-outline', label: 'Privacidad', sub: 'Gestión de datos personales', action: () => handleNotImplemented('Privacidad') },
      ],
    },
    {
      title: 'Preferencias de compra',
      items: [
        { icon: 'storefront-outline', label: 'Supermercados', sub: 'Editar cadenas habituales', action: () => handleNotImplemented('Supermercados') },
        { icon: 'nutrition-outline', label: 'Dieta', sub: 'Preferencias alimentarias', action: () => handleNotImplemented('Dieta') },
        { icon: 'location-outline', label: 'Ubicación', sub: 'Zona de búsqueda y radio', action: () => handleNotImplemented('Ubicación') },
      ],
    },
    {
      title: 'Soporte',
      items: [
        { icon: 'help-circle-outline', label: 'Ayuda y FAQ', sub: 'Preguntas frecuentes', action: () => handleNotImplemented('Ayuda') },
        { icon: 'mail-outline', label: 'Contacto', sub: 'Envíanos tu feedback', action: () => handleNotImplemented('Contacto') },
        { icon: 'information-circle-outline', label: 'Acerca de', sub: 'Versión 1.0.0 · TiketIO', action: () => Alert.alert('TiketIO', 'Versión 1.0.0\nHecho con ❤️') },
      ],
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.pageTitle}>Ajustes</Text>

      {/* ── Paleta de colores ── */}
      <View style={[styles.card, SHADOWS.card]}>
        <View style={styles.cardHeader}>
          <View style={[styles.cardIconBg, { backgroundColor: COLORS.primaryLight }]}>
            <Ionicons name="color-palette-outline" size={18} color={COLORS.primary} />
          </View>
          <Text style={[styles.cardTitle, { color: COLORS.onSurface }]}>Paleta de colores</Text>
        </View>
        <Text style={[styles.cardSub, { color: COLORS.outline }]}>Cambia el tema visual de la app</Text>
        <View style={styles.paletteGrid}>
          {Object.entries(PALETTES).map(([key, pal]) => {
            const isActive = paletteKey === key;
            return (
              <TouchableOpacity
                key={key}
                activeOpacity={0.8}
                onPress={() => setPaletteKey(key)}
                style={[
                  styles.paletteTile,
                  {
                    backgroundColor: isActive ? pal.primaryContainer + '18' : COLORS.surfaceContainerLow,
                    borderColor: isActive ? pal.primaryContainer : COLORS.surfaceContainerHigh,
                    borderWidth: 2,
                  },
                ]}
              >
                <View style={[styles.paletteDot, { backgroundColor: pal.primaryContainer }]} />
                <Text style={[styles.paletteName, { color: COLORS.onSurface, fontWeight: isActive ? '700' : '500' }]}>
                  {pal.name}
                </Text>
                {isActive && <Ionicons name="checkmark-circle" size={16} color={pal.primaryContainer} />}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* ── Estilo de la isla ── */}
      <View style={[styles.card, SHADOWS.card]}>
        <View style={styles.cardHeader}>
          <View style={[styles.cardIconBg, { backgroundColor: COLORS.primaryLight }]}>
            <Ionicons name="apps-outline" size={18} color={COLORS.primary} />
          </View>
          <Text style={[styles.cardTitle, { color: COLORS.onSurface }]}>Estilo de la isla</Text>
        </View>
        <Text style={[styles.cardSub, { color: COLORS.outline }]}>Apariencia de la barra de navegación</Text>
        <View style={styles.islandRow}>
          {Object.entries(ISLAND_STYLES).map(([key, style]) => {
            const isActive = islandStyleKey === key;
            return (
              <TouchableOpacity
                key={key}
                activeOpacity={0.8}
                onPress={() => setIslandStyleKey(key)}
                style={[
                  styles.islandTile,
                  {
                    backgroundColor: isActive ? COLORS.primaryLight : COLORS.surfaceContainerLow,
                    borderColor: isActive ? COLORS.primary : COLORS.surfaceContainerHigh,
                    borderWidth: 2,
                  },
                ]}
              >
                <Ionicons name={style.icon} size={22} color={isActive ? COLORS.primary : COLORS.outline} />
                <Text style={[styles.islandLabel, { color: isActive ? COLORS.primary : COLORS.outline, fontWeight: isActive ? '700' : '500' }]}>
                  {style.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* ── Notificaciones ── */}
      <View style={[styles.card, SHADOWS.card]}>
        <View style={styles.switchRow}>
          <View style={styles.cardHeader}>
            <View style={[styles.cardIconBg, { backgroundColor: COLORS.primaryLight }]}>
              <Ionicons name="notifications-outline" size={18} color={COLORS.primary} />
            </View>
            <View>
              <Text style={[styles.settingLabel, { color: COLORS.onSurface }]}>Notificaciones</Text>
              <Text style={[styles.settingSub, { color: COLORS.outline }]}>Alertas de ofertas y ahorros</Text>
            </View>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: COLORS.surfaceContainerHigh, true: COLORS.primaryContainer }}
            thumbColor={notifications ? COLORS.primary : COLORS.outlineVariant}
          />
        </View>
      </View>

      {/* ── Secciones ── */}
      {sections.map((section, si) => (
        <View key={si} style={styles.section}>
          <Text style={[styles.sectionLabel, { color: COLORS.outline }]}>{section.title.toUpperCase()}</Text>
          <View style={[styles.sectionCard, { backgroundColor: COLORS.surface }, SHADOWS.card]}>
            {section.items.map((item, ii) => (
              <TouchableOpacity
                key={ii}
                activeOpacity={0.7}
                onPress={item.action}
                style={[
                  styles.settingRow,
                  ii < section.items.length - 1 && { borderBottomWidth: 1, borderBottomColor: COLORS.surfaceContainerHigh },
                ]}
              >
                <View style={[styles.settingIconBg, { backgroundColor: COLORS.primaryLight }]}>
                  <Ionicons name={item.icon} size={17} color={COLORS.primary} />
                </View>
                <View style={styles.settingTexts}>
                  <Text style={[styles.settingLabel, { color: COLORS.onSurface }]}>{item.label}</Text>
                  <Text style={[styles.settingSub, { color: COLORS.outline }]}>{item.sub}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={COLORS.outlineVariant} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      {/* ── Sesión ── */}
      <TouchableOpacity
        activeOpacity={0.85}
        style={[styles.loginBtn, { backgroundColor: COLORS.primaryContainer }, SHADOWS.button]}
        onPress={() => handleNotImplemented('Iniciar sesión')}
      >
        <Ionicons name="log-in-outline" size={20} color="#fff" />
        <Text style={styles.loginBtnText}>Iniciar sesión</Text>
      </TouchableOpacity>

      {/* ── Botón de Autor ── */}
      <View style={{ alignItems: 'center', marginTop: 32 }}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.authorBtn}
          onPress={() => Linking.openURL('https://www.instagram.com/jakesroodriguez')}
        >
          <View style={styles.authorIconBubble}>
            <Ionicons name="code-slash-outline" size={14} color="#9ca3af" />
          </View>
          <View style={styles.authorTextContainer}>
            <Text style={styles.authorSubText}>DESIGNED & BUILT BY</Text>
            <Text style={styles.authorMainText}>@jakesroodriguez</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const makeStyles = (COLORS) => StyleSheet.create({
  container: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 110 },
  pageTitle: { fontSize: 26, fontWeight: '800', color: COLORS.onSurface, marginBottom: 16 },
  card: { backgroundColor: COLORS.surface, borderRadius: 22, padding: 18, marginBottom: 14, gap: 12, overflow: 'hidden' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  cardIconBg: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  cardTitle: { fontSize: 16, fontWeight: '700' },
  cardSub: { fontSize: 13, marginTop: -6 },
  paletteGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  paletteTile: { width: '47%', flexDirection: 'row', alignItems: 'center', gap: 10, borderRadius: 18, padding: 12, overflow: 'hidden' },
  paletteDot: { width: 26, height: 26, borderRadius: 13, overflow: 'hidden' },
  paletteName: { fontSize: 13, flex: 1 },
  islandRow: { flexDirection: 'row', gap: 10 },
  islandTile: { flex: 1, alignItems: 'center', gap: 6, borderRadius: 18, padding: 14, overflow: 'hidden' },
  islandLabel: { fontSize: 12 },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  section: { marginBottom: 6 },
  sectionLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 1.2, marginBottom: 8, marginLeft: 4 },
  sectionCard: { borderRadius: 20, overflow: 'hidden' },
  settingRow: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  settingIconBg: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  settingTexts: { flex: 1 },
  settingLabel: { fontSize: 14, fontWeight: '600' },
  settingSub: { fontSize: 12, marginTop: 1 },
  loginBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 16, borderRadius: 20, marginTop: 8 },
  loginBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  authorBtn: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', borderRadius: 30 },
  authorIconBubble: { padding: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  authorTextContainer: { flexDirection: 'column', alignItems: 'flex-start' },
  authorSubText: { fontSize: 9, textTransform: 'uppercase', letterSpacing: 2, color: 'rgba(156, 163, 175, 0.6)', fontWeight: '500', marginBottom: 2 },
  authorMainText: { fontSize: 14, fontWeight: '700', letterSpacing: 0.5, color: '#9ca3af' },
});
