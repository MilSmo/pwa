import React, { useState } from 'react';
import {BleManager} from 'react-native-ble-plx'
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';


const BleDeviceScanner = () => {

  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [displayText, setDisplayText] = useState('Scan Devices');

  // Implementacja funkcji skanowania, łączenia i rozłączania...
  const startScan = () => {
    _BleManager.startDeviceScan(Null, {
      allowDuplicates: false,
      },
      async (error, device) => {
        setDisplayText('Scanning...');
        if (error) {
          _BleManager.stopDeviceScan();
        }
        console.log(device.localName, device.name);
        if (device.localName == 'Test' || device.name == 'Test') {
          setDevices([...devices, device]);
          _BleManager.stopDeviceScan();} }, );};

    const connectDevice = device => {
            _BleManager.stopDeviceScan();
          _BleManager.connectToDevice(device.id).then(async device => {
                       await device.discoverAllServicesAndCharacteristics();
                       _BleManager.stopDeviceScan();
                       setDisplayText(`Device connected\n with ${device.name}`);
                        setConnectedDevice(device);
                           setDevices([]);
            device.services().then(async service => {
                    for (const ser of service) {
                        ser.characteristics().then(characteristic => {
                      getCharacteristics([...characteristic, characteristic]);
                        });
          }
        });
      });
    };

    const disconnectDevice = () => {
        connectedDevice.cancelConnection();
      };





  return (<View style={styles.mainContainer}>
    {devices.length == 0 ? (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={startScan}
          style={styles.circleView}>
          <Text style={styles.boldTextStyle}>{displayText}</Text>
        </TouchableOpacity>
      </View>
    ) : Object.keys(connectedDevice).length != 0 ? (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{marginBottom: 12, textAlign: 'center'}}>
          Tap button to disconnect device.
        </Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={disconnectDevice}
          style={styles.circleView}>
          <Text style={styles.boldTextStyle}>{displayText}</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <FlatList
        style={{flex: 1}}
        data={devices}
        keyExtractor={item => item.id.toString()}
        renderItem={items => (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => connectDevice(items.item)}
            style={{
              width: '100%',
              paddingVertical: 10,
              paddingHorizontal: 12,
              borderWidth: 1,
              borderRadius: 10,
            }}>
            <Text style={{color: 'black', fontSize: 18}}>
              {items.item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    )}
  </View>
);
};
export default BleDeviceScanner;

const styles = StyleSheet.create({
mainContainer: {
  flex: 1,
  padding: 10,
  // justifyContent: 'center',
  // alignItems: 'center',
},
circleView: {
  width: 250,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  height: 250,
  borderRadius: 150,
  borderWidth: 1,
},
boldTextStyle: {
  fontSize: 20,
  color: '#000',
  fontWeight: 'bold',
  textAlign: 'center',
},
});
