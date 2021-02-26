import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  form: {
    maxWidth: 700,
    padding: 8,
    backgroundColor: 'white',
  },
  header: {
    elevation: 0,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  screenTitle: {
    fontFamily: 'VarelaRound-Regular',
    fontSize: 24,
  },
  findProductsList: {
    alignSelf: 'center',
    width: '88%',
    padding: 0,
    backgroundColor: '#f7f8f9',
    borderRadius: 4,
    maxHeight: 120,
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
    flex: 1,
    borderRadius: 10,
    fontSize: 24,
    color: '#101e5a',
  },
  itemList: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#aaa',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  itemImage: {
    width: 32,
    height: 32,
    resizeMode: 'cover',
    marginRight: 8,
    borderRadius: 4,
  },
  txtInput: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 8,
    flex: 9,
    fontSize: 12,
    fontFamily: 'VarelaRound-Regular',
  },
  flatList: {
    backgroundColor: 'transparent',
  },
  menuListItem: {
    backgroundColor: '#f3f4f5',
    borderRadius: 4,
    width: '88%',
    alignSelf: 'center',
    overflow: 'hidden',
    marginVertical: 8,
  },
  menuListHeader: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuListTitle: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#101e5a',
  },
  menuListBodyText: {
    fontSize: 12,
    color: '#555',
  },
  menuListBody: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  menuListFooter: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  menuListIcon: {
    color: '#101e5a',
    paddingRight: 16,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  btnTxt: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
export default styles;
