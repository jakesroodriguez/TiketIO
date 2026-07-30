import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Dimensions, Easing, Text } from 'react-native';
import { useTheme } from '../theme';

const { width, height } = Dimensions.get('window');

// Helper to create grid points
const gridPoints = Array.from({ length: 40 }).map((_, i) => i);

export default function IntroAnimationScreen({ onFinish }) {
  const { COLORS } = useTheme();

  // Animation Values
  const bgOpacity = useRef(new Animated.Value(1)).current;
  
  // Cards cascade
  const card1Y = useRef(new Animated.Value(-300)).current;
  const card2Y = useRef(new Animated.Value(-300)).current;
  const card3Y = useRef(new Animated.Value(-300)).current;
  const cardsScale = useRef(new Animated.Value(1)).current;

  // Global Scanner
  const scannerY = useRef(new Animated.Value(-200)).current;
  
  // Brand
  const brandScale = useRef(new Animated.Value(0)).current;
  const brandOpacity = useRef(new Animated.Value(0)).current;

  // Background Grid
  const gridOpacity = useRef(new Animated.Value(0)).current;
  const gridScale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // 0. Fade in grid background immediately
    Animated.parallel([
      Animated.timing(gridOpacity, {
        toValue: 0.15,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(gridScale, {
        toValue: 1,
        duration: 4000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      })
    ]).start();

    // 1. Cascade of 3 cards (Slightly slower so it's readable)
    Animated.stagger(150, [
      Animated.spring(card1Y, { toValue: -60, friction: 6, tension: 40, useNativeDriver: true }),
      Animated.spring(card2Y, { toValue: -15, friction: 6, tension: 40, useNativeDriver: true }),
      Animated.spring(card3Y, { toValue: 30, friction: 6, tension: 40, useNativeDriver: true }),
    ]).start();

    // 2. Global Scanner Sweep (Slower sweep, starts after cards land)
    Animated.timing(scannerY, {
      toValue: height + 200,
      duration: 1200,
      delay: 700,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();

    // 3. Cards collapse after giving the user 1.5s to read them
    Animated.timing(cardsScale, {
      toValue: 0,
      duration: 400,
      delay: 2200,
      easing: Easing.back(2),
      useNativeDriver: true,
    }).start();

    // 4. Logo Explodes Out (Wait for cards to collapse)
    Animated.parallel([
      Animated.timing(brandOpacity, {
        toValue: 1,
        duration: 300,
        delay: 2400,
        useNativeDriver: true,
      }),
      Animated.spring(brandScale, {
        toValue: 1,
        friction: 6,
        tension: 50,
        delay: 2400,
        useNativeDriver: true,
      }),
    ]).start();

    // 5. Exit sequence (Wait 1.5s reading the logo)
    Animated.timing(bgOpacity, {
      toValue: 0,
      duration: 500,
      delay: 4200,
      useNativeDriver: true,
    }).start(() => {
      if (onFinish) onFinish();
    });

  }, []);

  return (
    <View style={styles.container}>
      {/* Absolute Dark Background */}
      <Animated.View style={[
        StyleSheet.absoluteFillObject,
        { backgroundColor: COLORS.primary, opacity: bgOpacity }
      ]}>
        
        {/* Dynamic Background Grid Pattern to fill space */}
        <Animated.View style={[
          StyleSheet.absoluteFillObject, 
          styles.gridContainer,
          { opacity: gridOpacity, transform: [{ scale: gridScale }] }
        ]}>
          {gridPoints.map((i) => (
            <View key={i} style={[styles.gridDot, { backgroundColor: COLORS.primaryContainer }]} />
          ))}
        </Animated.View>

        <View style={styles.content}>
          {/* Card 1 (Back) */}
          <Animated.View style={[
            styles.card, styles.cardBack,
            { 
              backgroundColor: COLORS.surface,
              transform: [{ translateY: card1Y }, { scale: cardsScale }, { scale: 0.9 }, { rotate: '-4deg' }]
            }
          ]} />

          {/* Card 2 (Middle) */}
          <Animated.View style={[
            styles.card, styles.cardBack,
            { 
              backgroundColor: COLORS.surface,
              transform: [{ translateY: card2Y }, { scale: cardsScale }, { scale: 0.95 }, { rotate: '2deg' }]
            }
          ]} />

          {/* Card 3 (Front) - Main Notification */}
          <Animated.View style={[
            styles.card,
            { 
              backgroundColor: COLORS.surface,
              borderColor: COLORS.primaryContainer,
              borderWidth: 2,
              transform: [{ translateY: card3Y }, { scale: cardsScale }]
            }
          ]}>
            <View style={styles.cardHeader}>
               <View style={[styles.iconPlaceholder, { backgroundColor: COLORS.primary }]} />
               <View>
                 <Text style={[styles.cardTitle, { color: COLORS.text }]}>Gasto Detectado</Text>
                 <Text style={[styles.cardSub, { color: COLORS.outline }]}>Mercadona • 42.50€</Text>
               </View>
            </View>
            {/* Fake data lines to fill card */}
            <View style={[styles.dataLine, { width: '80%', backgroundColor: COLORS.border, marginTop: 16 }]} />
            <View style={[styles.dataLine, { width: '60%', backgroundColor: COLORS.border }]} />
            <View style={[styles.dataLine, { width: '90%', backgroundColor: COLORS.border }]} />
          </Animated.View>

          {/* Massive Global Scanner */}
          <Animated.View style={[
            styles.globalScanner,
            { 
              backgroundColor: COLORS.primaryContainer,
              transform: [{ translateY: scannerY }] 
            }
          ]} />

          {/* Final Hook Brand Name */}
          <Animated.View style={[
            StyleSheet.absoluteFillObject,
            styles.brandContainer,
            { opacity: brandOpacity, transform: [{ scale: brandScale }] }
          ]}>
            <Text style={[styles.brandTitle, { color: '#ffffff' }]}>Tiket.io</Text>
            <Text style={[styles.brandSub, { color: COLORS.primaryContainer }]}>AHORRO AUTOMÁTICO</Text>
          </Animated.View>

        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignContent: 'space-around',
    padding: 20,
  },
  gridDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    margin: Dimensions.get('window').width / 10, // Creates a spacious grid
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    position: 'absolute',
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 10,
  },
  cardBack: {
    height: 140, // Just empty white cards for the cascade effect
    opacity: 0.9,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 16,
    marginRight: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  cardSub: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 2,
  },
  dataLine: {
    height: 8,
    borderRadius: 4,
    marginTop: 10,
  },
  globalScanner: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: -100, // Start offscreen top
    height: 8,
    shadowColor: '#10B981', // Mint Green glow
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 40, // Huge glow
    elevation: 20,
    zIndex: 100,
  },
  brandContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 200, // On top of everything
  },
  brandTitle: {
    fontSize: 64, // Bigger
    fontWeight: '900',
    letterSpacing: -2,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 10 },
    textShadowRadius: 20,
  },
  brandSub: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 6,
    marginTop: 12,
  },
});
