import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: '#000000AA',
    justifyContent: 'flex-end',
  },
  modalPopupMenu: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width: '100%',
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
