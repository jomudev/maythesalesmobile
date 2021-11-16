import ImagePicker from 'react-native-image-crop-picker';
import {db, fileStorage} from '../mainFunctions';
import {ToastAndroid} from 'react-native';

const cropOptions = {
  cropping: true, 
  freeStyleCropEnabled: true,
  compressImageQuality: 0.7,
};

async function updateImage(data, collectionKey, typeOfImageToObtain, callback) {
  try {
    const pickerResponse = await (typeOfImageToObtain
    ? ImagePicker.openCamera(cropOptions)
    : ImagePicker.openPicker(cropOptions));
    const imageRef = `${collectionKey}/${data.nombre}/productImage`;
    await fileStorage(imageRef).putFile(pickerResponse.path)
    .then(() => {
      ToastAndroid.show(`actualizando base de datos...`, ToastAndroid.LONG);
    })
    .catch((err) => {
      ToastAndroid.show(`error: ${err}`, ToastAndroid.LONG);
    });
    const imageURL = await fileStorage(imageRef).getDownloadURL();
    await db(collectionKey).doc(data.id).update({imageURL})
    .then(() => {
      ToastAndroid.show('actualización exitosa', ToastAndroid.LONG);
    })
    .catch((err) => {
      ToastAndroid.show(`error: ${err}`, ToastAndroid.LONG);
    });
    callback(imageURL);
    ImagePicker.clean();
  } catch (err) {
    err = JSON.stringify(err);
    console.log(err);
    err = JSON.parse(err);
    var message = 'Error al intentar cargar la imagen.';
    if (err.code === 'E_PICKER_CANCELLED') {
      message = '¡Vaya! cancelaste la selección de imagen.';
    }
    ToastAndroid.show(message, ToastAndroid.LONG);
  }
}

export {updateImage};
