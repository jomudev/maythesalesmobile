import React from 'react';
import {
  View,
  Modal,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import Logo from '../assets/AdditionalMedia/Logo.svg';

const LoadingScreen = () => {
  return (
    <Modal visible={true} animationType="fade" statusBarTranslucent={true}>
      <StatusBar barStyle="dark-content" backgroundColor={"white"} />
      <View style={styles.container}>
        <Logo style={styles.logo} width={200} height={200} />
        <ActivityIndicator color="#334790" size="large" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default LoadingScreen;
