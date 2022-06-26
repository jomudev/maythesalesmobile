import React from 'react';
import {Image, View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import defaultEmptyImage from '../../assets/AdditionalMedia/defaultEmptyImage.png';

export default class EmptyListImages {
  
  static ImageComponent () {
    console.log(defaultEmptyImage);
    console.warn(imageURI);
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <FastImage
          style={{
            width: '70%',
            flex: .8,
          }}
          resizeMode={FastImage.resizeMode.contain}
          source={{
            uri: Image.resolveAssetSource(defaultEmptyImage).uri,
            priority: FastImage.priority.high,
            cache: FastImage.cacheControl.immutable,
          }}
        />
        <Text style={{
          fontSize: 32, 
          flex: 0.2,
          fontWeight: 'bold', 
          textAlign: 'center'
        }}>
        ¡Ups! No hay nada por aquí
        </Text>
      </View>
    );
  }

  static default() {
    return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>¡Ups! No hay nada por aquí</Text>
    </View>
  }

};
