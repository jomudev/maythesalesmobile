import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  form: {
    width: 300,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formTitle: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 20,
  },
  txtInput: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#eee',
    paddingHorizontal: 32,
    paddingVertical: 5,
    marginVertical: 5,
  },
  btn: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    margin: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 150,
    backgroundColor: '#f7f8f9',
    borderRadius: 20,
  },
  cancelBtn: {
    backgroundColor: 'rgb(255,80,80)',
  },
  succesBtn: {
    backgroundColor: '#5d80b6',
  },
  txtMuted: {
    color: 'gray',
  },
});

export default styles;
