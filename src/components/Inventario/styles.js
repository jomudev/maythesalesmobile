import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  form: {
    maxWidth: 700,
    padding: 20,
    backgroundColor: 'white',
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    overflow: 'hidden',
  },
  formTitle: {
    fontSize: 46,
    marginBottom: 50,
  },
  findProductsList: {
    alignSelf: 'center',
    width: '90%',
    padding: 0,
    backgroundColor: '#f7f8f9',
    borderRadius: 15,
    maxHeight: 200,
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
    fontSize: 28,
    color: '#101e5a',
  },
  itemList: {
    borderRadius: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: 'rgb(243,243,243)',
    paddingVertical: 20,
    flexDirection: 'column',
    marginHorizontal: 0.5,
    height: 70,
    overflow: 'hidden',
  },
  txtInput: {
    padding: 10,
    margin: 10,
    textAlign: 'center',
    flex: 9,
  },
  flatList: {
    backgroundColor: 'transparent',
  },
  menuListItem: {
    backgroundColor: '#f3f4f5',
    borderRadius: 20,
    width: '90%',
    alignSelf: 'center',
    overflow: 'hidden',
    marginVertical: 10,
  },
  menuListHeader: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuListTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#101e5a',
  },
  menuListBodyText: {
    fontSize: 12,
    color: '#555',
  },
  menuListBody: {
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 10,
  },
  menuListFooter: {
    flexDirection: 'row',
    padding: 15,
  },
  menuListIcon: {
    color: '#101e5a',
    paddingRight: 10,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  btnTxt: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
export default styles;
