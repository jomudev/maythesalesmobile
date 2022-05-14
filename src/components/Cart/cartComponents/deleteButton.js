import React from 'react';
import {TouchableOpacity} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DeleteButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.deleteButton}>
      <Icon name="delete-outline" size={18} color="red" />
    </TouchableOpacity>
  );
};

export default DeleteButton;
