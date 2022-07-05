/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RNCamera} from 'react-native-camera';

const deviceWidth = Dimensions.get('window').width;

export default function CamScanner({handleReturn}) {
  const [barcode, setBarcode] = useState(null);

  const handleGetBarcode = (barcode) => {
    if (barcode.type !== 'UNKNOWN_FORMAT') {
      handleReturn(barcode.data);
      setBarcode(barcode.data);
    }
  };

  return (
    <View style={{...StyleSheet.absoluteFillObject, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
      <RNCamera
        style={{...StyleSheet.absoluteFillObject}}
        type={RNCamera.Constants.Type.back}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        captureAudio={false}
        androidCameraPermissionOptions={{
          title: '¿Puedo usar tu cámara?',
          message: 'Necesito que me permitas usar la cámara para poder leer el código de barras',
          buttonPositive: 'Ok, de acuerdo',
          buttonNegative: 'Denegar, no quiero que uses mi cámara',
        }}
        onGoogleVisionBarcodesDetected={({barcodes}) => {
          if (barcodes.length > 0) {
            handleGetBarcode(barcodes[0]);
          }
        }}
      />
      <View
        style={{alignItems: 'center', justifyContent: 'center', position: 'absolute', opacity: 0.5}}>
        <Icon
          name="scan-helper"
          color="white"
          size={deviceWidth / 2}
        />
        {barcode && (
          <Text style={{color: 'white', textAlign: 'center'}}>
            {barcode}
          </Text>
        )}
      </View>
    </View>
  );
}
