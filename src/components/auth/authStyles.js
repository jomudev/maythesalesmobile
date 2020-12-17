import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  button: {
    width: '70%',
    padding: 20,
    shadowColor: '#101e5a',
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: '#101e5a',
    marginBottom: 10,
    marginTop: 20,
  },
  imageContainer: {
    width: '100%',
    flex: 1,
    top: 0,
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
    width: '100%',
    flex: 1,
  },
  textInputContainer: {
    flex: 1,
    paddingTop: 50,
  },
  errorMsg: {
    width: '70%',
    alignSelf: 'center',
    margin: 3,
    padding: 5,
    backgroundColor: '#ffaaaaaa',
    borderRadius: 4,
  },
  registrarse: {
    textAlign: 'center',
    padding: 5,
  },
  textInput: {
    padding: 15,
    margin: 2.5,
    width: '70%',
    borderRadius: 20,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  Wave: {
    flex: 1,
    alignSelf: 'center',
    height: 200,
    width: '500%',
    resizeMode: 'center',
  },
  logo: {
    width: '100%',
    resizeMode: 'center',
    position: 'absolute',
  }
});

export default styles;
