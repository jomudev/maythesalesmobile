/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Switch, ScrollView, ActivityIndicator} from 'react-native';
import {formatDistanceToNow} from 'date-fns';
import {es} from 'date-fns/locale';
import styles from './styles';
import {Group} from '../auxComponents';
import {getTotal, moneyFormat, db} from '../mainFunctions';
import {InterstitialUnitId, interstitialAdConfig} from '../ads';
import {InterstitialAd, AdEventType} from '@react-native-firebase/admob';

const SaleReport = ({route}) => {
  const {data} = route.params;
  const {productos, servicios, total, mayorista, cliente} = data;
  const date = new Date(data.timestamp.seconds * 1000);
  const [saleState, setSaleState] = useState(data.estado);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const interstitial = InterstitialAd.createForAdRequest(InterstitialUnitId, interstitialAdConfig);
    interstitial.load();
    const AdEventListener = interstitial.onAdEvent((eventType) => {
      if (eventType === AdEventType.LOADED) {
        interstitial.show();
      }
    });

    return () => {
      AdEventListener();
    };
  }, [])

  const changeSaleStateValue = async (newValue) => {
    setIsLoading(true);
    const saleRef = await db('ventas').where('timestamp', '==', data.timestamp);
    saleRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let docRef = doc.ref.path.split('/');
        docRef = docRef[docRef.length - 1];
        db('ventas')
          .doc(docRef)
          .update({
            estado: newValue,
          })
          .then(() => {
            setSaleState(newValue);
            setIsLoading(false);
          });
      });
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={{textAlign: 'center'}}>
        {formatDistanceToNow(date, {locale: es, addSuffix: true})}
      </Text>
      <Group direction="row">
        <Text style={{flex: 3}}>{saleState ? 'Vendida' : 'Pendiente'}</Text>
        <View style={{flex: 1}}>
          {isLoading ? <ActivityIndicator color="#101e5a" size="small" /> : null}
        </View>
        <View style={{flex: 1}}>
          <Switch
            style={{alignSelf: 'flex-end'}}
            trackColor={{false: '#e6e8f1', true: '#e6e8f1'}}
            thumbColor={saleState ? '#434588' : '#b4b6be'}
            onValueChange={() => changeSaleStateValue(!saleState)}
            value={saleState}
          />
        </View>
      </Group>
      {cliente ? <Text>Cliente: {cliente.nombre}</Text> : null}
      {mayorista ? <Text>Comprador mayorista: {mayorista.nombre}</Text> : null}
      {productos.length ? (
        <Text style={styles.title}>Lista de productos</Text>
      ) : null}
      {productos.map((product) => (
        <ListItem element={product} key={product.id} />
      ))}
      {servicios.length ? (
        <Text style={styles.title}>Lista de servicios</Text>
      ) : null}
      {servicios.map((service) => (
        <ListItem element={service} key={service.id} />
      ))}
      <Total text="Total Venta" isPrimary={true} value={moneyFormat(total)} />
    </ScrollView>
  );
};

const ListItem = ({element}) => {
  const {precioMayoreo, precioVenta, nombre, cantidad, wholesaler} = element;
  return (
    <View style={{flexDirection: 'row', paddingVertical: 4, justifyContent: 'space-between'}}>
      <Text ellipsizeMode="tail" numberOfLines={1} style={{width: '50%'}}>
        {cantidad}
        {'  '}
        {nombre}
      </Text>
      <Text>
        {wholesaler
          ? moneyFormat(cantidad * precioMayoreo)
          : moneyFormat(cantidad * precioVenta)}
      </Text>
    </View>
  );
};

const Total = ({text, value, isPrimary}) => (
  <View style={styles.total}>
    <Text style={{...styles.totalText, color: isPrimary ? 'black' : '#666'}}>
      {text}
    </Text>
    <Text style={{fontWeight: 'bold'}} >{value}</Text>
  </View>
);

export default SaleReport;
