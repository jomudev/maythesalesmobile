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
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
  },
  nombre: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nombreContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    flex: 1,
  },
  editNombre: {
    color: '#555',
    paddingHorizontal: 5,
  },
  message: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    elevation: 1,
    padding: 10,
    shadowColor: '#ddd',
    shadowOpacity: 0.25,
    borderRadius: 20,
  },
  closeMessage: {
    position: 'absolute',
    paddingHorizontal: 10,
    alignSelf: 'flex-end',
  },
  listItem: {
    padding: 20,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 1,
    marginVertical: 2,
    overflow: 'hidden',
  },
  itemTitle: {
    fontSize: 18,
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#777',
    overflow: 'hidden',
  },
  form: {
    width: '100%',
    padding: 5,
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
    justifyContent: 'center',
  },
});

export default styles;
