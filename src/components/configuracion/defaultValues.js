import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import {Select} from '../auxComponents';
import {db} from '../mainFunctions';
import store from '../../../store';

const DefaultValues = () => {
  const updateDefaultCurrencyFormat = async (value) => {
    try {
      await db().update({
        defaultCurrencyFormat: value,
      });
    } catch (err) {
      console.warn('error trying to update currencyFormat ', err);
    }
  };

  const updateDefaultSaleState = async (value) => {
    try {
      await db().update({
        defaultSaleState: value,
      });
    } catch (err) {
      console.warn('error trying to update saleState', err);
    }
  };

  const saleStateItems = [
    {label: 'vendido', value: true},
    {label: 'pendiente', value: false},
  ];

  const currencyFormatItems = [
    {label: 'Lempira hondureño - HNL', value: 'HNL'},
    {label: 'Dolar - $', value: 'USD'},
    {label: 'Euro - €', value: 'EUR'},
  ];

  return (
    <View style={{...styles.container, padding: 16}}>
      <Text style={styles.label}>Estado de la venta</Text>
      <Select
        selectedValue={store.getState().defaultSaleState}
        onValueChange={(value) => updateDefaultSaleState(value)}
        items={saleStateItems}
      />
      <Text style={styles.label}>Simbolo de moneda</Text>
      <Select
        selectedValue={store.getState().defaultCurrencyFormat}
        onValueChange={(value) => updateDefaultCurrencyFormat(value)}
        items={currencyFormatItems}
      />
    </View>
  );
};

export default DefaultValues;
