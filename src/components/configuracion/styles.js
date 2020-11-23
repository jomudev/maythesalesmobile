import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ListItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginHorizontal: 10,
    flexDirection: 'row',
    padding: 10,
  },
  listIcon: {
    flex: 1,
  },
  listInfo: {
    flex: 9,
    flexDirection: 'column',
    overflow: 'hidden',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    paddingBottom: 20,
  },
  text: {
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingTop: 30,
    paddingBottom: 2,
    borderRadius: 5,
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
