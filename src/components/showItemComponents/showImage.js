import React from 'react';
import {View, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../showInformacionComponents/styles';
import {updateImage} from './functions';
import {RenderImage} from '../auxComponents';

const ShowImage = ({data, setShowImage, collectionKey, setIsLoading}) => {
  
  const handleUpdateImage = async (value, selection) => {
    setIsLoading(true);
    await updateImage(value, collectionKey, selection, (url) => {
      Object.defineProperty(data, 'imageURL', {
        value: url,
        writable: true,
      });
    })
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
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
          <TouchableOpacity
            style={styles.updateImageButton}
            onPress={handleSelectImageMode}>
            <Icon name="pencil" size={28} color="#101e5a" />
          </TouchableOpacity>
      ) : null}
      <TouchableOpacity
        onPress={() =>
          data.imageURL ? setShowImage(true) : handleSelectImageMode()
        }
        style={styles.showImageButton}>
        {data.imageURL ? (
          <RenderImage source={{uri: data.imageURL}} style={styles.image} />
        ) : (
          <Icon name="image-plus" style={styles.addImageIcon} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ShowImage;
