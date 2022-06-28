/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import authStyles from './auth/authStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import buttonStyles from './AddComponents/styles';
import {Picker} from '@react-native-picker/picker';

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
          color="#101e5a"
          style={authStyles.showPasswordIcon}
          onPress={toggleShowPassword}
        />
      </View>
    </View>
  );
};

const TextBox = (props) => {
  let {style, Ref, isTextArea} = props;
  return (
    <TextInput
      underlineColorAndroid="transparent"
      {...props}
      style={{
        backgroundColor: '#e6e8f1',
        paddingHorizontal: 16,
        borderRadius: 100,
        textAlignVertical: isTextArea ? 'top' : 'auto',
        ...style,
      }}
      spellCheck={true}
      ref={Ref}
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

class Group extends React.Component {
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
}

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

const HelpMessage = ({helpMessages, closeHelpMassage}) => {
  const [selectedHelpMessage, setSelectedHelpMessage] = useState(0);

  const changeCarouselItem = (type, prevValue, setNewValue) => {
    let newValue = 0;
    if (type === 'next') {
      newValue = prevValue + 1;
    } else {
      newValue = prevValue - 1;
    }
    setNewValue(newValue);
  };

  return (
    <View style={styles.helpMessageContainer}>
      <TouchableOpacity
        style={styles.helpMessageCloseButton}
        onPress={closeHelpMassage}>
        <Icon name="close" size={24} color="red" />
      </TouchableOpacity>
      <Text style={{textAlign: 'center', top: 10, fontSize: 18}}>Tutorial</Text>
      <View style={styles.helpMessageCarousel}>
        {helpMessages.map((data) => (
          <CarouselItem
            selectedHelpMessage={selectedHelpMessage}
            key={data.id}
            data={data}
          />
        ))}
        {selectedHelpMessage > 0 ? (
          <TouchableOpacity
            onPress={() =>
              changeCarouselItem(
                'prev',
                selectedHelpMessage,
                setSelectedHelpMessage,
              )
            }
            style={{...styles.helpMessageCarouselArrow, left: 5}}>
            <Icon name="chevron-left" size={48} color="#e6e8f1" />
          </TouchableOpacity>
        ) : null}
        {selectedHelpMessage < helpMessages.length - 1 ? (
          <TouchableOpacity
            onPress={() =>
              changeCarouselItem(
                'next',
                selectedHelpMessage,
                setSelectedHelpMessage,
              )
            }
            style={{...styles.helpMessageCarouselArrow, right: 5}}>
            <Icon name="chevron-right" size={48} color="#e6e8f1" />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.carouselIndicatorContainer}>
        {helpMessages.map((data) => (
          <Icon
            key={data.id * -1}
            name={
              selectedHelpMessage === data.id
                ? 'checkbox-blank-circle'
                : 'checkbox-blank-circle-outline'
            }
            color="#101e5a"
            size={16}
          />
        ))}
      </View>
    </View>
  );
};

export {
  PasswordInput,
  TextBox,
  Button,
  Select,
  Group,
  HelpMessage,
};

const styles = StyleSheet.create({
  imageLoading: {
    alignSelf: 'center',
    position: 'absolute',
    top: '45%',
    left: '45%',
  },
});
