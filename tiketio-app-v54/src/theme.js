import React, { createContext, useContext, useState } from 'react';

export const PALETTES = {
  swissFintech: {
    name: 'Swiss Fintech 🇨🇭',
    emoji: '🇨🇭',
    primary: '#0A1B3D',            // Night Blue
    primaryContainer: '#3EB489',   // Mint Green
    primaryLight: 'rgba(62, 180, 137, 0.15)',
    secondaryContainer: '#86f8c8',
    gradientStart: '#3EB489',
    gradientEnd: '#0A1B3D',
  },
  emerald: {
    name: 'Verde Esmeralda',
    emoji: '🟢',
    primary: '#006c48',
    primaryContainer: '#2ebd85',
    primaryLight: 'rgba(46, 189, 133, 0.12)',
    secondaryContainer: '#7efaba',
    gradientStart: '#2ebd85',
    gradientEnd: '#006c48',
  },
  indigo: {
    name: 'Índigo Premium',
    emoji: '🔵',
    primary: '#3730a3',
    primaryContainer: '#6366f1',
    primaryLight: 'rgba(99, 102, 241, 0.12)',
    secondaryContainer: '#c7d2fe',
    gradientStart: '#6366f1',
    gradientEnd: '#3730a3',
  },
  navy: {
    name: 'Azul Marino',
    emoji: '🔷',
    primary: '#1e3a5f',
    primaryContainer: '#2563eb',
    primaryLight: 'rgba(37, 99, 235, 0.12)',
    secondaryContainer: '#bfdbfe',
    gradientStart: '#2563eb',
    gradientEnd: '#1e3a5f',
  },
};

export const ISLAND_STYLES = {
  pill:   { borderRadius: 36, label: 'Pastilla',  icon: 'remove-outline' },
  rounded:{ borderRadius: 24, label: 'Redondeada',icon: 'radio-button-off-outline' },
  flat:   { borderRadius: 12, label: 'Plana',     icon: 'reorder-two-outline' },
};

export const NEUTRAL = {
  background: '#fbf8fc',
  surface: '#ffffff',
  surfaceContainerLow: '#f5f3f6',
  surfaceContainerHigh: '#eae7eb',
  onSurface: '#1b1b1e',
  onSurfaceVariant: '#45464e',
  outline: '#75777f',
  outlineVariant: '#c5c6cf',
  white: '#ffffff',
  error: '#ba1a1a',
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [paletteKey, setPaletteKey] = useState('swissFintech');
  const [islandStyleKey, setIslandStyleKey] = useState('pill');
  const palette = PALETTES[paletteKey];
  const islandStyle = ISLAND_STYLES[islandStyleKey];

  const COLORS = { ...NEUTRAL, ...palette, paletteKey };

  const SHADOWS = {
    card: {
      shadowColor: '#0A1B3D',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.08,
      shadowRadius: 16,
      elevation: 4,
    },
    button: {
      shadowColor: palette.primaryContainer,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.35,
      shadowRadius: 16,
      elevation: 7,
    },
    island: {
      shadowColor: '#0A1B3D',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.12,
      shadowRadius: 24,
      elevation: 16,
    },
  };

  return (
    <ThemeContext.Provider value={{
      COLORS, SHADOWS, paletteKey, setPaletteKey,
      islandStyleKey, setIslandStyleKey, islandStyle, PALETTES, ISLAND_STYLES,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
