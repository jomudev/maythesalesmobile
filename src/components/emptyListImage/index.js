import React from 'react';
import {Image, View, Text, Dimensions} from 'react-native';

const windowHeight = Dimensions.get('window').height;
export default class EmptyListImages {
  static ImageComponent (message) {
    const image = require('../../assets/AdditionalMedia/defaultEmptyImage.png');
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={{flex: 0.8}}>
          <Image
            resizeMode="contain"
            style={{
              height: windowHeight * 0.55,
            }}
            source={image}
          />
        </View>
        <Text style={{
          fontSize: 32, 
          flex: 0.2,
          fontWeight: 'bold', 
          textAlign: 'center'
        }}>
        ¡Ups! No hay nada por aquí
        </Text>
        <Text style={{color: 'darkgray', textAlign: 'center'}}>
          {message}
        </Text>
      </View>
    );
  }

  static default() {
    return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', fontSize: 32, fontWeight: 'bold'}}>
      <Text>¡Ups! No hay nada por aquí</Text>
    </View>
  }

};
