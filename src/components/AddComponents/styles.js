import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  form: {
    ...StyleSheet.absoluteFillObject,
    padding: 8,
    backgroundColor: 'white',
  },
  formTitle: {
    fontSize: 16,
    textAlign: 'center',
    margin: 8,
  },
  Icon: {
    fontSize: 32,
    color: '#101e5a',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 8,
    flex: 1,
  },
  txtInput: {
    width: '100%',
    backgroundColor: 'white',
    padding: 16,
  },
  btn: {
    backgroundColor: '#101e5a',
    marginVertical: 24,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: '110%',
    alignSelf: 'center',
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
    height: 200,
  },
  setImageButton: {
    alignContent: 'center',
    alignItems: 'center',
    height: '96%',
    width: '96%',
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
    padding: 16,
    top: 8,
    right: 8,
  },
  imageRemoveIcon: {
    fontSize: 36,
    color: '#101e5a',
  },
});

export default styles;
