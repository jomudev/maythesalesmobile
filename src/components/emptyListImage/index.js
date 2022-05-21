import React from 'react';
import {Image, View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import defaultEmptyImage from '../../assets/AdditionalMedia/defaultEmptyImage.png';

export default class EmptyListImages {
  constructor() {
    this.images = {
      defaultEmptyImage: defaultEmptyImage,
    };
  }
  
  default() {
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
            flex: 1,
          }}
          resizeMode={FastImage.resizeMode.contain}
          source={{
            uri: this.getAssetSource(this.images.defaultEmptyImage).uri,
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
        ¡Ups! no hay nada por aquí
        </Text>
      </View>
    );
  }

  getAssetSource (AssetToResolve) {
    return Image.resolveAssetSource(AssetToResolve);
  }
};
