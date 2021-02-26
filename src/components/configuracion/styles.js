import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    paddingVertical: 8,
  },
  label: {
    fontSize: 14,
    width: '96%',
    paddingHorizontal: 16,
  },
  ListItem: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ddd',
    padding: 4,
    flexDirection: 'row',
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
    width: '96%',
    backgroundColor: 'white',
    paddingHorizontal: 16,
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
