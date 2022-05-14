/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, Alert, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './listStyles';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import {moneyFormat, db} from '../mainFunctions';
import {format, formatDistanceToNow} from 'date-fns';
import {es} from 'date-fns/locale';
import {useNavigation} from '@react-navigation/native';
import htmlData from './htmlData';
import {InterstitialUnitId} from '../ads';
import {InterstitialAd, AdEventType} from '@react-native-firebase/admob';
import PopupMenu from '../PopupMenu';

const interstitial = InterstitialAd.createForAdRequest(InterstitialUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['business', 'marketing', 'market', 'delivery'],
});

const ganancias = (lista, isWholesaler) => {
  let sum = 0;
  lista.forEach((item) => {
    if (isWholesaler) {
      sum +=
        ((item.precioMayoreo ? item.precioMayoreo : item.precioVenta) -
          item.precioCosto) *
        item.cantidad;
    } else {
      sum += (item.precioVenta - item.precioCosto) * item.cantidad;
    }
  });
  return sum;
};

const RenderVentasCollection = ({sale, type}) => {
  const {productos, servicios, mayorista, cliente, total, timestamp} = sale;
  let {estado} = sale;
  estado = estado ? 'Vendido' : 'Pendiente';

  const navigation = useNavigation();
  if (!timestamp) {
    return null;
  }
  const saleDate =
    type === 'secluded'
      ? new Date(timestamp)
      : new Date(timestamp.seconds * 1000);
  const [isAdLoaded, setAdLoaded] = useState(false);
  const legibleDate = format(saleDate, 'dd MMM', {locale: es});
  let popupRef = React.createRef();

  const contextMenuFunction = (index) => {
    if (index !== undefined) {
      switch (index) {
        case 0:
          navigate('saleReport', {
            data: sale,
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

  const optionsList = ['Ver Reporte', 'Imprimir reporte', 'Eliminar reporte'];

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
          backgroundColor: estado === 'Vendido' ? '#101e5a' : '#ffff',
        }}
      />
      <View style={styles.ventaHeader}>
        <View style={styles.saleState}>
          <Text
            style={{
              textAlign: 'center',
              color: estado === 'Vendido' ? '#101e5a' : 'gray',
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
          options={optionsList}
          function={contextMenuFunction}
          onTouchOutside={() => popupRef.close()}
        />
      </View>

      <Text style={styles.ventaTitleText}>
        {formatDistanceToNow(saleDate, {locale: es, addSuffix: true})}
        {'  |  '}
        {legibleDate}
      </Text>

      {mayorista && <Text>Comprador Mayorista: {mayorista.nombre}</Text>}
      {cliente && <Text>Cliente: {cliente.nombre}</Text>}
      <View>
        {countElements({
          list: productos,
          single: 'producto',
          plural: 'productos',
        })}
        {countElements({
          list: servicios,
          single: 'servicio',
          plural: 'servicios',
        })}
        <Text style={{fontWeight: 'bold', flex: 1}}>
          Ganancias de la venta:{' '}
          {moneyFormat(ganancias(productos, mayorista) + ganancias(servicios))}
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            flex: 1,
            fontSize: 16,
          }}>
          Vendido: {moneyFormat(total)}
        </Text>
      </View>
      <TouchableOpacity style={styles.reportButton} onPress={() => contextMenuFunction(0)}>
        <Text style={{fontWeight: 'bold', color: '#101e5a'}}>Ver Reporte</Text>
      </TouchableOpacity>
    </View>
  );
};

const countElements = ({list, single, plural}) => {
  const listLength = list.length;
  let substantive = null;
  if (listLength > 1) {
    substantive = plural;
  } else if (listLength === 1) {
    substantive = single;
  } else {
    return null;
  }

  return (
    <Text>
      {listLength} {substantive}
    </Text>
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
