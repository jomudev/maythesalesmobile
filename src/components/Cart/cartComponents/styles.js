import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  productContainer: {
    width: '100%',
    backgroundColor: '#ffff',
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
  },
  serviceContainer: {
    width: '100%',
    paddingBottom: 8,
    elevation: 8,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 16,
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    marginVertical: 4,
  }, 
  separator: {
    height: 1,
    backgroundColor: '#e4e4e4',
    marginVertical: 4,
  },
  swipeItem: {
    backgroundColor: 'red', 
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  swipeItemText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },  
  cartList: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  productImage: {
    height: 80,
    borderRadius: 8,
    width: 80,
  },
  productDescriptionContainer: {
    padding: 8,
  },
  productName: {
    fontSize: 12,
    width: 200,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  productBrand: {
    fontSize: 12,
    color: 'gray',
    fontWeight: 'bold',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityContainer: {
    display: 'flex',
    marginLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#e6e8f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 32,
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 0,
    color: 'gray',
  },
  quantityInput: {
    textAlign: 'center',
    color: 'black',
  },
  cartTitle: {
    paddingHorizontal: 8,
    fontSize: 24,
    textAlign: 'left',
    fontWeight: 'bold',
  },
});

export default styles;
