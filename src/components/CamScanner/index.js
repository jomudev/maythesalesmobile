/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StatusBar} from 'react-native';
import {RNCamera} from 'react-native-camera';
import store from '../../../store';
import firestore from '@react-native-firebase/firestore';

async function getProduct(barcode) {
  firestore()
    .collection('users')
    .doc(store.getState().user.uid)
    .collection('productos')
    .where('barcode', '==', barcode);
}

export default function CamScanner({navigation, route}) {
  const type = route.params.type;
  const prevScreen = route.params.screen;
  const [camera, setCamera] = useState(null);
  const [barcodeData, setBarcodeData] = useState(null);

  const readBarcode = barcode => {
    if (barcode.type !== 'UNKNOWN_FORMAT') {
      setBarcodeData(barcode.data);
      if (type === 'getProduct' && !barcodeData) {
        getProduct(barcode.data).then(res => {
          navigation.navigate('index', {scannerProduct: res.data()});
        });
      }
      if (type === 'getBarcode' && !barcodeData) {
        navigation.navigate(prevScreen, {scannedBarcode: barcode});
      }
    }
  };

  return (
    <View style={{backgroundColor: 'black', flex: 1}}>
      <StatusBar translucent backgroundColor="transparent" barStyle="default" />
      <RNCamera
        ref={ref => {
          setCamera(ref);
        }}
        style={{
          flex: 1,
          backgroundColor: 'black',
          width: '100%',
        }}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permiso para usar la camara',
          message: 'Necesitamos tu permiso para usar tu camara',
          buttonPositive: 'Ok',
          buttonNegative: 'Denegar',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permiso para usar el microfono',
          message: 'Necesitamos tu permiso para usar tu audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Denegar',
        }}
        onGoogleVisionBarcodesDetected={({barcodes}) => {
          if (barcodes.length > 0) {
            readBarcode(barcodes[0]);
          }
        }}
      />
      {barcodeData ? (
        <Text style={{color: 'white', textAlign: 'center'}}>{barcodeData}</Text>
      ) : null}
    </View>
  );
}
