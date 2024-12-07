import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground} from "react-native";
import { useNavigation } from '@react-navigation/native';


const Start = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];
    const [selectedBackground, setBackground] = useState('');

    const handleStartChat = () => {
      navigation.navigate('Chat', { background: selectedBackground }); // Pass color as a param
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
              { /* user choose bg color among the object options */ }
              <Text style={styles.label}>Choose background color:</Text>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  style={[styles.colorOption, { backgroundColor: colors[0] }]}
                  onPress={() => setBackground(colors[0])}
                />
                <TouchableOpacity
                  style={[styles.colorOption, { backgroundColor: colors[1] }]}
                  onPress={() => setBackground(colors[1])}
                />
                <TouchableOpacity
                  style={[styles.colorOption, { backgroundColor: colors[2] }]}
                  onPress={() => setBackground(colors[2])}
                />
                <TouchableOpacity
                  style={[styles.colorOption, { backgroundColor: colors[3] }]}
                  onPress={() => setBackground(colors[3])}
                />
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleStartChat}>
              <Text style={styles.buttonText}>Start Chatting</Text>
            </TouchableOpacity>
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