import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  ActivityIndicator,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../theme';

export default function OcrScannerScreen({ onClose }) {
  const { COLORS, SHADOWS } = useTheme();
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState(null);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  const handleTakePicture = async (cameraRef) => {
    if (cameraRef) {
      try {
        const photo = await cameraRef.takePictureAsync({ quality: 0.85 });
        if (photo?.uri) {
          processImage(photo.uri);
        }
      } catch (e) {
        console.warn('Camera takePicture error:', e);
      }
    }
  };

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.85,
      });

      if (!result.canceled && result.assets[0]?.uri) {
        processImage(result.assets[0].uri);
      }
    } catch (e) {
      console.warn('Image picker error:', e);
    }
  };

  const processImage = (uri) => {
    setCapturedImage(uri);
    setScanning(true);

    // Simulate real AI OCR Processing of the captured image
    setTimeout(() => {
      setScanning(false);
      
      // Simulate 20% chance of failure (e.g. blurry, not a ticket)
      const isFailed = Math.random() < 0.2;
      
      if (isFailed) {
        setScannedResult({
          error: true,
          message: 'No se ha detectado un ticket legible. Asegúrate de enfocar bien y de que haya buena luz.',
        });
        return;
      }

      const storeOptions = ['Mercadona', 'Carrefour', 'Lidl', 'Eroski', 'Consum'];
      const randomStore = storeOptions[Math.floor(Math.random() * storeOptions.length)];
      
      const itemOptions = [
        { name: 'Leche Desnatada', price: '1,20 €', saved: '0,15 €' },
        { name: 'Pan de Molde', price: '2,10 €', saved: '0,30 €' },
        { name: 'Huevos Docena', price: '3,45 €', saved: '0,50 €' },
        { name: 'Tomate Frito', price: '1,10 €', saved: '0,10 €' },
        { name: 'Atún Claro', price: '4,50 €', saved: '0,80 €' },
        { name: 'Queso Curado', price: '5,90 €', saved: '1,20 €' },
        { name: 'Plátano de Canarias', price: '2,30 €', saved: '0,40 €' },
        { name: 'Café Molido', price: '3,10 €', saved: '0,60 €' },
        { name: 'Aceite de Oliva', price: '8,50 €', saved: '1,50 €' },
        { name: 'Cereales Avena', price: '2,80 €', saved: '0,45 €' }
      ];

      // Shuffle and pick 2-5 items randomly
      const shuffled = [...itemOptions].sort(() => 0.5 - Math.random());
      const selectedItems = shuffled.slice(0, Math.floor(Math.random() * 4) + 2);
      
      // Calculate totals
      let totalNum = 0;
      let savingsNum = 0;
      selectedItems.forEach(item => {
        totalNum += parseFloat(item.price.replace(',', '.'));
        savingsNum += parseFloat(item.saved.replace(',', '.'));
      });
      
      setScannedResult({
        store: randomStore,
        date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
        total: totalNum.toFixed(2).replace('.', ',') + ' €',
        savings: savingsNum.toFixed(2).replace('.', ',') + ' €',
        items: selectedItems,
      });
    }, 2200);
  };

  let cameraRef = null;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      {/* Dark Navigation Header */}
      <View style={styles.darkHeader}>
        <TouchableOpacity activeOpacity={0.7} style={styles.closeBtn} onPress={onClose}>
          <Ionicons name="close" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.darkHeaderTitle}>Escáner IA de Ticket</Text>
        <TouchableOpacity activeOpacity={0.7} style={styles.closeBtn} onPress={handlePickImage}>
          <Ionicons name="images-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {!scannedResult ? (
        <View style={styles.viewfinderContainer}>
          {capturedImage && scanning ? (
            <View style={styles.previewContainer}>
              <Image source={{ uri: capturedImage }} style={styles.capturedPreview} />
              <View style={styles.scanningOverlay}>
                <ActivityIndicator size="large" color={COLORS.primaryContainer} />
                <Text style={styles.scanningText}>Analizando líneas de ticket con IA...</Text>
              </View>
            </View>
          ) : permission?.granted ? (
            <View style={styles.cameraFrame}>
              <CameraView
                style={StyleSheet.absoluteFillObject}
                facing="back"
                ref={(ref) => { cameraRef = ref; }}
              />
              {/* Overlay Finder Bounds */}
              <View style={styles.overlayMask}>
                <View style={styles.finderBox}>
                  <View style={[styles.corner, styles.tl, { borderColor: COLORS.primaryContainer }]} />
                  <View style={[styles.corner, styles.tr, { borderColor: COLORS.primaryContainer }]} />
                  <View style={[styles.corner, styles.bl, { borderColor: COLORS.primaryContainer }]} />
                  <View style={[styles.corner, styles.br, { borderColor: COLORS.primaryContainer }]} />
                </View>
                <Text style={styles.helperText}>Apunta la cámara hacia el ticket de compra</Text>
              </View>
            </View>
          ) : (
            <View style={styles.noPermissionBox}>
              <Ionicons name="camera-outline" size={48} color="rgba(255,255,255,0.4)" />
              <Text style={styles.noPermissionText}>Se requiere acceso a la cámara para escanear tickets.</Text>
              <TouchableOpacity style={[styles.permissionBtn, { backgroundColor: COLORS.primary }]} onPress={requestPermission}>
                <Text style={styles.permissionBtnText}>Conceder permiso</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Capture Controls */}
          <View style={styles.controlsRow}>
            <TouchableOpacity activeOpacity={0.7} style={styles.secondaryControlBtn} onPress={handlePickImage}>
              <Ionicons name="image-outline" size={24} color="#fff" />
              <Text style={styles.controlSubLabel}>Galeria</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              style={[styles.captureShutterBtn, { backgroundColor: COLORS.primaryContainer }]}
              onPress={() => handleTakePicture(cameraRef)}
              disabled={scanning}
            >
              <View style={styles.shutterInnerCircle} />
            </TouchableOpacity>

            <View style={styles.secondaryControlBtn}>
              <Ionicons name="flash-outline" size={24} color="rgba(255,255,255,0.4)" />
              <Text style={styles.controlSubLabel}>Auto</Text>
            </View>
          </View>
        </View>
      ) : (
        /* --- Scanning Result --- */
        <ScrollView contentContainerStyle={styles.resultContainer} showsVerticalScrollIndicator={false}>
          {scannedResult.error ? (
            <View style={[styles.resultCard, SHADOWS.card, { alignItems: 'center', paddingVertical: 40 }]}>
              <Ionicons name="warning-outline" size={48} color="#ef4444" style={{ marginBottom: 10 }} />
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700', marginBottom: 8 }}>Escaneo fallido</Text>
              <Text style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', fontSize: 14 }}>{scannedResult.message}</Text>
            </View>
          ) : (
            <View style={[styles.resultCard, SHADOWS.card]}>
              {capturedImage && (
                <Image source={{ uri: capturedImage }} style={styles.resultTicketThumb} />
              )}
              <View style={styles.successRow}>
                <Ionicons name="checkmark-circle" size={24} color={COLORS.primaryContainer} />
                <Text style={[styles.successText, { color: COLORS.primaryContainer }]}>¡Ticket procesado!</Text>
              </View>
              <Text style={styles.resultStore}>{scannedResult.store}</Text>
              <Text style={styles.resultDate}>{scannedResult.date}</Text>

              <View style={styles.divider} />

              <View style={styles.resultRow}>
                <Text style={styles.rLabel}>Total gastado</Text>
                <Text style={styles.rTotal}>{scannedResult.total}</Text>
              </View>
              <View style={styles.resultRow}>
                <Text style={styles.rLabel}>Ahorro TiketIO</Text>
                <Text style={[styles.rSaving, { color: COLORS.primaryContainer }]}>{scannedResult.savings}</Text>
              </View>

              <View style={styles.divider} />

              <Text style={styles.itemsTitle}>Productos reconocidos</Text>
              {scannedResult.items.map((item, i) => (
                <View key={i} style={styles.itemRow}>
                  <Ionicons name="pricetag-outline" size={16} color="rgba(255,255,255,0.5)" />
                  <Text style={styles.itemName}>{item.name}</Text>
                  <View style={styles.itemPrices}>
                    <Text style={styles.itemPrice}>{item.price}</Text>
                    <Text style={[styles.itemSaved, { color: COLORS.primaryContainer }]}>-{item.saved}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {!scannedResult.error && (
            <TouchableOpacity
              activeOpacity={0.85}
              style={[styles.doneBtn, { backgroundColor: COLORS.primaryContainer }]}
              onPress={onClose}
            >
              <Ionicons name="save-outline" size={20} color="#fff" />
              <Text style={styles.doneBtnText}>Guardar en mi ahorro</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.retryBtn} onPress={() => { setScannedResult(null); setCapturedImage(null); }}>
            <Text style={styles.retryText}>{scannedResult.error ? 'Intentar de nuevo' : 'Escanear otro ticket'}</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  darkHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#0f172a',
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkHeaderTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  viewfinderContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  cameraFrame: {
    flex: 1,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    marginVertical: 10,
  },
  overlayMask: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  finderBox: {
    width: '85%',
    height: '70%',
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderWidth: 3.5,
  },
  tl: { top: 0, left: 0, borderBottomWidth: 0, borderRightWidth: 0, borderTopLeftRadius: 10 },
  tr: { top: 0, right: 0, borderBottomWidth: 0, borderLeftWidth: 0, borderTopRightRadius: 10 },
  bl: { bottom: 0, left: 0, borderTopWidth: 0, borderRightWidth: 0, borderBottomLeftRadius: 10 },
  br: { bottom: 0, right: 0, borderTopWidth: 0, borderLeftWidth: 0, borderBottomRightRadius: 10 },
  helperText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 20,
  },
  previewContainer: {
    flex: 1,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    marginVertical: 10,
  },
  capturedPreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  scanningOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  scanningText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  noPermissionBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    paddingHorizontal: 20,
  },
  noPermissionText: {
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    fontSize: 14,
  },
  permissionBtn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },
  permissionBtnText: {
    color: '#fff',
    fontWeight: '700',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  secondaryControlBtn: {
    alignItems: 'center',
    gap: 4,
    width: 60,
  },
  controlSubLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 11,
  },
  captureShutterBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },
  shutterInnerCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 2.5,
    borderColor: '#fff',
    backgroundColor: 'transparent',
  },
  resultContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  resultCard: {
    backgroundColor: '#1e293b',
    borderRadius: 24,
    padding: 22,
    marginBottom: 20,
    gap: 10,
    overflow: 'hidden',
  },
  resultTicketThumb: {
    width: '100%',
    height: 140,
    borderRadius: 16,
    marginBottom: 8,
    resizeMode: 'cover',
  },
  successRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  successText: { fontSize: 14, fontWeight: '700' },
  resultStore: { color: '#fff', fontSize: 22, fontWeight: '800' },
  resultDate: { color: 'rgba(255,255,255,0.5)', fontSize: 13 },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.08)', marginVertical: 4 },
  resultRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 14 },
  rTotal: { color: '#fff', fontSize: 18, fontWeight: '800' },
  rSaving: { fontSize: 18, fontWeight: '800' },
  itemsTitle: { color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase', marginTop: 6 },
  itemRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  itemName: { color: 'rgba(255,255,255,0.8)', fontSize: 13, flex: 1 },
  itemPrices: { flexDirection: 'row', gap: 8 },
  itemPrice: { color: '#fff', fontSize: 13, fontWeight: '600' },
  itemSaved: { fontSize: 13, fontWeight: '700' },
  doneBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 16, borderRadius: 28, marginBottom: 12 },
  doneBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  retryBtn: { alignItems: 'center', padding: 10 },
  retryText: { color: 'rgba(255,255,255,0.5)', fontSize: 14, fontWeight: '600' },
});
