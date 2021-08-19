import React from 'react';
import {TouchableOpacity} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DeleteButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.deleteButton}>
      <Icon name="delete-outline" size={18} color="black" />
    </TouchableOpacity>
  );
};

export default DeleteButton;
