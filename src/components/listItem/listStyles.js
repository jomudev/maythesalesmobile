import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: 8,
    borderBottomColor: '#b4b6be',
  },
  contextMenuBtn: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
  contextMenuIcon: {
    textAlign: 'center',
    padding: 8,
    textAlignVertical: 'center',
    alignSelf: 'flex-end',
  },
  venta: {
    marginTop: 8,
    padding: 8,
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
    borderBottomColor: '#b4b6be',
    paddingVertical: 8,
  },
  saleState: {
    width: 100,
    borderRadius: 100,
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
