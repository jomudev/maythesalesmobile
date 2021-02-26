/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StatusBar, Alert} from 'react-native';
//import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RNCamera} from 'react-native-camera';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import store from '../../../store';

async function getProduct(barcode) {
  return firestore()
    .collection('negocios')
    .doc(auth().currentUser.uid)
    .collection('productos')
    .where('barcode', '==', barcode)
    .get();
}

const setBarcode = (res) => {
  if (!res.empty) {
    const data = res.docs[0].data();
    store.dispatch({
      type: 'ADD_PRODUCT_TO_CART',
      product: data,
    });
  } else {
    Alert.alert(
      'Producto no encontrado',
      'el producto no existe, ¿Seguro que no olvidaste escanear el codigo del producto?',
    );
  }
};

export default function CamScanner({navigation, route}) {
  const type = route.params.type;
  const prevScreen = route.params.screen;
  const [barcodeData, setBarcodeData] = useState(null);
  const [scanIconSize, setScanIconSize] = useState(null);

  const readBarcode = (barcode) => {
    if (barcode.type !== 'UNKNOWN_FORMAT') {
      setBarcodeData(barcode.data);
      if (type === 'getProduct' && !barcodeData) {
        getProduct(barcode.data).then(setBarcode);
        navigation.navigate('index');
      } else if (type === 'getBarcode' && !barcodeData) {
        navigation.navigate(prevScreen, {scannedBarcode: barcode});
      }
    }
  };

  return (
    <View style={{backgroundColor: 'black', flex: 1}}>
      <StatusBar translucent backgroundColor="transparent" barStyle="default" />
      <RNCamera
        style={{
          flex: 1,
          position: 'absolute',
          height: '100%',
          backgroundColor: 'black',
          width: '100%',
        }}
        type={RNCamera.Constants.Type.back}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        captureAudio={false}
        androidCameraPermissionOptions={{
          title: 'Permiso para usar la camara',
          message: 'Necesitamos tu permiso para usar tu camara',
          buttonPositive: 'Ok',
          buttonNegative: 'Denegar',
        }}
        onGoogleVisionBarcodesDetected={({barcodes}) => {
          if (barcodes.length > 0) {
            readBarcode(barcodes[0]);
          }
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}>
        <Icon
          onLayout={(Layout) => {
            const layout = {
              width: Layout.nativeEvent.layout.width,
              height: Layout.nativeEvent.layout.height,
            };
            setScanIconSize(layout);
          }}
          name="scan-helper"
          color="white"
          size={300}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: scanIconSize
              ? [
                  {translateX: -scanIconSize.width / 2},
                  {translateY: -scanIconSize.height / 2},
                ]
              : [],
            opacity: 0.3,
          }}
        />
        {barcodeData ? (
          <Text style={{color: 'white', textAlign: 'center'}}>
            {barcodeData}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
