import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomColor: '#ddd',
  },
  contextMenu: {
    paddingVertical: 8,
    elevation: 30,
  },
  contextMenuBtn: {
    textAlign: 'right',
    alignSelf: 'flex-end',
  },
  contextMenuOption: {
    padding: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  contextMenuOptions: {
    flexDirection: 'column',
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 8,
    elevation: 30,
  },
  contextMenuIcons: {
    alignItems: 'center',
    borderRadius: 100,
    justifyContent: 'center',
    marginRight: 8,
    width: 32,
    height: 32,
    backgroundColor: '#ddd',
  },
  contextMenuOptionText: {
    fontSize: 16,
  },
  venta: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#fff',
  },
  ventaHeader: {
    borderBottomColor: '#ccc',
    paddingVertical: 8,
  },
  saleState: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ventaTitleText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  listVentas: {
    ...StyleSheet.absoluteFillObject,
  },
  subtotalContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
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
