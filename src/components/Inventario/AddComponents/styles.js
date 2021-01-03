import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  form: {
    ...StyleSheet.absoluteFillObject,
    padding: 5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: 'white',
  },
  formTitle: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
  },
  Icon: {
    fontSize: 28,
    color: '#101e5a',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 10,
    flex: 1,
  },
  txtInput: {
    width: '100%',
    backgroundColor: 'white',
    padding: 15,
  },
  btn: {
    backgroundColor: '#101e5a',
    marginTop: 50,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    borderRadius: 20,
  },
  txtMuted: {
    color: '#555',
    alignSelf: 'flex-start',
  },
  imageContainer: {
    overflow: 'hidden',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f2f3',
    marginHorizontal: 5,
    borderRadius: 20,
    height: 150,
  },
  setImageButton: {
    alignContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageIcon: {
    fontSize: 140,
    color: '#101e5a',
  },
  imageRemoveButton: {
    position: 'absolute',
    zIndex: 1,
    borderRadius: 100,
    elevation: 30,
    backgroundColor: '#f6f7f8dd',
    padding: 10,
    top: 5,
    right: 5,
  },
  imageRemoveIcon: {
    fontSize: 36,
    color: '#101e5a',
  },
});

export default styles;
