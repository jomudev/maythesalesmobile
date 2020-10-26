import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  form: {
    width: '100%',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  formTitle: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 20,
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
    padding: 15,
    borderRadius: 15,
    elevation: 5,
    marginVertical: 5,
  },
  btn: {
    backgroundColor: '#101e5a',
    marginTop: 50,
    elevation: 5,
    padding: 20,
    margin: 2,
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
