import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 32,
  },
  separator: {
    height: 8,
  },
  yearItem: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 24,
    flexDirection: 'column',
  },  
  totalText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  heading6: {
    fontSize: 12,
    color: '#999',
  },
  textCenter: {
    textAlign: 'center',
  },
  actualYear: {
    borderWidth: 3,
    borderColor: '#9CB1D3',
    backgroundColor: '#EEF0FC',
  },
  actualYearText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  itemHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  itemBody: {
    flex: 1,
    flexDirection: 'row',
  },
  itemCol1: {
    flex: 1,
  },
  itemCol2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemSubtitle: {
    fontSize: 12,
    color: '#999',
  },
});

export default styles;
