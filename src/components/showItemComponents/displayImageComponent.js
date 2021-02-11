import React from 'react';
import {Modal, View, Image, TouchableOpacity, StatusBar} from 'react-native';
import styles from '../showInformacionComponents/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DisplayImageComponent = ({imageURL, showImage, setShowImage}) => {

  return (
    <Modal
      visible={showImage}
      animationType="slide"
      onRequestClose={() => setShowImage(false)}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <View style={styles.displayImageContainer}>
        <TouchableOpacity
          style={styles.displayCloseIcon}
          onPress={() => setShowImage(false)}>
          <Icon name="chevron-left" size={32} color="#fff" />
        </TouchableOpacity>
        <Image source={{uri: imageURL}} style={styles.displayImage} />
      </View>
    </Modal>
  );
};

export default DisplayImageComponent;
