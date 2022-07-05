import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  form: {
    width: "100%",
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
  },
  flex9: {
    flex: 9,
  },
  flex2: {
    flex: 2,
  },
  barcodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  txtInput: {
  },
  txtAreaInput: {
    width: '100%',
    borderRadius: 0,
  },
  btn: {
    backgroundColor: '#101e5a',
    marginTop: 24,
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
    backgroundColor: '#e6e8f1',
    height: 200,
    width: '100%',
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
    alignSelf: 'center',
    top: '10%',
    color: '#101e5a',
  },
  imageRemoveButton: {
    position: 'absolute',
    zIndex: 1,
    borderRadius: 100,
    elevation: 30,
    backgroundColor: '#e6e8f1aa',
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
