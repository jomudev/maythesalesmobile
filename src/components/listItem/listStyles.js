import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomColor: '#ddd',
  },
  contextMenu: {
    paddingVertical: 20,
    elevation: 30,
  },
  contextMenuBtn: {
    textAlign: 'right',
    width: 100,
    alignSelf: 'flex-end',
    right: 0,
  },
  contextMenuOption: {
    padding: 10,
    backgroundColor: 'white',
  },
  contextMenuOptions: {
    backgroundColor: 'white',
    width: '100%',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    padding: 10,
    elevation: 60,
  },
  venta: {
    margin: 10,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#fff',
  },
  ventaHeader: {
    borderBottomColor: '#ccc',
  },
  ventaTitleText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  listVentas: {
    flex: 1,
  },
  subtotalContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  subtotalTitle: {
    flex: 2,
    fontWeight: 'bold',
  },
  subtotal: {
    flex: 1,
    textAlign: 'right',
    fontWeight: 'bold',
  },
});

export default styles;
