/* eslint-disable react-native/no-inline-styles */
/**
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import {FormOptions} from './data';
import Icon from 'react-native-vector-icons/MaterialIcons';
import modalContent from './modalComponents/modalContent';
import styles from './styles';

const FormInventario = () => {
  const [modalValue, setModalValue] = useState({
    type: '',
    mode: null,
    visible: false,
  });
  return (
    <View style={styles.form}>
      <View
        style={styles.centeredView}
        onPress={() => setModalValue({visible: false})}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalValue.visible}>
          <View style={styles.centeredView}>
            <View style={[styles.modalView, {borderTopRightRadius: 20}]}>
              {modalContent(modalValue, setModalValue)}
            </View>
          </View>
        </Modal>
      </View>
      {FormOptions.map((item, index) => (
        <TouchableOpacity
          key={item + index}
          style={styles.ventaBtn}
          onPress={() =>
            setModalValue({type: item.funcType, mode: 'ADD', visible: true})
          }>
          <Icon name={item.icon} size={36} color="#5d80b6" />
          <Text style={styles.btnFormText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
      <Text>p/u: por unidad - p/m: por mayoria</Text>
    </View>
  );
};

const Inventario = () => {
  const [modalValue, setModalValue] = useState({type: '', visible: false});
  return (
    <View style={styles.form}>
      <View
        style={styles.centeredView}
        onPress={() => setModalValue({visible: false})}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalValue.visible}>
          <View style={styles.centeredViewShowData}>
            <View style={styles.modalViewShowData}>
              {modalContent(modalValue, setModalValue)}
            </View>
          </View>
        </Modal>
      </View>
      {FormOptions.map((item, index) => (
        <TouchableOpacity
          key={index + item}
          style={styles.ventaBtn}
          onPress={() =>
            setModalValue({type: item.type, mode: 'SHOW', visible: true})
          }>
          <Icon name={item.icon} size={36} color="#5d80b6" />
          <Text style={styles.btnFormText}>{item.type}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export {FormInventario, Inventario};
