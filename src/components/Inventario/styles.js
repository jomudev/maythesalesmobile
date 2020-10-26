import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  form: {
    maxWidth: 700,
    borderRadius: 20,
    flex: 1,
  },
  formTitle: {
    fontSize: 46,
    marginBottom: 50,
  },
  findProductsList: {
    alignSelf: 'center',
    width: '90%',
    padding: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    maxHeight: 200,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Icon: {
    textAlign: 'center',
    flex: 1,
    borderRadius: 10,
    fontSize: 28,
  },
  itemList: {
    borderRadius: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: 'rgb(243,243,243)',
    paddingVertical: 20,
    flexDirection: 'column',
    marginHorizontal: 0.5,
  },
  txtInput: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 10,
    textAlign: 'center',
    flex: 9,
  },
  flatList: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#efefef',
  },
  menuListItem: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '90%',
    elevation: 5,
    alignSelf: 'center',
    marginTop: 20,
    overflow: 'hidden',
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
  },
  menuListBodyText: {
    fontSize: 12,
    color: '#555',
  },
  menuListBody: {
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 20,
  },
  menuListFooter: {
    flexDirection: 'row',
  },
  menuListIcon: {
    color: '#555',
    paddingRight: 10,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 25,
    borderRadius: 4,
  },
  btnTxt: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
export default styles;
