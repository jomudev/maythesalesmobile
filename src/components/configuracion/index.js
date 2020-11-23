import React from 'react';
import {ScrollView} from 'react-native';
import opciones from './data';
import ListItem from './listItem';
import styles from './styles';

const ConfigOpciones = (props) => {
  return (
    <ScrollView style={styles.container}>
      {opciones.map((item) => (
        <ListItem key={item.name} item={item} {...props} />
      ))}
    </ScrollView>
  );
};

export default ConfigOpciones;
