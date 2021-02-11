import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    paddingVertical: 24,
  },
  label: {
    fontSize: 16,
    width: '96%',
    paddingHorizontal: 24,
  },
  ListItem: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    marginHorizontal: 8,
    padding: 8,
    flexDirection: 'row',
  },
  listIcon: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listInfo: {
    flex: 7,
    padding: 8,
    flexDirection: 'column',
    overflow: 'hidden',
    borderColor: '#ddd',
  },
  text: {
    width: '96%',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    fontSize: 16,
    alignSelf: 'center',
    borderColor: '#ccc',
  },
  button: {
    marginTop: 20,
    paddingVertical: 20,
    backgroundColor: '#101e5a',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  }
});

export default styles;
