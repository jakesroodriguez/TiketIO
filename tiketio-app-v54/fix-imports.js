const fs = require('fs');
const files = [
  'src/screens/SettingsScreen.js',
  'src/screens/OnboardingSupermarketsScreen.js',
  'src/screens/OnboardingDietaryScreen.js',
  'src/screens/OnboardingLocationScreen.js',
  'src/screens/OffersScreen.js',
  'src/screens/OcrScannerScreen.js',
  'src/screens/DashboardScreen.js',
  'src/components/Header.js',
  'src/components/BottomNav.js',
];
const OLD = "import { Ionicons } from '@expo/vector-icons';";
const NEW = "import Ionicons from '@expo/vector-icons/Ionicons';";
let fixed = 0;
files.forEach(f => {
  if (!fs.existsSync(f)) return;
  let c = fs.readFileSync(f, 'utf8');
  if (c.includes(OLD)) {
    fs.writeFileSync(f, c.replace(OLD, NEW));
    console.log('Fixed: ' + f);
    fixed++;
  }
});
console.log('Done. Fixed ' + fixed + ' files.');
