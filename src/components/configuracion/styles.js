import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 14,
  },
  info: {
    marginVertical: 16,
  },
  ListItem: {
    justifyContent: 'center',
    borderColor: '#ddd',
    paddingVertical: 4,
    flexDirection: 'row',
  },
  logoutButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    backgroundColor: '#e6e8f1',
  },
  listIcon: {
    flex: 1,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listInfo: {
    flex: 7,
    paddingVertical: 8,
    flexDirection: 'column',
    overflow: 'hidden',
    borderColor: '#ddd',
  },
  text: {
    width: '100%',
    backgroundColor: 'white',
    fontSize: 14,
    alignSelf: 'center',
    borderColor: '#ccc',
    paddingVertical: 8,
  },
  picker: {
    width: '96%',
    height: 32,
    alignSelf: 'center',
  },
  pickerItem: {
    fontSize: 12,
  }
});

export default styles;
