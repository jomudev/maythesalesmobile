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

const Header = ({navigation}) => {
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
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center',
  },
  centerComponent: {
    height: '100%',
    justifyContent: 'center',
    textAlign: 'center',
    flex: 2,
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
    backgroundColor: '#101e5a',
    elevation: 5,
  },
});
