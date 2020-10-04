/* eslint-disable react-native/no-inline-styles */

/**
 * @var {user} Object = Datos de sesion del usuario.
 * @var {userData} Object = Datos e información del usuario.
 */
import React, {useState, useEffect} from 'react';
import {View, Image, StatusBar} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Title, Caption, Drawer} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './draweStyles';
import store from '../../../store';
import auth from '@react-native-firebase/auth';

async function signOut() {
  try {
    return await auth().signOut();
  } catch (e) {
    console.log(e, 'signout error');
  }
}

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
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={{fontWeight: 'bold'}}>{user.displayName}</Title>
                <Caption style={{fontWeight: 'bold'}}>
                  {userData.negocio}
                </Caption>
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
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="scanner" color={color} size={size} />
              )}
              label="Scanner"
              onPress={() => props.navigation.navigate('CamScanner')}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="settings" color={color} size={size} />
              )}
              label="Configuracion"
              onPress={() => props.navigation.navigate('Configuracion')}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Cerrar sesion"
          onPress={() => signOut().catch(err => console.log('error', err))}
        />
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;
