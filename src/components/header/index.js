import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Header = ({navigation}) => {
  return (
    <SafeAreaView style={styles.header}>
      <View style={styles.headerComponents}>
        <TouchableOpacity
          style={styles.headerLeftComponent}
          onPress={() => {
            navigation.toggleDrawer();
          }}>
          <Icon name="menu" color="#101e5a" size={28} />
        </TouchableOpacity>
        <View style={styles.headerCenterComponent}>
          <Text style={styles.headerTitle}>Inicio</Text>
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
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#101e5a',
  },
  headerCenterComponent: {
    height: '100%',
    justifyContent: 'center',
    textAlign: 'center',
    flex: 3,
  },
  headerLeftComponent: {
    height: '100%',
    justifyContent: 'center',
    padding: 10,
    flex: 1,
  },
  headerRightComponent: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 5,
  },
});
