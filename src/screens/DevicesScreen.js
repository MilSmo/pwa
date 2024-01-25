// src/screens/DevicesScreen.js
import React, { useState } from 'react';
import { View, Button, Modal, StyleSheet } from 'react-native';
import {BleManager} from 'react-native-ble-plx'
import BleDeviceScanner from './BleDeviceScanner'; // Załóżmy, że BleDeviceScanner jest w tym samym folderze

const DevicesScreen = () => {
  const [isScannerVisible, setScannerVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Button title="Open Scanner" onPress={() => setScannerVisible(true)} />

      <Modal
        animationType="slide"
        transparent={false}
        visible={isScannerVisible}
        onRequestClose={() => setScannerVisible(false)}
      >
        <BleDeviceScanner />
        <Button title="Close Scanner" onPress={() => setScannerVisible(false)} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DevicesScreen;
