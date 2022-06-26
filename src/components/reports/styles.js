import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 32,
  },
  button: {
    padding: 24,
    width: '100%',
  },
  separator: {
    height: 8,
  },
  yearItem: {
    backgroundColor: '#fff',
    borderRadius: 24,
    flexDirection: 'column',
    overflow: 'hidden',
  },  
  monthItem: {
    backgroundColor: '#fff',
    padding: 24,
    flexDirection: 'column',
    paddingVertical: 16,
  },
  heading1: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  heading2: {
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
  itemRow: {
    flex: 1,
    flexDirection: 'row',
  },
  itemCol: {
    flex: 1,
    flexDirection: 'column',
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
