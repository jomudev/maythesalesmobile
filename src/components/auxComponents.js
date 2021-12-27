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
        ...style,
        backgroundColor: style ? style.backgroundColor && '#e6e8f1' : '#e6e8f1',
        marginVertical: 4,
        marginHorizontal: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        textAlignVertical: isTextArea ? 'top' : 'auto',
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

const RenderImage = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const {source, priority} = props;

  if (source) {
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
            ...source,
            priority: priority ? priority : FastImage.priority.normal,
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
class ContextMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      position: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
    };
  }

  close = () => {
    this.setState({
      show: false,
    });
  };

  show = (position) => {
    this.setState({
      position: position || this.state.position,
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
    const {show, position} = this.state;
    const {onTouchOutside, optionsList} = this.props;
    return (
      <Modal
        visible={show}
        animationType="fade"
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
              top: position.y + position.height - 30,
              right: 20,
            }}>
            {optionsList.map(({text, onPress}) => (
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

const CarouselItem = ({data, selectedHelpMessage}) => (
  <View
    style={
      selectedHelpMessage === data.id
        ? styles.selectedCarouseItem
        : styles.nonSelectedCarouselItem
    }>
    <View style={styles.helpMessageIconContainer}>
      <Icon name={data.icon} size={24} style={styles.helpMessageIcon} />
    </View>
    <View style={styles.helpMessageTitleContainer}>
      <Text style={styles.helpMessageTitleText}>{data.title}</Text>
    </View>
    <View style={styles.helpMessageBodyContainer}>
      <Text style={styles.helpMessageBodyText}>{data.body}</Text>
    </View>
  </View>
);

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
  RenderImage,
  Select,
  ContextMenu,
  Group,
  HelpMessage,
};

const styles = StyleSheet.create({
  imageLoading: {
    alignSelf: 'center',
    position: 'absolute',
    top: '45%',
  },
  helpMessageContainer: {
    zIndex: 1000,
    elevation: 15,
    position: 'absolute',
    left: '50%',
    bottom: '10%',
    transform: [{translateX: -200}],
    backgroundColor: 'white',
    width: 400,
    height: 400,
    overflow: 'scroll',
    borderRadius: 8,
    flexDirection: 'column',
  },
  helpMessageTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  helpMessageCloseButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  helpMessageTitleText: {
    fontSize: 28,
    textAlignVertical: 'bottom',
    bottom: 0,
  },
  helpMessageBodyContainer: {
    flex: 3,
    paddingHorizontal: 56,
  },
  helpMessageBodyText: {
    fontSize: 24,
    textAlign: 'justify',
  },
  helpMessageIconContainer: {
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#e6e8f1',
    padding: 16,
    alignSelf: 'center',
    marginTop: 16,
  },
  helpMessageIcon: {
    fontSize: 100,
    color: '#101e5a',
  },
  selectedCarouseItem: {
    flex: 1,
  },
  carouselIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 10,
  },
  nonSelectedCarouselItem: {
    display: 'none',
  },
  helpMessageCarousel: {
    position: 'relative',
  },
  helpMessageCarouselArrow: {
    position: 'absolute',
    top: '50%',
  },
  contextMenu: {
    paddingVertical: 8,
    elevation: 30,
  },
  contextMenuOption: {
    padding: 8,
    backgroundColor: '#ffff',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  contextMenuOptions: {
    flexDirection: 'column',
    backgroundColor: '#ffff',
    width: '50%',
    borderRadius: 2,
    paddingVertical: 8,
    elevation: 30,
    position: 'absolute',
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
