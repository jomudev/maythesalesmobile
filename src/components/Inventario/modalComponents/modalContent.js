import React from 'react';
import AddCliente from './addCliente';
import AddProducto from './addProducto';
import AddServicio from './addServicio';
import AddProveedor from './addProveedor';
import ShowComponent from './showInformacion';

const modalContent = (modal, setModalValue) => {
  if (modal.mode === 'ADD') {
    switch (modal.type) {
      // Componenetes para agregar al Inventario
      case 'ADD_CLIENT':
        return <AddCliente setModalValue={setModalValue} />;
      case 'ADD_PRODUCT':
        return <AddProducto setModalValue={setModalValue} />;
      case 'ADD_SERVICE':
        return <AddServicio setModalValue={setModalValue} />;
      case 'ADD_PROVIDER':
        return <AddProveedor setModalValue={setModalValue} />;
      // Componentes para mostrar la info. del invtario.
    }
  } else if (modal.mode === 'SHOW') {
    return <ShowComponent setModalValue={setModalValue} type={modal.type} />;
  }
};

export default modalContent;
