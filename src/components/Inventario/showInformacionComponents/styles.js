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
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
  },
  textContainer: {
    flexDirection: 'row',
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
  listItem: {
    padding: 15,
    width: '100%',
    backgroundColor: '#f2f3f4',
    borderRadius: 5,
    marginVertical: 0.5,
    overflow: 'hidden',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemSubtitle: {
    fontSize: 14,
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
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
});

export default styles;
