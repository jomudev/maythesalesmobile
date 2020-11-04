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
    color: '#555',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 10,
    flex: 1,
  },
  txtInput: {
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingTop: 30,
    paddingBottom: 2,
    borderRadius: 5,
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
});

export default styles;
