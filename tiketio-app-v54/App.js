import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import { ThemeProvider, useTheme } from './src/theme';
import Header from './src/components/Header';
import BottomNav from './src/components/BottomNav';
import WelcomeScreen from './src/screens/WelcomeScreen';
import OnboardingLocationScreen from './src/screens/OnboardingLocationScreen';
import OnboardingSupermarketsScreen from './src/screens/OnboardingSupermarketsScreen';
import OnboardingDietaryScreen from './src/screens/OnboardingDietaryScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import OcrScannerScreen from './src/screens/OcrScannerScreen';
import OffersScreen from './src/screens/OffersScreen';
import StatsScreen from './src/screens/StatsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import IntroAnimationScreen from './src/screens/IntroAnimationScreen';

const ONBOARDING = ['onboarding_1', 'onboarding_2', 'onboarding_3'];
const MAIN_TABS = ['dashboard', 'offers', 'stats', 'settings'];

const BACK_MAP = {
  onboarding_2: 'onboarding_1',
  onboarding_3: 'onboarding_2',
};

function AppInner() {
  const { COLORS } = useTheme();
  const [screen, setScreen] = useState('intro');
  const [activeTab, setActiveTab] = useState('dashboard');

  const go = (s) => setScreen(s);

  const handleTabSelect = (tabId) => {
    setActiveTab(tabId);
    go(tabId);
  };

  const goBack = () => {
    const prev = BACK_MAP[screen];
    if (prev) go(prev);
    else go('welcome');
  };

  const finishOnboarding = () => {
    setActiveTab('dashboard');
    go('dashboard');
  };

  const showHeader = !['welcome', 'ocr_scanner', 'intro'].includes(screen);
  const isOnboarding = ONBOARDING.includes(screen);
  const showNav = MAIN_TABS.includes(screen);

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: COLORS.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {showHeader && (
        <Header
          screen={screen}
          showBack={isOnboarding}
          onBack={goBack}
        />
      )}

      {/* Ambient blobs */}
      <View style={[styles.blob1, { backgroundColor: COLORS.primaryContainer }]} />
      <View style={[styles.blob2, { backgroundColor: COLORS.secondaryContainer }]} />

      <View style={styles.content}>
        {screen === 'intro' && (
          <IntroAnimationScreen onFinish={() => go('welcome')} />
        )}
        {screen === 'welcome' && (
          <WelcomeScreen onStart={() => go('onboarding_1')} />
        )}
        {screen === 'onboarding_1' && (
          <OnboardingLocationScreen
            onNext={() => go('onboarding_2')}
            onSkip={finishOnboarding}
          />
        )}
        {screen === 'onboarding_2' && (
          <OnboardingSupermarketsScreen
            onNext={() => go('onboarding_3')}
            onSkip={finishOnboarding}
            onBack={() => go('onboarding_1')}
          />
        )}
        {screen === 'onboarding_3' && (
          <OnboardingDietaryScreen
            onFinish={finishOnboarding}
            onSkip={finishOnboarding}
            onBack={() => go('onboarding_2')}
          />
        )}
        {screen === 'dashboard' && (
          <DashboardScreen
            onOpenOcr={() => go('ocr_scanner')}
            onNavigate={go}
          />
        )}
        {screen === 'ocr_scanner' && (
          <OcrScannerScreen onClose={finishOnboarding} />
        )}
        {screen === 'offers' && <OffersScreen />}
        {screen === 'stats' && <StatsScreen />}
        {screen === 'settings' && <SettingsScreen />}
      </View>

      {showNav && (
        <BottomNav
          activeTab={activeTab}
          onSelectTab={handleTabSelect}
          onOpenOcr={() => go('ocr_scanner')}
        />
      )}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { flex: 1 },
  blob1: {
    position: 'absolute',
    top: -80,
    right: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    opacity: 0.07,
    pointerEvents: 'none',
  },
  blob2: {
    position: 'absolute',
    bottom: 100,
    left: -80,
    width: 240,
    height: 240,
    borderRadius: 120,
    opacity: 0.08,
    pointerEvents: 'none',
  },
});
