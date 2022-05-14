import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  searchComponent: {
    margin: 2,
  },
  mutedText: {
    color: '#aaa',
    fontSize: 12,
  },
  showDataComponent: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    elevation: 7,
    left: 500,
    backgroundColor: '#fff',
    padding: 0,
  },
  centeredViewModal: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '98%',
    paddingHorizontal: 20,
    marginBottom: 10,
    paddingVertical: 20,
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
  },
  AddCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '0%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '0%',
  },
  AddBtn: {
    backgroundColor: '#101e5a',
    padding: 16,
    borderRadius: 100,
    position: 'absolute',
    right: 24,
    bottom: 24,
    elevation: 8,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    alignItems: 'center',
  },
  txtInput: {
    width: '100%',
    fontSize: 16,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#e6e8f1',
    marginBottom: 10,
  },
  textContainer: {
    flexDirection: 'row',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  barCodeIcon: {
    color: '#101e5a',
    flex: 1,
    fontSize: 28,
  },
  nombre: {
    flex: 9,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#101e5a',
    padding: 4,
  },
  nombreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-start',
    borderColor: '#ccc',
  },
  editNombre: {
    flex: 1,
    textAlign: 'center',
    color: '#101e5a',
    paddingHorizontal: 8,
  },
  quantity: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  quantityBadge: {
    width: 24,
    height: 24,
    backgroundColor: '#e6e8f1',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 100,
    color: '#000',
  },
  listItem: {
    width: '100%',
    justifyContent: 'space-between',
    height: 64,
    padding: 8,
    paddingHorizontal: 36,
    marginVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 16,
  },
  listItemText: {
    maxWidth: '40%',
  },
  modifyQuantityContainer: {
    borderWidth: 3,
    borderColor: '#ddd',
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    borderRadius: 100,
  },
  modifyQuantityButton: {

  },
  listItemQuantity: {
    width: 18,
    height: 18,
    padding: 2,
    borderRadius: 100,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 14,
    paddingTop: 8,
    fontFamily: 'VarelaRound-Regular',
  },
  itemSubtitle: {
    fontSize: 12,
    color: '#b4b6be',
    paddingBottom: 16,
    width: '100%',
    paddingRight: 50,
    overflow: 'hidden',
    fontFamily: 'VarelaRound-Regular',
  },
  form: {
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00000055',
  },
  container: {
    backgroundColor: 'white',
  },
  imageContainer: {
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    position: 'relative',
    height: 260,
    width: '100%',
    marginVertical: 10,
  },
  showImageButton: {
    alignItems: 'center',
    alignContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#f1f2f3',
    zIndex: -1,
    overflow: 'hidden',
  },
  updateImageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#f6f7f8aa',
    borderRadius: 100,
    padding: 10,
    elevation: 30,
  },
  addImageIcon: {
    fontSize: 225,
    color: '#101e5a',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  displayImage: {
    width: '100%',
    height: '100%',
  },
  displayImageContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  displayCloseIcon: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 100,
    elevation: 30,
  },
  shareImageIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#f6f7f8aa',
    borderRadius: 100,
    padding: 10,
    elevation: 30,
  },
  emptyListContainer: {
    alignSelf: 'center',
    width: '90%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyListText: {
    fontSize: 20,
    color: 'gray',
    textAlign: 'center',
  },
  listLetter: {
    marginTop: 8,
    marginLeft: 8,
    color: 'gray',
    fontWeight: 'bold',
  },
});

export default styles;
