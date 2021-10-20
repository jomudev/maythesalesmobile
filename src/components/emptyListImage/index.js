import React from 'react';
import {Image, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import defaultEmptyImage from '../../assets/AdditionalMedia/defaultEmptyImage.png';

const EmptyListImages = {
  get default () {
    return (
      <>
        <FastImage
          style={{
            width: 250,
            height: 320,
            alignSelf: 'center',
          }}
          source={{
            uri: this.getAssetSource(defaultEmptyImage).uri,
            priority: FastImage.priority.high,
            cache: FastImage.cacheControl.immutable,
          }}
        />
        <Text style={{
          fontSize: 32, 
          fontWeight: 'bold', 
          textAlign: 'center'
        }}>
        ¡Ups! no hay nada por aquí
        </Text>
      </>
    );
  },
  getAssetSource: (AssetToResolve) => {
    return Image.resolveAssetSource(AssetToResolve);
  },
};

export default EmptyListImages;
