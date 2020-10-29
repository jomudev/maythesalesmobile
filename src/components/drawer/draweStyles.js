import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  signButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#efefef',
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#5d80b6',
    paddingVertical: 15,
    width: '90%',
    borderRadius: 4,
    alignSelf: 'center',
    margin: 5,
  },
  Separator: {
    padding: 0,
    width: 300,
    marginVertical: 5,
  },
  loginBG: {
    resizeMode: 'center',
    height: '30%',
  },
  textInput: {
    backgroundColor: 'rgb(250,250,250)',
    borderRadius: 4,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 4,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 5,
    paddingHorizontal: 10,
    margin: 6,
    alignSelf: 'center',
  },
  userSection: {
    flexDirection: 'row',
    marginTop: -10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 15,
  },
  avatar: {
    color: '#555',
    backgroundColor: '#f7f8f9',
    fontSize: 32,
  },
  userInfo: {
    position: 'relative',
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
});

export default styles;
