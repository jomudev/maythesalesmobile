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
    backgroundColor: '#fff',
  },
  screenTitle: {
    fontFamily: 'VarelaRound-Regular',
    fontSize: 24,
  },
  findProductsList: {
    alignSelf: 'center',
    width: '100%',
  },
  emptySearch: {
    padding: 8,
    textAlign: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Icon: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 32,
    color: '#101e5a',
  },
  itemList: {
    padding: 8,
    width: 80,
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 8,
    margin: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedItemList: {
    borderColor: '#9CB1D3',
    backgroundColor: '#EEF0FC',
  },
  itemImage: {
    width: 48,
    height: 48,
    resizeMode: 'cover',
    marginRight: 8,
    borderRadius: 100,
  },
  txtInput: {
    paddingVertical: 8,
    margin: 8,
    flex: 9,
    fontSize: 12,
    fontFamily: 'VarelaRound-Regular',
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
