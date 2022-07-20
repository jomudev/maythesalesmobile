import React from 'react';
import AddProducto from '../../components/AddComponents/addProducto';
import AddServicio from '../../components/AddComponents/addServicio';
import AddCliente from '../../components/AddComponents/addCliente';
import AddProveedor from '../../components/AddComponents/addProveedor';

const SelectAddComponent = ({type}) => 
{
    const types = {
        productos: <AddProducto />,
        servicios: <AddServicio />,
        clientes: <AddCliente />,
        proveedores: <AddProveedor />,
    };

    return types[type];
}

export default SelectAddComponent;
