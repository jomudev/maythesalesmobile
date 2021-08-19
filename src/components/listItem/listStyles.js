import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: 8,
    borderBottomColor: '#b4b6be',
  },
  contextMenuIcon: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    alignSelf: 'center',
  },
  venta: {
    marginTop: 8,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  totalContainer: {
    flexDirection: 'row',
    textAlignVertical: 'center',
    alignContent: 'center',
  },
  totalSoldOut: {
    flex: 1,
    textAlign: 'center',
    color: 'black',
    backgroundColor: '#e6e8f1',
    borderRadius: 4,
    margin: 1,
    padding: 16,
    fontSize: 16,
  },
  totalProfits: {
    margin: 1,
    color: 'black',
    padding: 16,
    backgroundColor: '#e6e8f1',
    borderRadius: 4,
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
  },
  ventaHeader: {
    flexDirection: 'row',
    padding: 16,
  },
  saleStateView: {
    height: 4,
  },
  saleState: {
    width: 100,
    flex: 10,
    padding: 8,
    alignItems: 'center',
  },
  ventaTitleText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  listVentas: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#e6e8f1',
  },
  subtotalContainer: {
    flexDirection: 'row',
    paddingBottom: 24,
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
