/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, Alert, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './listStyles';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import CurrencyFunctions from '../../utils/currencyFunctions';
import {db} from '../../utils/firebase';
import {useNavigation} from '@react-navigation/native';
import htmlData from './htmlData';
import {InterstitialUnitId} from '../ads';
import {InterstitialAd, AdEventType} from '@react-native-firebase/admob';
import store from '../../../store';
import PopupMenu from '../PopupMenu';

const interstitial = InterstitialAd.createForAdRequest(InterstitialUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['business', 'marketing', 'market', 'delivery'],
});

const RenderVentasCollection = ({saleId}) => {
  const sale = store.getState().collections.ventas.find((sale) => sale.id == saleId);
  const estado = sale.estado ? 'Vendido' : 'Pendiente';
  const navigation = useNavigation();
  const [isAdLoaded, setAdLoaded] = useState(false);
  let popupRef = React.createRef();

  const contextMenuFunction = (index) => {
    if (index !== undefined) {
      switch (index) {
        case 0:
          navigate('saleReport', {
            data: saleId,
          });
          break;
        case 1:
          if (isAdLoaded) {
            interstitial.show();
          } else {
            printPDF(sale);
          }
          break;
        case 2:
          handleDeleteSale(sale);
          break;
      }
    }
  };

  const navigate = (screen, params) => navigation.navigate(screen, params);

  const popupMenuOptions = ['Ver Reporte', 'Imprimir reporte', 'Eliminar reporte'];

  useEffect(() => {
    const adUnsubscribe = interstitial.onAdEvent((type) => {
      if (type === AdEventType.LOADED) {
        setAdLoaded(true);
      }
      if (type === AdEventType.CLOSED) {
        printPDF(sale);
      }
    });

    return () => {
      adUnsubscribe();
    };
  }, []);

  return (
    <View style={styles.venta}>
      <View
        style={{
          ...styles.saleStateView,
          backgroundColor: sale.estado ? '#101e5a' : '#ffff',
        }}
      />
      <View style={styles.ventaHeader}>
        <View style={styles.saleState}>
          <Text
            style={{
              textAlign: 'center',
              color: sale.estado ? '#101e5a' : 'gray',
              fontWeight: 'bold',
            }}>
            {estado}
          </Text>
        </View>
        <TouchableOpacity style={styles.contextMenuIcon}
          onPress={() => {
            popupRef.show();
          }}>
          <Icon name="dots-horizontal" size={28} />
        </TouchableOpacity>
        <PopupMenu
          title="Opciones de reporte"
          ref={(target) => (popupRef = target)}
          options={popupMenuOptions}
          function={contextMenuFunction}
          onTouchOutside={() => popupRef.close()}
        />
      </View>

      <Text style={styles.ventaTitleText}>
        {sale.getDateDistanceToNow()}
        {'  |  '}
        {sale.formattedDate('dd MMM')}
      </Text>
      {sale.cliente && <Text>Cliente: {sale.cliente.nombre}</Text>}
      <View>
        <Text>
          {sale.getProductsQuantity('text')}
        </Text>
        <Text>
          {sale.getServicesQuantity('text')}
        </Text>
        <Text style={{fontWeight: 'bold', flex: 1}}>
          Ganancias de la venta:{' '}
          {CurrencyFunctions.moneyFormat(sale.ganancias)}
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            flex: 1,
            fontSize: 16,
          }}>
          Vendido: {CurrencyFunctions.moneyFormat(sale.total)}
        </Text>
      </View>
      <TouchableOpacity style={styles.reportButton} onPress={() => contextMenuFunction(0)}>
        <Text style={{fontWeight: 'bold', color: '#101e5a'}}>Ver Reporte</Text>
      </TouchableOpacity>
    </View>
  );
};

const printPDF = async (sale) => {
  try {
    const saleDate = new Date(sale.timestamp.seconds * 1000);
    const html = await htmlData(sale);

    const results = await RNHTMLtoPDF.convert({
      html,
      fileName: `REPORTE VENTA ${format(saleDate, 'yMd-hms')}`,
      base64: true,
    });
    await RNPrint.print({filePath: results.filePath});
  } catch (err) {
    console.warn('error al intentar generar el reporte: ', err);
  }
};

const deleteSale = async (data) => {
  try {
    await db('ventas')
      .where('timestamp', '==', data.timestamp)
      .get()
      .then((snap) => {
        if (!snap) {
          return;
        }
        let ref = snap.docChanges()[0].doc.ref.path.split('/');
        ref = ref[ref.length - 1];
        ref = db('ventas').doc(ref);
        ref.delete();
      });
  } catch (err) {
    console.warn('error trying to delete the sale ', err);
  }
};

const handleDeleteSale = (data) => {
  Alert.alert(
    'Eliminar reporte de venta',
    '¿Estás seguro? Esta acción es irreversible',
    [
      {
        text: 'No, cancelar',
        onPress: () => {},
      },
      {
        text: 'Sí, estoy seguro',
        onPress: () => deleteSale(data),
      },
    ],
  );
};

export default RenderVentasCollection;
