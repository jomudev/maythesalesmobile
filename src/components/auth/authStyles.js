import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

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
  form: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    width: '100%',
    textAlign: 'center',
  },
  logoContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
    top: 0,
  },
  logo: {
    height: '50%',
    top: '35%',
    resizeMode: 'center',
  },
  textInputContainer: {
    width,
    paddingHorizontal: 48,
  },
  label: {
    marginVertical: 8,
  },
  textInput: {
    backgroundColor: '#e6e8f1',
    position: 'relative',
    height: 56,
    width: '100%',
    borderRadius: 100,
    marginVertical: 8,
  },
  passwordView: {
    marginVertical: 8,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    height: 56,
    alignSelf: 'center',
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: '#e6e8f1',
  },
  passwordInput: {
    textAlign: 'left',
    padding: 0,
    margin: 0,
    width: '80%',
    height: '100%',
  },
  showPasswordIcon: {
    position: 'absolute',
    right: 16,
    width: 48,
    height: '100%',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeScreenText: {
    textAlign: 'right',
  },
  changeScreen: {
    height: 56,
    borderRadius: 100,
    backgroundColor: '#e6e8f1',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
