/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  ImageBackground,
  Animated,
  //  Appearance,
} from 'react-native';
import styles from './authStyles';
import LoadingScreen from '../loadingScreen';

import Logo from '../../assets/AdditionalMedia/Logo.svg';
import SignIn from './signIn';
import Login from './login';
import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('screen');

//const colorScheme = Appearance.getColorScheme();

const SignInComponent = () => {
  const [initializing, setInitializing] = useState();
  const SignInAnimationScreen = useRef(new Animated.Value(0)).current;
  const LogInAnimationScreen = useRef(new Animated.Value(0)).current;

  const animation = (type) => {
    const duration = 200;
    if (type === 'toLogin') {
      Animated.timing(SignInAnimationScreen, {
        toValue: -width,
        duration: duration,
        useNativeDriver: false,
      }).start();
      Animated.timing(LogInAnimationScreen, {
        toValue: width,
        duration: duration,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(SignInAnimationScreen, {
        toValue: 0,
        duration: duration,
        useNativeDriver: false,
      }).start();
      Animated.timing(LogInAnimationScreen, {
        toValue: 0,
        duration: duration,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.lightMainContainer}>
      {initializing ? <LoadingScreen /> : null}
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="rgba(0,0,0,0.5)"
      />
      <ImageBackground
        source={require('../../assets/AdditionalMedia/signin_cover.jpg')}
        style={styles.coverPhoto}
        resizeMode="cover">
        <Logo style={styles.logo} />
      </ImageBackground>
      <View style={{flexDirection: 'row', alignSelf: 'flex-start', flex: 2}}>
        <Animated.View style={{...styles.form, left: SignInAnimationScreen}}>
          <SignIn setInitializing={setInitializing} changeScreen={animation} />
        </Animated.View>
        <Animated.View style={{...styles.form, right: LogInAnimationScreen}}>
          <Login setInitializing={setInitializing} changeScreen={animation} />
        </Animated.View>
      </View>
    </ScrollView>
  );
};

export default SignInComponent;
