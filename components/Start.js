import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground, Alert } from "react-native";
import { getAuth, signInAnonymously } from 'firebase/auth';

const Start = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [selectedBackground, setBackground] = useState('');
  const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

  const auth = getAuth();

  const signInUser = async () => {
    try {
      const res = await signInAnonymously(auth);
      return res.user.uid; // Return user ID
    } catch (err) {
      Alert.alert("Unable to sign in, try later again");
      return null;
    }
  };

  const handleStartChat = async () => {
    if (!username) {
      Alert.alert("Username is required to start chatting.");
      return;
    }

    try {
      const { user } = await signInAnonymously(auth); // Sign in the user anonymously

      // Display success alert and navigate after delay
      Alert.alert("Login Successful", "You are signed in anonymously!");
      setTimeout(() => {
        navigation.navigate("Chat", {
          userID: user.uid, // Pass the user ID
          name: username, // Pass the username
          background: selectedBackground, // Pass the selected background
        });
      }, 3000); // 3-second delay
    } catch (error) {
      Alert.alert("Failed to sign in. Please try again later.");
      console.error("Anonymous Sign-In Error: ", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require("../assets/background.png")} style={styles.ImageBackground}>
        <Text style={styles.title}>Let's Chat!</Text>
        <View style={styles.contentContainer}>
          <View style={styles.box}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                onChangeText={setUsername}
                value={username}
              />
            </View>
            <Text style={styles.label}>Choose background color:</Text>
            <View style={{ flexDirection: 'row' }}>
              {colors.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.colorOption, { backgroundColor: color }]}
                  onPress={() => setBackground(color)}
                />
              ))}
            </View>
          </View>
          <TouchableOpacity
            accessible={true}
            accessibilityLabel="Start Chatting"
            accessibilityHint="Starts the chat"
            accessibilityRole="button"
            style={styles.button}
            onPress={handleStartChat}
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
title: {
  fontSize: 45,
  fontWeight: '600',
  color: '#FFFFFF',
  position: 'absolute',
  textAlign: 'center',
  position: 'absolute', // Position the title absolutely
  top: 30, // Adjust the top position as needed
},
input: {
  width: "100%",
  padding: 15,
  borderWidth: 1,
  borderColor: "#757083",
  marginBottom: 20,
  fontSize: 16,
  fontWeight: "300",
  color: "#00000",
},
label: {
    fontSize: 16,
    fontWeight: '300',
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
},
colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
    borderWidth: 1,
    borderColor: '#757083',
},
selectedColorOption: {
    borderWidth: 2,
    borderColor: 'white',
},
button: {
    backgroundColor: '#757083',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    width: '80%', // Adjust width as needed
},
buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
},
ImageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center', // Center content horizontally
},
contentContainer: {
    backgroundColor: '#fff', // White background for content
    padding: 20,
    borderRadius: 10,
    width: '80%', // Adjust width as needed
    alignItems:'center',
},
});


  export default Start;