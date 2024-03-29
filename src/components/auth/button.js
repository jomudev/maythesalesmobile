/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';

const Button = (props) => {
  const {onPress, children} = props;
  return (
    <TouchableOpacity style={styles.button} onPress={() => onPress()}>
      {children}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: '#101e5a',
    height: 56,
    marginVertical: 32,
    width: '100%',
  },
})
