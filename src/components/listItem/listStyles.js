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
    paddingVertical: 16,
    elevation: 30,
  },
  contextMenuBtn: {
    textAlign: 'right',
    width: 100,
    alignSelf: 'flex-end',
    right: 0,
  },
  contextMenuOption: {
    padding: 16,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contextMenuOptions: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '100%',
    padding: 16,
    elevation: 60,
  },
  contextMenuIcons: {
    alignItems: 'center',
    borderRadius: 100,
    justifyContent: 'center',
    marginRight: 16,
    width: 50,
    height: 50,
    backgroundColor: '#ddd',
  },
  venta: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#fff',
  },
  ventaHeader: {
    borderBottomColor: '#ccc',
    paddingVertical: 8,
  },
  ventaTitleText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  listVentas: {
    ...StyleSheet.absoluteFillObject,
  },
  subtotalContainer: {
    flexDirection: 'row',
    paddingVertical: 24,
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
