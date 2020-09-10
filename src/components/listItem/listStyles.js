import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomColor: '#ddd',
  },
  listItem: {
    margin: 10,
    elevation: 2,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#fff',
  },
  itemHeader: {
    borderBottomColor: '#ccc',
  },
  itemTitleText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default styles;
