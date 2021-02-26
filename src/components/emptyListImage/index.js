import React from 'react';
import {Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import defaultEmptyImage from '../../assets/AdditionalMedia/defaultEmptyImage.png';

const EmptyListImages = {
  default: function () {
    return (
      <FastImage
        style={{
          width: 300,
          height: 500,
          alignSelf: 'center',
        }}
        source={{
          uri: this.getAssetSource(defaultEmptyImage).uri,
          priority: FastImage.priority.high,
          cache: FastImage.cacheControl.immutable,
        }}
      />
    );
  },
  getAssetSource: (AssetToResolve) => {
    return Image.resolveAssetSource(AssetToResolve);
  },
};

export default EmptyListImages;
