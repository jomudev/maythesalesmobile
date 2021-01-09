import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  searchComponent: {
    margin: 2,
  },
  shomethingHere: {
    color: 'gray',
    fontSize: 28,
    textAlign: 'center',
    marginTop: '50%',
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
    padding: 15,
    borderRadius: 100,
    position: 'absolute',
    right: 20,
    bottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 11.5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 2,
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
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 10,
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
    paddingHorizontal: 5,
  },
  quantity: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  quantityBadge: {
    width: 30,
    height: 30,
    backgroundColor: '#101e5a',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 100,
    color: 'white',
  },
  listItem: {
    width: '100%',
    height: 60,
    padding: 20,
    backgroundColor: '#f2f3f4',
    borderRadius: 5,
    marginVertical: 0.5,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemImage: {
    borderWidth: 1,
    marginRight: 10,
    width: 50,
    height: 50,
    borderRadius: 100,
    overflow: 'hidden',
    borderColor: '#acbdd3',
    flex: 1,
  },
  listItemText: {
    flex: 6,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemSubtitle: {
    fontSize: 14,
    paddingVertical: 4,
    color: '#777',
    overflow: 'hidden',
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
    padding: 10,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00000055',
  },
  container: {
    flex: 1,
    padding: 4,
    backgroundColor: 'white',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  imageContainer: {
    alignItems: 'center',
    alignContent: 'center',
    height: 250,
    width: '100%',
    marginVertical: 10,
  },
  showImageButton: {
    alignItems: 'center',
    alignContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#f1f2f3',
    borderRadius: 20,
    overflow: 'hidden',
  },
  updateImageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: '#f6f7f8aa',
    borderRadius: 100,
    padding: 10,
    elevation: 30,
  },
  addImageIcon: {
    fontSize: 225,
    color: '#101e5a',
  },
  uploadingImageIcon: {
    zIndex: 10,
    color: '#000',
    position: 'absolute',
    top: '50%',
    transform: [{translateY: -25}]
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  displayImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  displayImageContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  displayCloseIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 100,
    elevation: 3,
  },
  shareImageIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    backgroundColor: '#f6f7f8aa',
    borderRadius: 100,
    padding: 10,
    elevation: 30,
  },
  emptyListContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
  },
  emptyList: {
    color: '#00000055',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 16,
  }
});

export default styles;
