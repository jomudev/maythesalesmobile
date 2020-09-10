/* eslint-disable react-native/no-inline-styles */

/**
 * @var {user} Object = Datos de sesion del usuario.
 * @var {userData} Object = Datos e información del usuario.
 */
import React, {useState, useEffect} from 'react';
import {View, Image, StatusBar} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar, Title, Caption, Drawer} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './draweStyles';
import store from '../../../store';
import auth from '@react-native-firebase/auth';

const DrawerContent = props => {
  const [user, setUser] = useState(store.getState().user);
  const [userData, setUserData] = useState(store.getState().userData);
  useEffect(() => {
    const subscriber = store.subscribe(() => {
      const state = store.getState();
      state.userData
        ? setUser(state.user) && setUserData(state.userData)
        : null;
    });
    return subscriber();
  }, []);

  return (
    <View style={{flex: 1, height: '100%'}}>
      <StatusBar barStyle="light-content" backgroundColor="#101e5a" />
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userSection}>
            <Image
              style={styles.drawerUserBg}
              source={require('../../assets/AditionalMedia/maythesalesBG.png')}
            />
            <View style={styles.userInfo}>
              <Avatar.Image
                source={{
                  uri:
                    'https://firebasestorage.googleapis.com/v0/b/maythes-sales-test.appspot.com/o/Media%2F822711_user_512x512.png?alt=media&token=af5a4b05-2ecc-4f41-8ee4-084f4cebe6bf',
                }}
              />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={{fontWeight: 'bold'}}>{user.displayName}</Title>
                <Caption style={{fontWeight: 'bold'}}>
                  {userData.negocio}
                </Caption>
              </View>
            </View>
          </View>
        </View>
        <Drawer.Section>
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="home" color={color} size={size} />
            )}
            label="Inicio"
            onPress={() => {
              props.navigation.navigate('Inicio');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="content-paste" color={color} size={size} />
            )}
            label="Reportes"
            onPress={() => {
              props.navigation.navigate('Reportes');
            }}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Cerrar sesion"
          onPress={() => auth().signOut()}
        />
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;
