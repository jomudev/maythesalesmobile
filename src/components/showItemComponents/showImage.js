import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../showItemComponents/styles';
import {updateImage} from './functions';
import PopupMenu from '../PopupMenu';

const ShowImage = ({data, setShowImage, collectionKey, setIsLoading}) => {
  let popupMenuRef = React.createRef();

  const optionsList = [
    {
      text: 'Tomar foto',
      onPress: () => handleUpdateImage(data, true),
    },
    {
      text: 'De galeria',
      onPress: () => handleUpdateImage(data, false),
    },
  ];
  
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

  const contextMenuFunction = (index, optionsList) => {
    if (index !== undefined) {
      optionsList[index].onPress();
    }
  };
  return (
    <View style={styles.imageContainer}>      
      {data.imageURL ? (
          <TouchableOpacity
            style={styles.updateImageButton}
            onPress={() => popupMenuRef.show()}>
            <Icon name="pencil" size={28} color="#101e5a" />
          </TouchableOpacity>
      ) : null}
        <TouchableOpacity
          onPress={() =>
            data.imageURL ? setShowImage(true) : popupMenuRef.show()
          }
          style={styles.showImageButton}>
          {data.imageURL ? (
            <Image source={{uri: data.imageURL}} style={styles.image} />
          ) : (
            <Icon name="image-plus" style={styles.addImageIcon} />
          )}
        </TouchableOpacity>
      <PopupMenu
          ref={(ref) => (popupMenuRef = ref)}
          title={'Actualizar imagen'}
          function={(index) => contextMenuFunction(index, optionsList)}
          options={optionsList.map((item) => item.text)}
          onTouchOutside={() => popupMenuRef.close()}
       />
    </View>
  );
};

export default ShowImage;
