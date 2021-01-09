import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, StatusBar, Text, Animated} from 'react-native';
import Logo from '../assets/AdditionalMedia/Logo.svg';

const LoadingScreen = ({isLoading}) => {

  return isLoading ? (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#f1f2f3" />
      <Logo style={styles.logo} width={50} height={50} />
      <Text>Cargando...</Text>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: '#f1f2f3',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingScreen;
