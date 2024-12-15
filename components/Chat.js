import { useState, useEffect } from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";

const Chat = ({ route, navigation, db, isConnected }) => {
  const { name, background, userID } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Set the navigation title
    navigation.setOptions({ title: name });

    // Create a Firestore query to get messages ordered by createdAt
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubMessages = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => {
        const data = doc.data();
        const createdAt = data.createdAt ? data.createdAt.toDate() : new Date();  // Default to current date if createdAt is null
        return {
          _id: doc.id,
          text: data.text,
          createdAt,  // Handle missing createdAt field gracefully
          user: data.user,
        };
      });
      setMessages(newMessages);
    });

    // Cleanup on unmount or when the query changes
    return () => unsubMessages();
  }, [db, isConnected, name]);

  // Send a new message to Firestore
  const onSend = (newMessages) => {
    const [message] = newMessages; // Get the first message from the array

    // Create a new document in the Firestore messages collection
    addDoc(collection(db, "messages"), {
      _id: message._id,
      text: message.text,
      createdAt: serverTimestamp(),  // Use server timestamp for consistency
      user: message.user,
    });

    // Update the state for the local chat
    setMessages((prev) => GiftedChat.append(prev, newMessages));
  };

  return (
    <View style={[styles.container, { backgroundColor: background || "#fff" }]}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{ _id: userID, name }}  // Set the userID and name for the current user
        renderBubble={(props) => (
          <Bubble
            {...props}
            wrapperStyle={{
              right: { backgroundColor: "#000" },
              left: { backgroundColor: "#FFF" },
            }}
          />
        )}
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
