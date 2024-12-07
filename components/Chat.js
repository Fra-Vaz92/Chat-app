import { StyleSheet, View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

const Chat = () => {
  const route = useRoute();
  const { background } = route.params; // Access passed background color

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <Text>Welcome to the Chat Room!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  
});

export default Chat;