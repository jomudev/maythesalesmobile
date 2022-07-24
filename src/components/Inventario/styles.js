import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  form: {
    maxWidth: 700,
    backgroundColor: 'white',
  },
  formGroup: {
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  header: {
    elevation: 0,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  screenTitle: {
    fontFamily: 'VarelaRound-Regular',
    fontSize: 24,
  },
  findProductsList: {
    alignSelf: 'center',
    width: '100%',
    display: 'flex',
  },
  emptySearch: {
    padding: 8,
    textAlign: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Icon: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 32,
    flex: 0.25,
    color: '#101e5a',
  },
  itemList: {
    elevation: 8,
    backgroundColor: 'white',
    width: 200,
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    marginHorizontal: 8,
    marginVertical: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedItemList: {
    borderColor: '#9CB1D3',
    backgroundColor: '#EEF0FC',
  },
  itemImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  itemDescription: {
    justifyContent: 'space-evenly',
    flex: 1, 
    padding: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 18,
  },
  itemBrand: {
    fontSize: 12,
    color: 'gray',
  },
  txtInput: {
    height: 48,
    flex: 1,
    margin: 8,
    backgroundColor: '#e6e8f1',
    fontSize: 12,
  },
  inventoryOptionsContainer: {
    flexDirection: 'column',
    alignContent: 'stretch',
    ...StyleSheet.absoluteFillObject,
  },
  optionBackground: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    alignContent: 'stretch',
    alignItems: 'center',
    position: 'absolute',
    opacity: 0.6,
  },
  menuOptionItem: {
    flex: 1,
    backgroundColor: '#101e5a',
  },
  menuTitle: {
    flex: 1,
    width: '100%',
  },
  menuOptionTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 24,
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowColor: '#000f',
    flex: 1,
    textShadowRadius: 16,
    color: '#fff',
  },
  menuOptionIcon: {
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 1,
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowColor: '#0006',
    textShadowRadius: 8,
    fontSize: 38,
  },
});
export default styles;
