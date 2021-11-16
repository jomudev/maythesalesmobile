import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
    fontSize: 16,
  },
  total: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  totalText: {
    fontSize: 16,
    flex: 1,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  totalValue: {
    flex: 1,
    textAlign: 'right',
  }
});

export default styles;
