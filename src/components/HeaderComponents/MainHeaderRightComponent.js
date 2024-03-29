/* eslint-disable react-native/no-inline-styles */
import React from 'react';
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
import {TextBox} from '../auxComponents';
import PopupMenu from '../PopupMenu';
import auth from '@react-native-firebase/auth';
import Listener from '../../utils/listener';

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
  alertContainer: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertIcon: {
    backgroundColor: 'red',
    borderRadius: 10,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const contextMenuFunction = (index, optionsList) => {
  if (index !== undefined) {
    optionsList[index].onPress();
  }
};

const getCartActivity = (productos, servicios) => {
  if (productos > -1 || servicios > -1) {
    return productos + servicios;
  }
  return store.getState().cart.productos.length + store.getState().cart.servicios.length;
}

const MainHeaderRightComponent = (props) => {
  const [searchIcon, setSearchIcon] = React.useState('magnify');
  const [cartActivity, setCartActivity] = React.useState(getCartActivity());
  let popupMenuRef = React.createRef();
  const routeName = props.route.name;
  const navigation = props.navigation;

  Listener.propertyValueChanges(store.getState().cart, "productos", (prevVal, newVal) => {
      setCartActivity(getCartActivity(newVal.length, store.getState().cart.servicios.length));
  });
  
  Listener.propertyValueChanges(store.getState().cart, "servicios", (prevVal, newVal) => {
      setCartActivity(getCartActivity(newVal.length, store.getState().cart.productos.length));
  });


  const alerts = (type, condition) => {
    let iconName;
    switch (type) {
      case 'configuration' : 
        if (!condition) {
          iconName = "alert-circle";
        } else {
          return null;
        }
        break;
      case 'cart' :
        if (condition) {
          return (
            <View style={styles.alertContainer}>
              <View style={styles.alertIcon}>
                  <Text style={styles.badgeText}>{cartActivity}</Text>
              </View>
            </View>
          )
        }
    }

    return (
      <View style={styles.alertContainer}>
        <Icon name={iconName} color="red" size={20} />
      </View>
    )
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
              <Icon name="cart-outline" size={24} />
              {
                alerts('cart', getCartActivity())
              }
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.configButtonNavigator}
          onPress={() => navigation.navigate('Configuration')}>
          <View>
            <Icon name="cog-outline" size={24} />
            {
              alerts('configuration', auth().currentUser.emailVerified)
            }
          </View>
        </TouchableOpacity>
      </View>
    );
  } else if (routeName === 'Cart') {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {cartActivity > 0 ? (
          <ContextMenu
            {...props}
            title="Opciones del carrito"
            optionsList={[
              {
                text: 'Vaciar carrito de ventas',
                onPress: () => {
                  store.getState().cart.reset();
                },
              },
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
