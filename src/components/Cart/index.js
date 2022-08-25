/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  Switch,
  Text,
  TouchableOpacity,
  ToastAndroid,
  View,
  FlatList
} from 'react-native';
import store from '../../../store';
import {interstitialAdConfig, InterstitialUnitId} from '../ads';
import {AdEventType, InterstitialAd} from '@react-native-firebase/admob';
import ProductsList from './cartComponents/productsList';
import ServicesList from './cartComponents/servicesList';
import styles from './styles';
import EmptyListImage from '../emptyListImage';

const Cart = () => {
  
  const cart = store.getState().cart;
  useEffect(() => {
    const interstitial = InterstitialAd.createForAdRequest(InterstitialUnitId, interstitialAdConfig);
    interstitial.load();
    
    const adEventListener = interstitial.onAdEvent((eventType) => {
      if (eventType === AdEventType.LOADED) {
        interstitial.show();
      }
    });

    return () => {
      adEventListener();
    };
  }, []);
  return cart.productos.length === 0 && cart.servicios.length === 0 ? (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white'}}>
      {EmptyListImage.ImageComponent('Seleccione productos en la sección "Nueva Venta" para visualizarlos aquí')}
    </View>
  ) : (
    <View style={styles.container}>
      <FlatList
        data={[cart.productos, cart.servicios]}
        ListHeaderComponent={() => (<ProductsList products={cart.productos} />)}
        ListFooterComponent={() => (<ServicesList services={cart.servicios} />)}
       />
      <View style={styles.bottomView}>
        <View style={styles.bottomViewContent}>
          {cart.client ? (
            <Text style={styles.client}>
              {'Cliente: ' + cart.client.nombre}
            </Text>
          ) : null}
          <View style={styles.bottomViewContentRow}>
            <View style={styles.saleStateContainer}>
              <Text style={styles.saleStateText}>
                {cart.estado ? 'Vendida' : 'Pendiente'}
              </Text>
              <Switch
                style={styles.switchSaleState}
                trackColor={{false: '#e6e8f1', true: '#e6e8f1'}}
                thumbColor={cart.estado ? '#434588' : '#b4b6be'}
                onValueChange={() => {
                  cart.updateProperty('estado', !cart.estado);
                }}
                value={cart.estado}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            cart.postSale().then(() => {
              ToastAndroid.show(
                'La venta se realizó correctamente',
                ToastAndroid.SHORT,
              );
            });
          }}
          style={styles.soldButton}>
            <Text style={styles.soldButtonText}>Realizar venta</Text>
            <Text style={{...styles.soldButtonText, textAlign: 'right'}}>
              {cart.total}
            </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;
