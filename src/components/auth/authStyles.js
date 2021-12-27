import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  lightMainContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkMainContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverPhoto: {
    width: '100%',
    height: '100%',
    flex: 1,
    top: 0,
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
  },
  logo: {
    height: '80%',
    marginTop: 30,
    width: '100%',
    resizeMode: 'center',
  },
  textInputContainer: {
    width: '80%',
    height: '30%',
    paddingVertical: 16,
  },
  label: {
    marginVertical: 8,
    marginLeft: 16
  },
  textInput: {
    backgroundColor: '#e6e8f1',
    position: 'relative',
    height: 48,
    marginVertical: 4,
    marginHorizontal: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  passwordView: {
    flexDirection: 'row',
    width: '111%',
    alignItems: 'center',
    marginVertical: 4,
    marginHorizontal: 8,
    paddingRight: 16,
    paddingLeft: 0,
    height: 48,
    alignSelf: 'center',
    borderRadius: 8,
    backgroundColor: '#e6e8f1'
  },
  passwordInput: {
    textAlign: 'left',
    padding: 0,
    width: '80%',
    margin: 0,
    height: 48,
  },
  showPasswordIcon: {
    alignSelf: 'flex-end',
    marginLeft: 16,
  },
  changeScreenText: {
    textAlign: 'center',
  },
  changeScreen: {
    height: 50,
    justifyContent: 'center',
  },
});

export default styles;
