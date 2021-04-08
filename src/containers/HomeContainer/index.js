/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useEffect} from 'react';
import {Animated} from 'react-native';
import Inventory from '../../components/Inventario';
import NewSale from '../../components/Inventario/nuevaVenta';
import Ventas from '../../components/Inventario/ventas';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

const HomeContainer = () => {
  return (
    <>
      <Tab.Navigator
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
    </>
  );
};

const ScreenIndicator = (props) => {
  const position = useRef(new Animated.Value(0)).current;
  const width = props.layout.width || 411;
  const index = props.navigationState.index;
  const third = width * 0.3333;
  const half = third / 2;
  const newPosition = third * (index + 1) - half;

  useEffect(() => {
    Animated.spring(position, {
      toValue: newPosition,
      useNativeDriver: false,
    }).start();
  }, [position, newPosition]);
  return (
    <Animated.View
      style={{
        width: 8,
        height: 8,
        marginTop: '9%',
        left: position,
        backgroundColor: '#101e5a',
        borderRadius: 10,
      }}
    />
  );
};

export default HomeContainer;
