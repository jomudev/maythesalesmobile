import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
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
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  saleStateText: {
    fontSize: 16,
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  switchSaleState: {
    flex: 1,
    alignSelf: 'flex-end',
    height: 30,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#101e5a',
  },
  soldButtonText: {
    flex: 1,
    color: 'white',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    paddingHorizontal: 8,
    fontSize: 24,
  }
});

export default styles;