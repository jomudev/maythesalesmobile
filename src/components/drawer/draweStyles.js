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
  drawerUserBg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    position: 'absolute',
    borderWidth: 1,
    height: '100%',
    width: '100%',
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
    height: 150,
    flexDirection: 'row',
    marginTop: -10,
  },
  userInfo: {
    marginLeft: 5,
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
