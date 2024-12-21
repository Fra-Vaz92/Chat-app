import { useState, useEffect } from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { Bubble, GiftedChat,InputToolbar } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";



const Chat = ({ route, navigation, db, isConnected }) => {
  const { name, background, userID } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Set the navigation title
    navigation.setOptions({ title: name });

    // Create a Firestore query to get messages ordered by createdAt
    const fetchMessages = async () => {
      if (isConnected) {
        // Create a Firestore query to get messages ordered by createdAt
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
        const unsubMessages = onSnapshot(q, async (snapshot) => {
          const newMessages = snapshot.docs.map((doc) => {
            const data = doc.data();
            const createdAt = data.createdAt ? data.createdAt.toDate() : new Date();
            return {
              _id: doc.id,
              text: data.text,
              createdAt,
              user: data.user,
            };
          });

          setMessages(newMessages);

          try {
            // Cache messages in AsyncStorage
            await AsyncStorage.setItem("cachedMessages", JSON.stringify(newMessages));
          } catch (error) {
            console.error("Error caching messages:", error);
          }
        });

        return () => unsubMessages(); // Cleanup on unmount
      } else {
        // Load cached messages from AsyncStorage
        try {
          const cachedMessages = await AsyncStorage.getItem("cachedMessages");
          if (cachedMessages) {
            setMessages(JSON.parse(cachedMessages));
          } else {
            console.log("No cached messages found.");
          }
        } catch (error) {
          console.error("Error loading cached messages:", error);
        }
      }
    };

    fetchMessages();
  }, [db, isConnected, name]);

  // Send a new message to Firestore
  const onSend = (newMessages) => {
    const [message] = newMessages;

    addDoc(collection(db, "messages"), {
      _id: message._id,
      text: message.text,
      createdAt: serverTimestamp(),
      user: message.user,
    });

    setMessages((prev) => GiftedChat.append(prev, newMessages));
  };

  // Customize InputToolbar rendering based on connection status
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: background || "#fff" }]}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{ _id: userID, name }}
        renderBubble={(props) => (
          <Bubble
            {...props}
            wrapperStyle={{
              right: { backgroundColor: "#000" },
              left: { backgroundColor: "#FFF" },
            }}
          />
        )}
        renderInputToolbar={renderInputToolbar} // Use the custom InputToolbar
      />
      {Platform.OS === "android" ? <KeyboardAvoidingView behavior="height" /> : null}
      {Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
