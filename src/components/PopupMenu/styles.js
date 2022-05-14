import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: '#000000AA',
    justifyContent: 'flex-end',
  },
  modalPopupMenu: {
    backgroundColor: '#fff',
    borderRadius: 24,
    width: '95%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    marginBottom: 8,
    paddingBottom: 16,
  },
  popupMenuTitle: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    paddingTop: 8,
    paddingLeft: 16,
  },
  modalOptionItem: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 32,
  },
});

export default styles;
