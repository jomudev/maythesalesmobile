import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 32,
    backgroundColor: 'white',
  },
  emptyListContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    paddingVertical: 8,
    color: 'gray',
    fontSize: 12,
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  totalText: {
    fontSize: 16,
    flex: 1,
    textAlign: 'left',
    fontWeight: 'bold',
  },
});

export default styles;
