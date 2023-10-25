import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import {socketService} from './Utils/socketIo';

let messagesArray = [];
const App = () => {
  const [message, setMessage] = useState('');
  const [receiveMessage, setReceiveMessage] = useState('');
  const [arrayData, setArrayData] = useState(messagesArray);

  useEffect(() => {
    console.log(Platform.Version);
    socketService.initializeSocket();
    socketService.on('new_message', data => {
      console.log('receiveMessage from server side ====>', data);
      let messages = messagesArray;
      messages.push(data);

      messagesArray = messages;
      setArrayData([...messages]);
    });
  }, []);

  const sendMessage = async () => {
    if (message !== '') {
      try {
        let senddata = {
          officerId: message,
        };

        socketService.emit('new_message', senddata);

        let messages = messagesArray;
        messages.push(senddata);
        messagesArray = messages;
        setArrayData([...messages]);
        console.log('send Message ===>', message);
      } catch (error) {
        console.log('error ===>', error);
      }
    } else {
      Alert.alert('please enter message');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={{marginBottom: 10}}>{receiveMessage}</Text>
      <Text style={styles.socketText}>Socket Demo</Text>
      <View style={{flex: 1, paddingHorizontal: 10}}>
        <FlatList
          data={arrayData}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  backgroundColor: 'lightblue',
                  padding: 10,
                  marginVertical: 5,
                  borderRadius: 10,
                }}>
                <Text style={{color: 'black'}}>{item.officerId}</Text>
              </View>
            );
          }}
        />
      </View>
      <View style={styles.sendBoxView}>
        <TextInput
          style={styles.messageInpute}
          placeholder="Enter here..."
          placeholderTextColor={'grey'}
          onChangeText={val => setMessage(val)}
        />
        <TouchableOpacity
          onPress={() => sendMessage()}
          style={styles.sendButton}>
          <Text style={{color: 'white', fontWeight: '600'}}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  socketText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 18,
    alignSelf: 'center',
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
  sendButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  messageInpute: {
    borderRadius: 5,
    borderWidth: 1,
    width: Dimensions.get('window').width / 1.5,
    marginTop: 10,
    padding: 10,
    marginRight: 10,
    color: 'black',
  },
  container: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: 'white',
  },
  sendBoxView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 40,
  },
});
