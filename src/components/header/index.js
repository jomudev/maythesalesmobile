import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';
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
    return subscriber();
  }, [nombreNegocio]);
  return (
    <SafeAreaView style={styles.header}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <View style={styles.headerComponents}>
        <TouchableOpacity
          style={styles.headerLeftComponent}
          onPress={() => {
            navigation.toggleDrawer();
          }}>
          <Icon name="menu" color="white" size={28} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, styles.centerComponent]}>{nombreNegocio}</Text>
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
    height: '100%',
    textAlignVertical: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  headerLeftComponent: {
    width: '25%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  headerRightComponent: {
    width: '25%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: '10%',
    flexDirection: 'row',
    backgroundColor: '#101e5a',
    elevation: 5,
  },
});
