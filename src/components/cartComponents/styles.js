import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  productContainer: {
    paddingVertical: 16,
    shadowOffset:  {
      width: 0,
      height: 4,
    },
    elevation: 8,
    shadowRadius: 13.97,
    shadowOpacity: 0.53,
    margin: 8,
    width: 200,
    borderRadius: 8,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartList: {
    paddingBottom: 8,
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  deleteButton: {
    borderRadius: 100,
    width: 24, 
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 8,
    top: 8,
  },
  productDescription: {
    fontSize: 12,
    color: 'gray',
    fontFamily: 'VarelaRound-Regular',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'VarelaRound-Regular',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButton: {
    width: 50,
    height: 50,
    backgroundColor: '#e6e8f1',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 200,
  },
  buttonText: {
    fontSize: 32,
    color: '#101e5a',
  },
  quantityInput: {
    width: 50,
    textAlign: 'center',
    borderColor: '#e6e8f1',
  },
  cartTitle: {
    paddingHorizontal: 8,
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default styles;
