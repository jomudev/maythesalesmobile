import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  subtotal: {
    fontSize: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  bottomView: {
    bottom: 0,
    backgroundColor: '#fff',
    flexDirection: 'column',
    width: '100%',
  },
  bottomViewContent: {
    width: '100%',
    flexDirection: 'column',
    padding: 16
  },
  bottomViewContentRow: {
    width: '100%',
    flexDirection: 'row',
  },
  client: {
    fontSize: 24,
  },
  saleStateContainer: {
    flex: 2,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  saleStateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchSaleState: {
    alignSelf: 'flex-end',
    height: 60,
  },
  total: {
    flex: 3,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: '100%',
    fontSize: 32,
    fontWeight: 'bold',
  },
  soldButton: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#101e5a',
  },
  soldButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  }
});

export default styles;