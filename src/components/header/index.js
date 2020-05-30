import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import store from '../../../store';

const Header = ({navigation}) => {
  const [title, setTitle] = useState('Maythe´s Sales');
  const [user, setUser] = useState(null);

  store.subscribe(() => {
    if (store.getState().title) {
      setTitle(store.getState().title);
    } else {
      setTitle('Maythe´s Sales');
    }
    if (store.getState().user) {
      setUser(store.getState().user);
    }
  });

  if (user) {
    return (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Header</Text>
      </View>
    );
  }
  return (
    <View style={styles.header}>
      <Icon
        style={styles.headerLeftComponent}
        onPress={() => {
          navigation.toggleDrawer();
        }}
        name="menu"
        color="white"
        size={24}
      />
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  headerLeftComponent: {
    position: 'absolute',
    left: 20,
    padding: 10,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#101e5a',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  },
});
