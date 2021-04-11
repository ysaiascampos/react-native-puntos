import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Map, Modal, Panel, Input, List } from './components';

export default function App() {
  const [puntos, setPuntos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [puntoTemp, setPuntoTemp] = useState({});
  const [visibility, setVisibility] = useState(false);
  const [visibilityFilter, setVisibilityFilter] = useState('new_punto');// new_punto, all_puntos
  const [btnLista, setBtnLista] = useState('Lista');
  const [pointsFilter, setPointsFilter] = useState(true);

  const togglePointsFilter = () => setPointsFilter(!pointsFilter);

  const handleLongPress = ({ nativeEvent }) => {
    setVisibilityFilter('new_punto');
    setPuntoTemp(nativeEvent.coordinate);
    setVisibility(true);
  }
  const handleChangeText = text => {
    setNombre(text);
  }
  const handleSubmit = () => {
    const newPuntos = puntos.concat({ 
      name: nombre,
      coordinate: puntoTemp
    });
    setPuntos(newPuntos);
    setVisibility(false);
    setNombre('');
  }
  const handleLista = () => {
    setVisibilityFilter('all_puntos');
    setVisibility(true);
  }
  return (
    <View style={styles.container}>
      <Map onLongPress={handleLongPress} puntos={puntos} pointsFilter={pointsFilter} />
      <Panel onPressLeft={handleLista} textLeft={btnLista} togglePointsFilter={togglePointsFilter} />
      <Modal visibility={visibility}>
        {visibilityFilter==='new_punto'?(
          <View style={styles.form}>
            <Input 
              title="Nombre" 
              placeholder="Nombre del punto"
              onChangeText={handleChangeText}
            />
            <View style={styles.buton}>
              <Button
                title="Aceptar"
                onPress={handleSubmit}
              />
            </View>
          </View>
        ):(
          <List 
            puntos={puntos}
            closeModal={() => setVisibility(false)}
          />
        )}
        
      </Modal>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 15,
  },
  buton: {
    paddingTop: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
