import React, {useState} from 'react';
import authStyles from './auth/authStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, TextInput} from 'react-native';

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
      <TextInput
        {...props}
        secureTextEntry={!showPassword}
        ref={props.passRef}
      />
      <Icon
        name={icon}
        size={24}
        style={authStyles.showPasswordIcon}
        onPress={toggleShowPassword}
      />
    </View>
  );
};

const TextBox = (props) => {
  return <TextInput {...props} underlineColorAndroid={'#acbdd3'} />;
};

export {PasswordInput, TextBox};
