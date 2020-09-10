import React from 'react';
import {View, Modal} from 'react-native';
import AddCliente from '../modalComponents/addCliente';
import AddProducto from '../modalComponents/addProducto';
import AddProveedor from '../modalComponents/addProveedor';
import AddServicio from '../modalComponents/addServicio';
import styles from './styles';

const AddComponent = ({type, setAddData}) => {
  const ModalContent = () => {
    switch (type) {
      // Componenetes para agregar al Inventario
      case 'Clientes':
        return <AddCliente setModalValue={setAddData} />;
      case 'Productos':
        return <AddProducto setModalValue={setAddData} />;
      case 'Servicios Adicionales':
        return <AddServicio setModalValue={setAddData} />;
      case 'Proveedores':
        return <AddProveedor setModalValue={setAddData} />;
    }

    return null;
  };

  return (
    <>
      <View style={styles.centeredViewModal}>
        <Modal animationType="slide" transparent={true} visible={true}>
          <View style={styles.centeredViewModal}>
            <View style={styles.modalView}>
              <ModalContent />
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default AddComponent;
