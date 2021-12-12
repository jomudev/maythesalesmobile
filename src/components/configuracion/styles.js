import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    paddingHorizontal: 16,
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
  messageContainer: { 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageIcon: {
    fontSize: 16,
    padding: 8,
  },
  message: {
    textAlign: 'center',
    marginVertical: 8,
  },
  actionButton: {
    borderRadius: 8,
    backgroundColor: '#101e5a',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    alignSelf: 'center',
    paddingVertical: 18,
    marginVertical: 16,
  },
  logoutButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    backgroundColor: '#fff',
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
