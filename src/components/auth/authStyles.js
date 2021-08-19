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
  },
  passwordView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 7,
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
