import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomColor: '#ddd',
  },
  venta: {
    margin: 10,
    elevation: 2,
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
  }
});

export default styles;
