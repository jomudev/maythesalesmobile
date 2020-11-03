import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ListItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  text: {
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 15,
    width: '90%',
    padding: 20,
    margin: 5,
  },
  button: {
    marginTop: 20,
    paddingVertical: 20,
    backgroundColor: '#101e5a',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 15,
    borderRadius: 20,
  }
});

export default styles;
