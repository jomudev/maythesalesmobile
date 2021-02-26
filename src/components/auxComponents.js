/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import authStyles from './auth/authStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  Dimensions,
  Modal,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import buttonStyles from './AddComponents/styles';
import {Picker} from '@react-native-picker/picker';

const deviceHeight = Dimensions.get('window').height;

const PasswordInput = (props) => {
  const [icon, setIcon] = useState('eye');
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    if (icon === 'eye') {
      setIcon('eye-off');
      setShowPassword(true);
    } else {
      setIcon('eye');
      setShowPassword(false);
    }
  };

  return (
    <View style={authStyles.passwordView}>
      <TextBox {...props} secureTextEntry={!showPassword} Ref={props.passRef} />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Icon
          name={icon}
          size={24}
          style={authStyles.showPasswordIcon}
          onPress={toggleShowPassword}
        />
      </View>
    </View>
  );
};

const TextBox = (props) => {
  return (
    <TextInput
      maxFontSizeMultiplier={1.5}
      allowFontScaling={false}
      {...props}
      underlineColorAndroid={'#c0c6dd'}
      ref={props.Ref}
    />
  );
};

const Button = ({action, styles, text}) => {
  return (
    <TouchableOpacity
      style={[buttonStyles.btn, styles]}
      onPress={() => action()}>
      <Text style={{color: 'white', fontSize: 24}}>{text || 'Agregar'}</Text>
    </TouchableOpacity>
  );
};

const RenderImage = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  if (props.source) {
    return (
      <>
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color="#101e5a"
            style={styles.imageLoading}
          />
        ) : null}
        <FastImage
          {...props}
          source={{
            ...props.source,
            priority: FastImage.priority.normal,
            cache: FastImage.cacheControl.immutable,
          }}
          onLoadStart={() => setIsLoading(true)}
          onLoad={() => setIsLoading(false)}
        />
      </>
    );
  } else {
    return <Icon name="image-plus" style={styles.addImageIcon} />;
  }
};

class Group extends React.Component{
  render() {
    return (
      <View
        style={{
          flexDirection: this.props.direction,
          width: '100%',
          alignItems: 'center',
        }}>
        {this.props.children}
      </View>
    );
  }
};

const Select = ({items, onValueChange, selectedValue}) => {
  const [PickerValue, setPickerValue] = useState(selectedValue);
  return (
    <Picker
      selectedValue={PickerValue}
      style={styles.picker}
      itemStyle={styles.pickerItem}
      onValueChange={(itemValue, index) => {
        onValueChange(itemValue, index);
        setPickerValue(itemValue);
      }}>
      {items.map(function (item) {
        return (
          <Picker.Item
            key={`${Math.random()}`}
            label={item.label}
            value={item.value}
          />
        );
      })}
    </Picker>
  );
};
class ContextMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
  }

  close = () => {
    this.setState({
      show: false,
    });
  };

  show = () => {
    this.setState({
      show: true,
    });
  };

  renderOutsideTouchable = (onTouch) => {
    const view = <View style={{flex: 1, width: '100%'}} />;
    if (!onTouch) {
      return view;
    }

    return (
      <TouchableWithoutFeedback
        onPress={onTouch}
        style={{flex: 1, width: '100%'}}>
        {view}
      </TouchableWithoutFeedback>
    );
  };

  render() {
    const {show} = this.state;
    const {onTouchOutside, optionsList} = this.props;
    return (
      <Modal
        visible={show}
        animationType="slide"
        transparent={true}
        onRequestClose={this.close}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#00000000',
            justifyContent: 'flex-end',
          }}>
          {this.renderOutsideTouchable(onTouchOutside)}
          <View
            style={{
              ...styles.contextMenuOptions,
              maxHeight: deviceHeight * 0.4,
            }}>
            {optionsList.map(({iconName, text, onPress}) => (
              <TouchableOpacity
                key={iconName + text}
                onPress={() => {
                  this.close();
                  onPress();
                }}
                style={styles.contextMenuOption}>
                <View style={styles.contextMenuIcons}>
                  {iconName ? <Icon name={iconName} size={24} /> : null}
                </View>
                <Text style={styles.contextMenuOptionText}>{text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    );
  }
}

export {
  PasswordInput,
  TextBox,
  Button,
  RenderImage,
  Select,
  ContextMenu,
  Group,
};
const styles = StyleSheet.create({
  imageLoading: {
    alignSelf: 'center',
    position: 'absolute',
    top: '45%',
  },
  contextMenu: {
    paddingVertical: 8,
    elevation: 30,
  },
  contextMenuOption: {
    padding: 8,
    backgroundColor: '#e6e8f1',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
  },
  contextMenuOptions: {
    flexDirection: 'column',
    backgroundColor: '#e6e8f1',
    width: '100%',
    paddingVertical: 8,
    elevation: 30,
  },
  contextMenuIcons: {
    alignItems: 'center',
    borderRadius: 100,
    justifyContent: 'center',
    marginRight: 8,
    width: 32,
    height: 32,
    backgroundColor: 'white',
  },
  contextMenuOptionText: {
    fontSize: 16,
  },
});
