import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: 8,
    borderBottomColor: '#b4b6be',
  },
  contextMenuIcon: {
    textAlign: 'center',
    textAlignVertical: 'center',
    position: 'absolute',
    right: 0,
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
    backgroundColor: 'white',
  },
  reportButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
  },
  totalSoldOut: {
    flex: 1,
    textAlign: 'center',
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 4,
    margin: 1,
    padding: 16,
    fontSize: 16,
  },
  totalProfits: {
    margin: 1,
    color: 'black',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 4,
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
  },
  ventaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saleStateView: {
    height: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saleState: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
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
