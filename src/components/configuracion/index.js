import React from 'react';
import {ScrollView, View} from 'react-native';
import opciones from './data';
import ListItem from './listItem';

const ConfigOpciones = (props) => {
  return (
    <View>
      <ScrollView>
        {opciones.map((item) => (
          <ListItem key={item.name} item={item} {...props} />
        ))}
      </ScrollView>
    </View>
  );
};

export default ConfigOpciones;
