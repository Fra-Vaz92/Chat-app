import React, { useState, useEffect } from 'react';
import { LogBox, Alert } from "react-native";
import { StyleSheet } from 'react-native';
// Import the screens
import Start from './components/Start';
import Chat from './components/Chat';
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { useNetInfo }from '@react-native-community/netinfo';


// Import navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Ignore all logs (optional)
LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

const App = () => {
  const connectionStatus = useNetInfo();

  //Handle when users lose connection
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDYe3iStN5flKMeD_Y2C5rJvMm18Z00qMU",
    authDomain: "chat-app-c45c6.firebaseapp.com",
    projectId: "chat-app-c45c6",
    storageBucket: "chat-app-c45c6.firebasestorage.app",
    messagingSenderId: "615964408425",
    appId: "1:615964408425:web:afe3d21488498302e640f8"
  };

  // Initialize Firebase only if it hasn't been initialized already
 // Initialize Firebase app
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

  // Initialize services
  const db = getFirestore(app);
  const storage = getStorage(app);
 // Initialize Auth with persistence, only if not already initialized
let auth;
try {
  auth = getAuth(app);
} catch (error) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
}

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
              auth={auth}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  box1: {
    flex:1,
    backgroundColor: 'blue'
  },
  box2: {
    flex:12,
    backgroundColor: 'red'
  },
  box3: {
    flex:5,
    backgroundColor: 'green'
  }
});

export default App;