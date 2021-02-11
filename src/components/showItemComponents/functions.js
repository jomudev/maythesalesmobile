import ImagePicker from 'react-native-image-crop-picker';
import {db, fileStorage} from '../mainFunctions';

async function updateImage(data, type, callback) {
  try {
    const pickerRes = type
      ? await ImagePicker.openCamera({cropping: true})
      : await ImagePicker.openPicker({cropping: true});
    const imageRef = `productos/${data.nombre}/${data.nombre}Image`;
    await fileStorage(imageRef).putFile(pickerRes.path);
    const imageURL = await fileStorage(imageRef).getDownloadURL();
    await db('productos').doc(data.id).update({
      imageURL,
    });
    callback(imageURL);
  } catch (err) {
    console.warn('image picker alert: ', err);
  }
}

export {updateImage};
