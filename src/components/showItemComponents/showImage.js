import React from 'react';
import {View, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../showInformacionComponents/styles';
import {updateImage} from './functions';
import {shareImage, moneyFormat} from '../mainFunctions';
import {RenderImage} from '../auxComponents';

const ShowImage = ({data, setShowImage, setIsLoading}) => {
  const handleUpdateImage = async (value, selection) => {
    setIsLoading(true);
    await updateImage(value, selection, (url) => {
      Object.defineProperty(data, 'imageURL', {
        value: url,
        writable: true,
      });
    })
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  };

  const handleShare = async (data) => {
    try {
      setIsLoading(true);
      const message = `${data.nombre} ${moneyFormat(data.precioVenta)} ${
        data.descripcion
      }`;
      await shareImage(data.imageURL, {
        message,
      })
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false));
    } catch (err) {
      setIsLoading(false);
      console.warn(err);
    }
  };

  const handleSelectImageMode = () => {
    Alert.alert(
      '¿Qué deseas realizar?',
      '¿De qué manera quieres seleccionar la imagen?',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
        },
        {
          text: 'Tomar foto',
          onPress: () => handleUpdateImage(data, true),
        },
        {
          text: 'De galeria',
          onPress: () => handleUpdateImage(data, false),
        },
      ],
    );
  };

  return (
    <View style={styles.imageContainer}>
      {data.imageURL ? (
        <>
          <TouchableOpacity
            style={styles.shareImageIcon}
            onPress={() => handleShare(data)}>
            <Icon name="share-variant" size={28} color="#101e5a" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.updateImageButton}
            onPress={handleSelectImageMode}>
            <Icon name="image-edit" size={28} color="#101e5a" />
          </TouchableOpacity>
        </>
      ) : null}
      <TouchableOpacity
        onPress={() =>
          data.imageURL ? setShowImage(true) : handleSelectImageMode()
        }
        style={styles.showImageButton}>
        {data.imageURL ? (
          <RenderImage
            source={{uri: data.imageURL}}
            progressiveRenderingEnabled={true}
            style={styles.image}
          />
        ) : (
          <Icon name="image-plus" style={styles.addImageIcon} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ShowImage;
