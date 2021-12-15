/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import store from '../../../store';
import {clearStoreCart} from '../cartComponents/functions';
import {TextBox} from '../auxComponents';
import PopupMenu from '../PopupMenu';
import auth from '@react-native-firebase/auth'

const styles = StyleSheet.create({
  cartButtonNavigationBadge: {
    position: 'absolute',
    right: 0,
    top: -8,
    backgroundColor: '#434588',
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    borderRadius: 100,
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  configButtonNavigator: {
    paddingHorizontal: 8,
  },
  cartButtonNavigator: {
    paddingHorizontal: 8,
  },
});

const contextMenuFunction = (index, optionsList) => {
  if (index !== undefined) {
    optionsList[index].onPress();
  }
};

/*const getActualSale = () => {
  const appState = store.getState();
  return {
    productos: appState.cartProducts,
    servicios: appState.cartServices,
    estado: appState.saleState,
    mayorista: appState.cartWholesaler,
    cliente: appState.cartClient,
    timestamp: Date.now(),
  };
};*/

const getCartActivity = () =>
  store.getState().cartProducts.length + store.getState().cartServices.length;

const MainHeaderRightComponent = (props) => {
  const [searchIcon, setSearchIcon] = useState('magnify');
  const [cartActivity, setCartActivity] = useState(getCartActivity());
  let popupMenuRef = React.createRef();
  const routeName = props.route.name;
  const navigation = props.navigation;
  
  const alerts = (type) => {
    var pendingAlertExist = false

    switch (type) {
      case 'configuration' : 
        if (!auth().currentUser.emailVerified) {
          pendingAlertExist = true
        }

        return pendingAlertExist ? (
          <View style={styles.alertContainer}>
            <Icon name="alert-circle" color="red" size={20} />
          </View>
        ) : null

      case 'cart' :
        
    }
  }

  const ContextMenu = ({tintColor, optionsList, title}) => {
    return (
      <View>
        <TouchableWithoutFeedback onPress={() => popupMenuRef.show()}>
          <Icon
            style={{padding: 16}}
            name="dots-vertical"
            size={28}
            color={tintColor}
          />
        </TouchableWithoutFeedback>
        <PopupMenu
          ref={(ref) => (popupMenuRef = ref)}
          title={title || 'Opciones'}
          function={(index) => contextMenuFunction(index, optionsList)}
          options={optionsList.map((item) => item.text)}
          onTouchOutside={() => popupMenuRef.close()}
        />
      </View>
    );
  };

  useEffect(() => {
    const storeUnsubscribe = store.subscribe(() => {
      setCartActivity(getCartActivity());
    });
    return () => {
      storeUnsubscribe();
    };
  }, []);
  if (routeName === 'ShowInventory') {
    return (
      <Icon
        name={searchIcon}
        color={props.tintColor}
        size={28}
        onPress={() => {
          if (searchIcon === 'magnify') {
            setSearchIcon('close');
            navigation.setOptions({
              headerTitle: () => (
                <TextBox
                  placeholder="Buscar..."
                  style={{backgroundColor: 'white'}}
                  autoFocus={true}
                  onChangeText={(text) =>
                    store.dispatch({type: 'SET_SEARCH', text})
                  }
                />
              ),
            });
          } else {
            setSearchIcon('magnify');
            store.dispatch({
              type: 'SET_SEARCH',
              text: '',
            });
            navigation.setOptions({
              headerTitle: routeName.split('Show').join(''),
            });
          }
        }}
        style={{padding: 16}}
      />
    );
  } else if (routeName === 'MainNavigator') {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          style={styles.cartButtonNavigator}
          onPress={() => navigation.navigate('Cart')}>
          <View>
            {cartActivity > 0 ? (
              <>
                <View style={styles.cartButtonNavigationBadge}>
                  <Text style={styles.badgeText}>{cartActivity}</Text>
                </View>
                <Icon name="cart" size={24} />
              </>
            ) : (   
              <Icon name="cart-outline" size={24} />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.configButtonNavigator}
          onPress={() => navigation.navigate('Configuration')}>
          <View>
            <Icon name="cog-outline" size={24} />
            {
              alerts()
            }
          </View>
        </TouchableOpacity>
      </View>
    );
  } else if (routeName === 'Cart') {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {/*}<TouchableOpacity
          style={styles.configButtonNavigator}
          onPress={() => navigation.navigate('SecludedSales')}>
          <Icon name="cart-arrow-right" size={24} />
        </TouchableOpacity>{*/}
        {cartActivity > 0 ? (
          <ContextMenu
            {...props}
            title="Opciones del carrito"
            optionsList={[
              {
                text: 'Vaciar carrito de ventas',
                onPress: () => {
                  clearStoreCart().then(() => {
                    ToastAndroid.show(
                      'El carrito de ventas fue limpiado',
                      ToastAndroid.SHORT,
                    );
                  });
                },
              },
              /*{
                text: 'Apartar Venta',
                onPress: () => {
                  store.dispatch({
                    type: 'SET_ASIDE_SALE',
                    data: getActualSale(),
                  });
                  clearStoreCart().then(() => {
                    ToastAndroid.show(
                      'Venta Apartada, revisa la pantalla de ventas apartadas para poder visualizarla...',
                      ToastAndroid.LONG,
                    );
                  });
                },
              },*/
            ]}
          />
        ) : null}
      </View>
    );
  } else {
    return null;
  }
};

export default MainHeaderRightComponent;
