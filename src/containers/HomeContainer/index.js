/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useEffect, useState} from 'react';
import {Animated, ToastAndroid} from 'react-native';
import Inventory from '../../components/Inventario';
import NewSale from '../../components/Inventario/nuevaVenta';
import Ventas from '../../components/Inventario/ventas';
import {interstitial} from '../../components/ads';
import {AdEventType} from '@react-native-firebase/admob';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
interstitial.load();

const HomeContainer = () => {
  return (
    <Tab.Navigator
      orientation={'horizontal'}
      tabBarOptions={{
        pressColor: '#e6e8f1',
        style: {
          elevation: 0,
        },
        renderIndicator: (props) => <ScreenIndicator {...props} />,
        labelStyle: {
          fontWeight: 'bold',
          fontSize: 12,
        },
        activeTintColor: '#000031',
        inactiveTintColor: '#b4b6be',
      }}>
      <Tab.Screen name="Nueva venta" component={NewSale} />
      <Tab.Screen name="Ventas del día" component={Ventas} />
      <Tab.Screen name="inventario" component={Inventory} />
    </Tab.Navigator>
  );
};

const ScreenIndicator = (props) => {
  const width = props.layout.width || 411;
  const index = props.navigationState.index;
  const third = width * 0.3333;
  const half = third / 2 + 8;
  const newPosition = third * (index + 1) - half;
  const position = useRef(new Animated.Value(newPosition)).current;
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    const adEventUnsubscribe = interstitial.onAdEvent((eventType) => {
      if (eventType === AdEventType.LOADED) {
        setAdLoaded(true);
        ToastAndroid.show('main ad Loaded', ToastAndroid.SHORT);
      }
    });

    return adEventUnsubscribe();
  }, []);

  useEffect(() => {
    Animated.timing(position, {
      duration: 200,
      toValue: newPosition,
      useNativeDriver: false,
    }).start();

    if (adLoaded) {
      interstitial.show();
    }
  }, [index]);

  return (
    <Animated.View
      style={{
        width: 24,
        height: 4,
        marginTop: '9%',
        left: position,
        backgroundColor: '#101e5a',
        borderRadius: 10,
      }}
    />
  );
};

export default HomeContainer;
