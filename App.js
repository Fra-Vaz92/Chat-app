import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
// Import the screens
import Start from './components/Start';
import Chat from './components/Chat';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Import navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Ignore all logs (optional)
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

const App = () => {
  

  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDYe3iStN5flKMeD_Y2C5rJvMm18Z00qMU",
    authDomain: "chat-app-c45c6.firebaseapp.com",
    projectId: "chat-app-c45c6",
    storageBucket: "chat-app-c45c6.firebasestorage.app",
    messagingSenderId: "615964408425",
    appId: "1:615964408425:web:afe3d21488498302e640f8"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize services
  const db = getFirestore(app);
  const storage = getStorage(app);
  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
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