import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Map, Modal, Panel } from './components';

export default function App() {
  const [puntos, setPuntos] = useState([]);
  const [visibility, setVisibility] = useState(false);

  const handleLongPress = ({ nativeEvent }) => {
    const newPuntos = puntos.concat({ 
      coordinate: nativeEvent.coordinate
    })
    setPuntos(newPuntos);
    console.log(puntos);
  }
  return (
    <View style={styles.container}>
      <Map onLongPress={handleLongPress} />
      <Panel />
      <Modal visibility={visibility}><Text>lala</Text></Modal>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
