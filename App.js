// App.js
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import DevicesScreen from './src/screens/DevicesScreen';
import { View } from 'react-native';


const App = () => {
  const [currentScreen, setCurrentScreen] = useState('login');

  switch (currentScreen) {
    case 'login':
      return <LoginScreen onLoginSuccess={() => setCurrentScreen('devices')} />;
    case 'devices':
      return <DevicesScreen />;
    default:
      return <View><Text>Unknown screen</Text></View>;
  }
};

export default App;