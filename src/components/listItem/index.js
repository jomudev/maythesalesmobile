/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {RenderItemProducto, RenderItemServicio} from './Item';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './listStyles';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import {moneyFormat, getTotal, getUserData} from '../mainFunctions';
import {InterstitialUnitId} from '../ads';
import {InterstitialAd, AdEventType} from '@react-native-firebase/admob';
import {format, formatDistanceToNow} from 'date-fns';
import {es} from 'date-fns/locale';
import htmlData from './htmlData';

const deviceHeight = Dimensions.get('window').height;

const ganancias = (lista, isWholesaler) => {
  let sum = 0;
  lista.forEach((item) => {
    if (isWholesaler) {
      sum +=
        (item.precioMayoreo ? item.precioMayoreo : item.precioVenta) -
        item.precioCosto;
    } else {
      sum += item.precioVenta - item.precioCosto;
    }
  });
  return sum;
};

const RenderVentasCollection = ({venta}) => {
  let popupRef = React.createRef();
  const saleDate = new Date(venta.timestamp.seconds * 1000);

  const onClosePopup = () => {
    popupRef.close();
  };

  const onShowPopup = () => {
    popupRef.show();
  };

  return (
    <View style={styles.venta}>
      <View style={styles.ventaHeader}>
        <TouchableWithoutFeedback onPress={() => onShowPopup()}>
          <Icon name="dots-vertical" size={28} style={styles.contextMenuBtn} />
        </TouchableWithoutFeedback>
        <Text style={styles.ventaTitleText}>
          {format(saleDate, 'PPpp', {locale: es})}{' '}
          {formatDistanceToNow(saleDate, {locale: es, addSuffix: true})}
        </Text>
        <ContextMenu
          ref={(target) => (popupRef = target)}
          data={venta}
          onTouchOutside={() => onClosePopup()}
        />

        {venta.mayorista && <Text>Mayorista: {venta.mayorista.nombre}</Text>}
        {venta.cliente && <Text>Cliente: {venta.cliente.nombre}</Text>}
      </View>

      {venta.servicios.length > 0 && (
        <Text style={styles.ventaTitleText}>Productos</Text>
      )}

      {venta.productos.map((producto) => {
        return (
          <RenderItemProducto
            key={producto.id}
            isWholesaler={venta.mayorista}
            producto={producto}
          />
        );
      })}

      {venta.productos.length > 0 && (
        <View style={styles.subtotalContainer}>
          <Text style={styles.subtotalTitle}>subtotal productos:</Text>
          <Text style={styles.subtotal}>
            {moneyFormat(getTotal([venta.productos], venta.mayorista))}
          </Text>
        </View>
      )}

      {venta.servicios.length > 0 && (
        <Text style={styles.ventaTitleText}>Servicios adicionales</Text>
      )}
      {venta.servicios.map((servicio) => (
        <RenderItemServicio
          key={servicio.id}
          servicio={servicio}
          isWholesaler={venta.wholesaler}
        />
      ))}

      {venta.servicios.length > 0 && (
        <View style={styles.subtotalContainer}>
          <Text style={styles.subtotalTitle}>
            subtotal servicios adicionales:
          </Text>
          <Text style={styles.subtotal}>
            {moneyFormat(getTotal([venta.servicios], venta.wholesaler))}
          </Text>
        </View>
      )}
      <View
        style={{flexDirection: 'row', borderTopWidth: 1, borderColor: '#ccc'}}>
        <Text style={{textAlign: 'left', fontWeight: 'bold', flex: 1}}>
          Ganancias:{' '}
          {moneyFormat(
            ganancias(venta.productos, venta.mayorista) +
              ganancias(venta.servicios),
          )}
        </Text>
        <Text style={{textAlign: 'right', fontWeight: 'bold', flex: 1}}>
          Total: {moneyFormat(venta.total)}
        </Text>
      </View>
    </View>
  );
};

class ContextMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      loadedAd: false,
    };
  }

  interstitial = InterstitialAd.createForAdRequest(InterstitialUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['business', 'marketing'],
  });

  eventListener = this.interstitial.onAdEvent((type) => {
    if (type === AdEventType.LOADED) {
      this.setState({
        loadedAd: true,
      });
    }
  });

  UNSAFE_componentWillMount() {
    this.eventListener();
    this.interstitial.load();
  }

  componentWillUnmount() {
    this.eventListener();
  }

  close = () => {
    this.setState({
      show: false,
    });
  };

  show = () => {
    this.setState({
      show: true,
    });
  };

  renderOutsideTouchable = (onTouch) => {
    const view = <View style={{flex: 1, width: '100%'}} />;
    if (!onTouch) {
      return view;
    }

    return (
      <TouchableWithoutFeedback
        onPress={onTouch}
        style={{flex: 1, width: '100%'}}>
        {view}
      </TouchableWithoutFeedback>
    );
  };

  render() {
    const {show, loadedAd} = this.state;
    const {onTouchOutside, data} = this.props;

    return (
      <Modal
        visible={show}
        animationType="slide"
        transparent={true}
        onRequestClose={this.close}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#00000000',
            justifyContent: 'flex-end',
          }}>
          {this.renderOutsideTouchable(onTouchOutside)}
          <View
            style={{
              ...styles.contextMenuOptions,
              maxHeight: deviceHeight * 0.4,
            }}>
            {!loadedAd ? (
              <TouchableOpacity
                onPress={() => {
                  this.close();
                  this.interstitial.show();
                  printPDF(data);
                }}
                style={styles.contextMenuOption}>
                <View style={styles.contextMenuIcons}>
                  <Icon name="file-document" size={32} />
                </View>
                <Text style={{textAlign: 'center'}}>GENERAR REPORTE</Text>
              </TouchableOpacity>
            ) : (
              <Text>Cargando...</Text>
            )}
          </View>
        </View>
      </Modal>
    );
  }
}

const printPDF = async (venta) => {
  try {
    const saleDate = new Date(venta.timestamp.seconds * 1000);
    const {userData} = await getUserData();
    const html = htmlData(venta, userData);

    const results = await RNHTMLtoPDF.convert({
      html,
      fileName: `REPORTE VENTA ${format(saleDate, 'yMd-hms')}`,
      base64: true,
    });
    await RNPrint.print({filePath: results.filePath});
  } catch (err) {
    console.log('error al intentar generar el reporte: ', err);
  }
};

export default RenderVentasCollection;
