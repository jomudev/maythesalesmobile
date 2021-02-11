/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import authStyles from './auth/authStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import buttonStyles from './AddComponents/styles';

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
      underlineColorAndroid={'#acbdd3'}
      ref={props.Ref}
    />
  );
};

const Button = ({action, additionalStyles, text}) => {
  return (
    <View style={{flexDirection: 'row', alignSelf: 'center'}}>
      <TouchableOpacity
        style={[buttonStyles.btn, additionalStyles ? additionalStyles : null]}
        onPress={() => action()}>
        <Text style={{color: 'white', fontSize: 24}}>{text || 'Agregar'}</Text>
      </TouchableOpacity>
    </View>
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
        <Image
          {...props}
          onLoadStart={() => setIsLoading(true)}
          onLoad={() => setIsLoading(false)}
        />
      </>
    );
  } else {
    return <Icon name="image-plus" style={styles.addImageIcon} />;
  }
};

export {PasswordInput, TextBox, Button, RenderImage};

const styles = StyleSheet.create({
  imageLoading: {
    alignSelf: 'center',
    position: 'absolute',
    top: '45%',
  },
});
