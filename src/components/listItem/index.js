/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {RenderItemProducto, RenderItemServicio} from './Item';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './listStyles';
import moment from 'moment';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const deviceHeight = Dimensions.get('window').height;

const subtotal = (lista) => {
  let sum = 0;
  lista.forEach((item) => (sum += item.precioVenta * item.cantidad));
  return Number.parseFloat(sum).toFixed(2);
};

const RenderVentasCollection = ({venta}) => {
  let popupRef = React.createRef();

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
          <Icon name="more-vert" size={28} style={styles.contextMenuBtn} />
        </TouchableWithoutFeedback>
        <ContextMenu
          ref={(target) => (popupRef = target)}
          data={venta}
          onTouchOutside={() => onClosePopup()}
        />
        <Text style={styles.ventaTitleText}>
          {moment(venta.timestamp, 'x', 'x').format('LLL')}{' '}
          {moment(venta.timestamp, 'x', 'x').fromNow()}
        </Text>
        <Text>{venta.cliente ? venta.cliente.nombre : null}</Text>
      </View>
      {venta.servicios.length > 0 ? (
        <Text style={styles.ventaTitleText}>Productos</Text>
      ) : null}
      {venta.productos.map((producto) => {
        return <RenderItemProducto key={producto.id} producto={producto} />;
      })}
      <View style={styles.subtotalContainer}>
        <Text style={styles.subtotalTitle}>subtotal productos:</Text>
        <Text style={styles.subtotal}>L{subtotal(venta.productos)}</Text>
      </View>
      {venta.servicios.length > 0 ? (
        <Text style={styles.ventaTitleText}>Servicios adicionales</Text>
      ) : null}
      {venta.servicios.map((servicio) => (
        <RenderItemServicio key={servicio.id} servicio={servicio} />
      ))}
      <View style={styles.subtotalContainer}>
        <Text style={styles.subtotalTitle}>
          subtotal servicios adicionales:
        </Text>
        <Text style={styles.subtotal}>L{subtotal(venta.servicios)}</Text>
      </View>
      <View>
        <Text style={{textAlign: 'right', fontWeight: 'bold'}}>
          Total: L{Number.parseFloat(venta.total).toFixed(2)}
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
    };
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
    const {show} = this.state;
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
            <TouchableOpacity
              onPress={() => printPDF(data)}
              style={styles.contextMenuOption}>
              <Text>GENERAR REPORTE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const printPDF = async (venta) => {
  const user = auth().currentUser;
  await firestore()
    .collection('negocios')
    .doc(user.uid)
    .get()
    .then(async (doc) => {
      const userData = doc.data();
      const html = `
        <style>
          .nofactura {
            text-align: right;
          }

          thead {
            background-color: rgba(20, 100, 256, 0.2);
          }

          .list td {
            font-size: 12px; 
            text-align: center              
          }

          .total {
            align-text: right;
            align-items: flex-end;
            justify-content: flex-end;
          }

          .totalTd {
            background-color: rgba(20, 100, 256, 0.2);
            font-weight: bolder;
          }

          .mainTable {
            width: 100%;
          }

        </style>
        <div class="nofactura">No. Factura: ${moment(
          venta.timestamp,
          'x',
        ).format('DDMMYYYYhhmmss')}</div>
        ${userData.negocio ? `<h1>${userData.negocio}</h1>` : ''}
        ${userData.displayName ? `<h2>${user.displayName}</h2>` : ''}

        <h3>fecha: ${moment(venta.timestamp, 'x').format('ll')} - ${moment(
        venta.timestamp,
        'x',
      ).format('DD/MM/YYYY')}</h3>
        ${
          venta.cliente
            ? `
          <table>
            <caption>Facturar a:</caption>
            <tr><td>${
              venta.cliente.nombre ? venta.cliente.nombre : null
            }</td></tr>
            ${
              venta.cliente.email
                ? `<tr><td>correo: ${venta.cliente.email}</td></tr>`
                : null
            }
            ${
              venta.cliente.telefono
                ? `<tr><td>cel: ${venta.cliente.telefono}</td></tr>`
                : null
            }
          </table>
        `
            : ''
        }
        <table class="mainTable list">
        ${
          venta.productos.length
            ? `
          <thead>
            <tr>
              <th colspan="5">PRODUCTOS</th>
            </tr>
            <tr>
                <th>CODIGO</th>
                <th>DESCRIPCION</th>
                <th>CANTIDAD</th>
                <th>COSTO POR UNIDAD</th>
                <th>TOTALES</th>
            </tr>
          </thead>
          <tbody>
          ${venta.productos.map(
            (producto) =>
              `
              <tr>
              <td>${
                producto.codigoDeBarras ? producto.codigoDeBarras : producto.id
              }</td>
              <td>${producto.nombre.toLocaleUpperCase()}${
                producto.descripcion ? ', ' + producto.descripcion : ''
              }</td>
              <td>${producto.cantidad}</td>
                <td>L${parseFloat(producto.precioVenta).toFixed(2)}</td>
                <td>L${parseFloat(
                  producto.precioVenta * producto.cantidad,
                ).toFixed(2)}</td>
              </tr>`,
          )}
            <tr>
              <td colspan="3"></td>
              <td>SUBTOTAL PRODUCTOS</td>
              <td>L${subtotal(venta.productos)}</td>
            </tr>
          </tbody>`
            : null
        }
        ${
          venta.servicios.length
            ? `<thead>
                <tr>
                  <th colspan="5">SERVICIOS</th>
                </tr>
                <tr>
                    <th>CODIGO</th>
                    <th>DESCRIPCION</th>
                    <th>CANTIDAD</th>
                    <th>COSTO POR UNIDAD</th>
                    <th>TOTALES</th>
                </tr>
              </thead>
              <tbody>
              ${venta.servicios.map(
                (servicio) =>
                  `
                  <tr>
                  <td>${servicio.id}</td>
                  <td>${servicio.nombre.toLocaleUpperCase()}${
                    servicio.descripcion ? ', ' + servicio.descripcion : ''
                  }</td>
                  <td>${servicio.cantidad}</td>
                  <td>L${parseFloat(servicio.precioVenta).toFixed(2)}</td>
                    <td>L${parseFloat(
                      servicio.precioVenta * servicio.cantidad,
                    ).toFixed(2)}</td>
                  </tr>`,
              )}
                <tr>
                  <td colspan="3"></td>
                  <td>SUBTOTAL SERVICIOS</td>
                  <td>L${subtotal(venta.servicios)}</td>
                </tr>
              </tbody>`
            : ''
        }
        <tr>
          <td colspan="3"></td>
          <td class="totalTd">TOTAL</td>
          <td class="totalTd">L${parseFloat(venta.total).toFixed(2)}</td>
        </tr>
      </table>
        `;

      const results = await RNHTMLtoPDF.convert({
        html,
        fileName: `REPORTE VENTA ${moment(venta.timestamp, 'x').format(
          'DD-MM-YYYY',
        )}`,
        base64: true,
      });
      await RNPrint.print({filePath: results.filePath});
    })
    .catch((err) => console.log(err));
};

export default RenderVentasCollection;
