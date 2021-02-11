import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wave: {
    flex: 1,
    position: 'absolute',
    top: '-45%',
  },
  welcomeTitle: {
    position: 'relative',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#acbdd3',
    top: '-8%',
  },
  logoContainer: {
    top: '-8%',
    width: '50%',
    height: '20%'
  },
  logo: {
    height: '100%',
    width: '100%',
    resizeMode: 'center',
  },
  textInputContainer: {
    top: '-8%',
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
  changeScreen: {
    textAlign: 'center',
  }
});

export default styles;
