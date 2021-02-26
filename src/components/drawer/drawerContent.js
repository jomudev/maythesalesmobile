/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Title, Caption, Avatar, Drawer} from 'react-native-paper';
import store from '../../../store';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './draweStyles';
import auth from '@react-native-firebase/auth';
import {db} from '../mainFunctions';

async function signOut() {
  try {
    store.dispatch({
      type: 'SIGN_OUT',
    });
    return await auth().signOut();
  } catch (e) {
    console.log(e, 'signout error');
  }
}

const DrawerContent = (props) => {
  const user = auth().currentUser;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = db().onSnapshot((snap) => {
      setUserData(snap.data());
    });
    return unsubscribe;
  }, []);

  return (
    <View style={{flex: 1, height: '100%'}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          {user && userData ? (
            <View style={styles.userSection}>
              <View style={styles.userInfo}>
                <View style={{marginLeft: 15, flexDirection: 'column'}}>
                  {user.displayName && (
                    <Title style={{fontWeight: 'bold'}}>
                      {user.displayName}
                    </Title>
                  )}
                  {userData ? (
                    <Caption style={{fontWeight: 'bold'}}>
                      {userData ? userData.negocio : ''}
                    </Caption>
                  ) : null}
                  {userData ? (
                    <Caption style={{fontWeight: 'bold'}}>{user.email}</Caption>
                  ) : null}
                </View>
              </View>
            </View>
          ) : null}
          <Drawer.Section renderToHardwareTextureAndroid>
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
            <Icon name="logout" color={color} size={size} />
          )}
          label="Cerrar sesion"
          onPress={() =>
            signOut()
              .then(() => store.dispatch({type: 'SIGNOUT'}))
              .catch((err) => console.log('error', err))
          }
        />
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;
