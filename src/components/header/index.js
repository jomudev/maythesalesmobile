import React, {useState, useEffect} from 'react';
import {View, StyleSheet, SafeAreaView, Text, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import store from '../../../store';

const Header = ({navigation}) => {
  const [nombreNegocio, setNombreNegocio] = useState("Maythe's Sales");
  useEffect(() => {
    const subscriber = store.subscribe(() => {
      if (!nombreNegocio.includes(store.getState().negocio)) {
        setNombreNegocio(store.getState().negocio);
      }
    });
    return subscriber;
  }, []);
  return (
    <SafeAreaView style={styles.header}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <View style={styles.headerComponents}>
        <View style={styles.headerLeftComponent}>
          <Icon
            onPress={() => {
              navigation.toggleDrawer();
            }}
            name="menu"
            color="white"
            size={28}
          />
        </View>
        <View style={styles.centerComponent}>
          <Text style={styles.headerTitle}>{nombreNegocio}</Text>
        </View>
        <View style={styles.headerRightComponent} />
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerComponents: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 20,
  },
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center',
  },
  centerComponent: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLeftComponent: {
    width: '25%',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRightComponent: {
    width: '25%',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: '10%',
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
