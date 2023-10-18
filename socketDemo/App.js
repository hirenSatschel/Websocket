import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {socketService} from './Utils/socketIo';

const App = () => {
  const [message, setMessage] = useState('');
  const [receiveMessage, setReceiveMessage] = useState('');
  useEffect(() => {
    socketService.initializeSocket();
    socketService.on('reciveMessage', data => {
      console.log('receiveMessage from server side ====>', data);
      setReceiveMessage(data);
    });
  }, []);

  const sendMessage = async () => {
    if (message !== '') {
      try {
        console.log('send Message ===>', message);
        socketService.emit('creatMessage', message);
      } catch (error) {
        console.log('error ===>', error);
      }
    } else {
      Alert.alert('please enter message');
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
      }}>
      <Text style={{marginBottom: 10}}>{receiveMessage}</Text>
      <Text style={{color: 'black', fontWeight: '600', fontSize: 18}}>
        Socket Demo
      </Text>
      <TextInput
        style={{
          borderRadius: 5,
          borderWidth: 1,
          width: '100%',
          marginTop: 10,
          padding: 10,
        }}
        placeholder="Enter here..."
        onChangeText={val => setMessage(val)}
      />
      <TouchableOpacity
        onPress={() => sendMessage()}
        style={{
          backgroundColor: 'blue',
          padding: 10,
          borderRadius: 5,
          marginTop: 10,
        }}>
        <Text style={{color: 'white', fontWeight: '600'}}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
