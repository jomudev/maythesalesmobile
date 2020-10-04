import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  button: {
    width: '70%',
    padding: 20,
    elevation: 5,
    shadowColor: '#101e5a',
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: '#101e5a',
    marginVertical: 2.5,
    marginTop: 20,
  },
  imageContainer: {
    alignItems: 'center',
    width: '100%',
    flex: 2,
    borderBottomRightRadius: 60,
    borderBottomLeftRadius: 60,
    overflow: 'hidden',
  },
  loadingScreen: {
    backgroundColor: 'transparent',
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  container: {
    backgroundColor: 'white',
    width: '100%',
    flex: 1,
  },
  textInputContainer: {
    flex: 1,
  },
  registrarse: {
    textAlign: 'center',
    padding: 5,
  },
  textInput: {
    padding: 15,
    margin: 2.5,
    elevation: 5,
    width: '70%',
    borderRadius: 20,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  loginBG: {
    marginTop: `${-10}%`,
    resizeMode: 'contain',
    flex: 1,
    alignSelf: 'center',
  },
});

export default styles;
