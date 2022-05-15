/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Switch, ScrollView, ActivityIndicator} from 'react-native';
import styles from './styles';
import {Group} from '../auxComponents';
import {moneyFormat} from '../mainFunctions';
import {InterstitialUnitId, interstitialAdConfig} from '../ads';
import {InterstitialAd, AdEventType} from '@react-native-firebase/admob';

const SaleReport = ({route}) => {
  const sale = route.params.data;
  const [switchValue, setSwitchValue] = React.useState(sale.estado);

  React.useEffect(() => {
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

  return (
    <ScrollView style={styles.container}>
      <Text style={{textAlign: 'center'}}>
        {sale.getDateDistanceToNow()}
      </Text>
      <Group direction="row">
        <Text style={{flex: 3}}>{sale.estado ? 'Vendida' : 'Pendiente'}</Text>
        <View style={{flex: 1}}>
        </View>
        <View style={{flex: 1}}>
          <Switch
            style={{alignSelf: 'flex-end'}}
            trackColor={{true: '#e6e8f1', false: '#e6e8f1'}}
            thumbColor={sale.estado ? '#434588' : '#b4b6be'}
            onValueChange={() => {
                sale.updateProperty('estado', !switchValue)
                setSwitchValue(!switchValue);
              }}
            value={sale.estado}
          />
        </View>
      </Group>
      {sale.cliente ? <Text>Cliente: {sale.cliente.nombre}</Text> : null}
      {sale.productos.length ? (
        <Text style={styles.title}>Lista de productos</Text>
      ) : null}
      {sale.productos.map((product) => (
        <ListItem element={product} key={product.id} />
      ))}
      {sale.servicios.length ? (
        <Text style={styles.title}>Lista de servicios</Text>
      ) : null}
      {sale.servicios.map((service) => (
        <ListItem element={service} key={service.id} />
      ))}
      <Total text="Total Venta" isPrimary={true} value={moneyFormat(sale.total)} />
    </ScrollView>
  );
};

const ListItem = ({element}) => {
  return (
    <View style={{flexDirection: 'row', paddingVertical: 4, justifyContent: 'space-between'}}>
      <Text ellipsizeMode="tail" numberOfLines={1} style={{width: '50%'}}>
        {element.cantidad}
        {'  '}
        {element.nombre}
      </Text>
      <Text>
        {moneyFormat(element.cantidad * element.precioVenta)}
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
