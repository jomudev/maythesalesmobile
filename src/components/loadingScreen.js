import React from 'react';
import {View, Modal, StyleSheet, StatusBar, Text} from 'react-native';
import Logo from '../assets/AdditionalMedia/Logo.svg';

const LoadingScreen = ({text}) => {
  const loadingText = text || 'Cargando...';
  return (
    <Modal visible={true} animationType="fade">
      <View style={styles.container}>
        <Logo style={styles.logo} width={100} height={100} />
        <Text>{loadingText}</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#f1f2f3',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingScreen;
