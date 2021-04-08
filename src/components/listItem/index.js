/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableWithoutFeedback, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './listStyles';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import {moneyFormat, db} from '../mainFunctions';
import {ContextMenu} from '../auxComponents';
import {format, formatDistanceToNow} from 'date-fns';
import {es} from 'date-fns/locale';
import {useNavigation} from '@react-navigation/native';
import htmlData from './htmlData';

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

const RenderVentasCollection = ({sale}) => {
  const {
    productos,
    servicios,
    mayorista,
    cliente,
    total,
    timestamp,
    estado,
  } = sale;
  const navigation = useNavigation();
  let contextMenuRef = React.createRef();
  const saleDate = new Date(timestamp.seconds * 1000);
  return (
    <View style={styles.venta}>
      <View style={styles.ventaHeader}>
        <View style={styles.contextMenuBtn}>
          <TouchableWithoutFeedback onPress={() => contextMenuRef.show()}>
            <Icon
              name="dots-vertical"
              size={28}
              style={styles.contextMenuIcon}
            />
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{
            ...styles.saleState,
            backgroundColor: estado ? 'green' : '#e6e8f1',
          }}>
          <Text
            style={{
              color: estado ? 'white' : 'gray',
              fontWeight: 'bold',
            }}>
            {estado ? 'Vendido' : 'Pendiente'}
          </Text>
        </View>
        <Text style={styles.ventaTitleText}>
          {formatDistanceToNow(saleDate, {locale: es, addSuffix: true})}
          {'  |  '}
          {format(saleDate, 'PPpp', {locale: es})}
        </Text>
        <ContextMenu
          ref={(target) => (contextMenuRef = target)}
          optionsList={[
            {
              iconName: 'file-document-outline',
              text: 'Ver Reporte',
              onPress: () => {
                navigation.navigate('saleReport', {
                  data: sale,
                });
              },
            },
            {
              iconName: 'file-pdf-outline',
              text: 'Generar reporte en PDF',
              onPress: () => printPDF(sale),
            },
            {
              iconName: 'delete-outline',
              text: 'Eliminar reporte',
              onPress: () => handleDeleteSale(sale),
            },
          ]}
          onTouchOutside={() => contextMenuRef.close()}
        />

        {mayorista && <Text>Comprador Mayorista: {mayorista.nombre}</Text>}
        {cliente && <Text>Cliente: {cliente.nombre}</Text>}
      </View>

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
            fontSize: 24,
            textAlign: 'right',
          }}>
          Total: {moneyFormat(total)}
        </Text>
      </View>
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

const deleteSale = async () => {
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
        onPress: deleteSale,
      },
    ],
  );
};

export default RenderVentasCollection;
