import React, {useState} from 'react';
import {View, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import styles from '../styles';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {shareImage, moneyFormat} from '../../../mainFunctions';
import LoadingScreen from '../../../loadingScreen';

const ShowImage = ({data, setShowImage, type, navigation}) => {
  const [isUpload, setIsUpload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleShare = async () => {
    setIsLoading(true);
    shareImage(
      data.imageURL,
      {
        message: `${data.nombre} ${moneyFormat(data.precioVenta)} ${
          data.descripcion
        }`,
      },
      () => {
        setIsLoading(false);
      },
      (err) => {
        setIsLoading(false);
        console.log(err)
      }
    );
  };

  const updateImage = () => {
    ImagePicker.openPicker({
      cropping: true,
    })
      .then((res) => {
        setIsUpload(true);
        const productStorageRef = storage().ref(
          `negocios/${auth().currentUser.uid}/productos/${
            data.nombre
          }/mainImage`,
        );
        const uploadTask = productStorageRef.putFile(res.path);
        uploadTask.on('state_changed', (snapshot) => {
          console.log(snapshot.bytesTransferred + ' de ' + snapshot.totalBytes);
        });

        uploadTask
          .then(async () => {
            setIsUpload(false);
            const url = await productStorageRef.getDownloadURL();
            const productDoc = await firestore()
              .collection('negocios')
              .doc(auth().currentUser.uid)
              .collection('productos')
              .doc(data.nombre.toUpperCase());

            productDoc.update({
              imageURL: url,
            });
            productDoc
              .get()
              .then((doc) => {
                navigation.setParams({
                  type,
                  data: doc.data(),
                });
                setIsUpload(false);
              })
              .catch((err) => {
                console.log(err);
                setIsUpload(false);
              });
          })
          .catch((err) => {
            console.log(err);
            setIsUpload(false);
          });
      })
      .catch((err) => {
        console.log(err);
        setIsUpload(false);
      });
  };

  return (
    <View style={styles.imageContainer}>
      <LoadingScreen isLoading={isLoading} />
      {isUpload ? (
        <ActivityIndicator
          style={styles.uploadingImageIcon}
          size="large"
          color="#f6f7f8"
        />
      ) : null}
      {data.imageURL ? (
        <>
          <TouchableOpacity style={styles.shareImageIcon} onPress={handleShare}>
            <Icon name="share-variant" size={28} color="#101e5a" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.updateImageButton}
            onPress={updateImage}>
            <Icon name="image-edit" size={28} color="#101e5a" />
          </TouchableOpacity>
        </>
      ) : null}
      <TouchableOpacity
        onPress={() => (data.imageURL ? setShowImage(true) : updateImage())}
        style={styles.showImageButton}>
        {data.imageURL ? (
          <Image
            source={{uri: data.imageURL}}
            progressiveRenderingEnabled={true}
            style={styles.image}
          />
        ) : (
          <Icon name="image-plus" style={styles.addImageIcon} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ShowImage;
