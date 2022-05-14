import React from 'react';
import {
  View,
  Modal,
  Animated,
  Pressable,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './styles';

export default class PopupMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      bottom: new Animated.Value(-1000),
    };
  }

  show = () => {
    this.setState({
      showModal: true,
    });
    Animated.timing(this.state.bottom, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  close = () => {
    Animated.timing(this.state.bottom, {
      toValue: -1000,
      duration: 800,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      this.setState({
        showModal: false,
      });
    }, 100);
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
    const {showModal, bottom} = this.state;
    const {onTouchOutside, title, options} = this.props;
    return (
      <Modal
        statusBarTranslucent={true}
        visible={showModal}
        animationType="fade"
        transparent={true}
        onRequestClose={this.close}>
        <View style={styles.modalView}>
          {this.renderOutsideTouchable(onTouchOutside)}
          <Animated.View style={{...styles.modalPopupMenu, bottom}}>
            <Text style={styles.popupMenuTitle}>{title}</Text>
            {options.map((option, index) => (
              <Pressable
                style={styles.modalOptionItem}
                key={option}
                onPress={() => {
                  this.props.function(index);
                  this.close();
                }}>
                <Text style={{fontSize: 16, textAlign: 'center'}}>{option}</Text>
              </Pressable>
            ))}
          </Animated.View>
        </View>
      </Modal>
    );
  }
}
