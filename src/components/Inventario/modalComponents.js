/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/**
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const products = firestore().collection('productos');
const clients = firestore().collection('clientes');
const services = firestore().collection('servicios_adicionales');
const providers = firestore().collection('proveedores');

// METODOS
const randomId = (letrasLength, numLength) => {
  // Crear una id con 4 letras y 6 digitos del 0 al 9

  let id = '';
  // numero aleatorio entre maximo y minimo
  const randomNum = (max, min) => {
    return Math.floor(Math.random() * (max - min) + min);
  };
  // obtenemos las letras aleatorias y las añadimos al id
  for (let i = 0; i < letrasLength; i++) {
    let r = Math.random() * (62 - 10) + 10;
    id += String.fromCharCode((r += r > 9 ? (r < 36 ? 55 : 61) : 48));
  }

  //obtenemos los numeros aleatorios y los añadimos a la id
  for (let j = 0; j < numLength; j++) {
    id += randomNum(10, 0).toString();
  }

  // retornamos el id
  return id;
};

const save = (type, data, clean) => {
  if (type === 'product') {
    if (data.nombre === '' || cantidad < 0) {
      alert('Ingresa todos los datos correctamente');
      return;
    }

    products
      .doc(data.nombre)
      .set({
        pid: randomId(),
        nombre: data.nombre,
        cantidad: parseInt(data.cantidad),
        proveedor: data.proveedor,
        costoP_U: parseInt(data.costoP_U),
        costoP_M: parseInt(data.costoP_M),
        ventaP_U: parseInt(data.ventaP_U),
        ventaP_M: parseInt(data.ventaP_M),
        descripcion: data.descripcion,
      })
      .then(() => {
        clean();
      })
      .catch(err => {
        console.warn('error: ' + err.code);
      });
  }
  if (type === 'client') {
    const id = randomId(5, 10);
    clients
      .doc(id)
      .set({
        id,
        nombre: data.nombre,
        telefono: data.telefono,
        email: data.email,
        descripcion: data.descripcion,
      })
      .then(() => {
        clean();
      })
      .catch(err => {
        console.warn('error: ' + err.code);
      });
  }
  if (type === 'service') {
    const id = randomId(4, 6);
    services
      .doc(id)
      .set({
        id,
        nombre: data.nombre,
        cantidad: parseInt(data.cantidad, 10),
        proveedor: data.proveedor,
        costoP_U: parseInt(data.costoP_U, 10),
        costoP_M: parseInt(data.costoP_M, 10),
        ventaP_U: parseInt(data.ventaP_U, 10),
        ventaP_M: parseInt(data.ventaP_M, 10),
        descripcion: data.descripcion,
      })
      .then(() => {
        clean();
      })
      .catch(err => {
        console.warn('error: ' + err.code);
      });
  }
  if (type === 'provider') {
    const id = randomId(5, 10);
    providers
      .doc(id)
      .set({
        id,
        nombre: data.nombre,
        telefono: data.telefono,
        email: data.email,
        descripcion: data.descripcion,
      })
      .then(() => {
        clean();
      })
      .catch(err => {
        console.warn('error: ' + err.code);
      });
  }
};

// COMPONENTES PRIMARIOS
// Componentes para agregar al inventario
const AddClient: () => React$Node = ({setModalValue}) => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const clean = () => {
    setNombre('');
    setTelefono('');
    setEmail('');
    setDescripcion('');
  };

  return (
    <View>
      <View style={styles.form}>
        <Text style={styles.formTitle}>Agregar cliente</Text>
        <TextInput
          placeholder="Nombres ej. Daniela Andrade*"
          style={styles.txtInput}
          value={nombre}
          onChangeText={text => setNombre(text)}
        />
        <TextInput
          placeholder="Número de teléfono"
          keyboardType="numeric"
          style={styles.txtInput}
          value={telefono}
          onChangeText={text => setTelefono(text)}
        />
        <TextInput
          placeholder="Correo Electrónico"
          keyboardType="email-address"
          style={styles.txtInput}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          placeholder="Descripción"
          style={styles.txtInput}
          value={descripcion}
          onChangeText={text => setDescripcion(text)}
        />
      </View>
      <BtnGroup
        setModalValue={setModalValue}
        action={() =>
          save('client', {nombre, telefono, email, descripcion}, clean())
        }
      />
    </View>
  );
};

const AddProduct: () => React$Node = ({setModalValue}) => {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [proveedor, setProveedor] = useState('');
  const [costoP_U, setCostoP_U] = useState(0);
  const [costoP_M, setCostoP_M] = useState(0);
  const [ventaP_U, setVentaP_U] = useState(0);
  const [ventaP_M, setVentaP_M] = useState(0);
  const [descripcion, setDescripcion] = useState('');

  const clean = () => {
    setNombre('');
    setCantidad(0);
    setProveedor('');
    setCostoP_M(0);
    setCostoP_U(0);
    setVentaP_M(0);
    setVentaP_U(0);
    setDescripcion('');
  };

  return (
    <View>
      <View style={styles.form}>
        <ScrollView>
          <Text style={styles.formTitle}>Agregar producto</Text>
          <TextInput
            placeholder="Nombre del producto*"
            style={styles.txtInput}
            onChangeText={text => setNombre(text)}
            value={nombre}
          />

          <Text style={styles.txtMuted}>Cantidad*</Text>
          <TextInput
            style={styles.txtInput}
            keyboardType="number-pad"
            onChangeText={text => setCantidad(text)}
            value={cantidad.toString()}
          />

          <TextInput
            placeholder="Proveedor"
            style={styles.txtInput}
            onChangeText={text => setProveedor(text)}
            value={proveedor}
          />
          <Text style={styles.txtMuted}>Precio de costo por unidad*</Text>
          <TextInput
            style={styles.txtInput}
            keyboardType="number-pad"
            onChangeText={text => setCostoP_U(text)}
            value={costoP_U.toString()}
          />
          <Text style={styles.txtMuted}>Precio de costo por mayoreo*</Text>
          <TextInput
            placeholder="Precio de costo p/m*"
            keyboardType="number-pad"
            style={styles.txtInput}
            onChangeText={text => setCostoP_M(text)}
            value={costoP_M.toString()}
          />
          <Text style={styles.txtMuted}>Precio de venta por unidad*</Text>
          <TextInput
            keyboardType="number-pad"
            style={styles.txtInput}
            onChangeText={text => setVentaP_U(text)}
            value={ventaP_U.toString()}
          />
          <Text style={styles.txtMuted}>Precio de venta por mayoreo*</Text>
          <TextInput
            style={styles.txtInput}
            keyboardType="number-pad"
            onChangeText={text => setVentaP_M(text)}
            value={ventaP_M.toString()}
          />

          <TextInput
            placeholder="Descripción"
            style={styles.txtInput}
            onChangeText={text => setDescripcion(text)}
            value={descripcion}
          />
        </ScrollView>
      </View>
      <BtnGroup
        setModalValue={setModalValue}
        action={() =>
          save(
            'product',
            {
              nombre,
              cantidad,
              proveedor,
              costoP_M,
              costoP_U,
              ventaP_M,
              ventaP_U,
              descripcion,
            },
            clean(),
          )
        }
      />
    </View>
  );
};

const AddService: () => React$Node = ({setModalValue}) => {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [proveedor, setProveedor] = useState('');
  const [costoP_U, setCostoP_U] = useState(0);
  const [costoP_M, setCostoP_M] = useState(0);
  const [ventaP_U, setVentaP_U] = useState(0);
  const [ventaP_M, setVentaP_M] = useState(0);
  const [descripcion, setDescripcion] = useState('');

  const clean = () => {
    setNombre('');
    setCantidad(0);
    setProveedor('');
    setCostoP_M(0);
    setCostoP_U(0);
    setVentaP_M(0);
    setVentaP_U(0);
    setDescripcion('');
  };

  return (
    <View>
      <View style={styles.form}>
        <ScrollView>
          <Text style={styles.formTitle}>Agregar Servicio</Text>
          <TextInput
            placeholder="Nombre de servicio*"
            style={styles.txtInput}
            value={nombre}
            onChangeText={text => setNombre(text)}
          />
          <TextInput
            placeholder="Cantidad a agregar*"
            style={styles.txtInput}
            value={cantidad}
            onChangeText={text => setCantidad(cantidad)}
          />
          <TextInput
            placeholder="Proveedor"
            style={styles.txtInput}
            value={proveedor}
            onChangeText={text => setProveedor(text)}
          />
          <TextInput
            placeholder="Precio de costo p/u*"
            style={styles.txtInput}
            value={costoP_U}
            onChangeText={text => setCostoP_U(text)}
          />
          <TextInput
            placeholder="Precio de costo p/m*"
            style={styles.txtInput}
            value={costoP_M}
            onChangeText={text => setCostoP_M(text)}
          />
          <TextInput
            placeholder="Precio de venta p/u*"
            style={styles.txtInput}
            value={ventaP_U}
            onChangeText={text => setVentaP_U(text)}
          />
          <TextInput
            placeholder="Precio de venta p/m*"
            style={styles.txtInput}
            value={ventaP_M}
            onChangeText={text => setVentaP_M(text)}
          />
          <TextInput
            placeholder="Descripcion"
            numberOfLines={2}
            style={styles.txtInput}
            value={descripcion}
            onChangeText={text => setDescripcion(text)}
          />
        </ScrollView>
      </View>
      <BtnGroup
        setModalValue={setModalValue}
        action={() =>
          save(
            'service',
            {
              nombre,
              cantidad,
              proveedor,
              costoP_U,
              costoP_M,
              ventaP_U,
              ventaP_M,
              descripcion,
            },
            clean(),
          )
        }
      />
    </View>
  );
};

const AddProvider: () => React$Node = ({setModalValue}) => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const clean = () => {
    setNombre('');
    setTelefono('');
    setEmail('');
    setDescripcion('');
  };
  return (
    <>
      <View style={styles.form}>
        <ScrollView>
          <Text style={styles.formTitle}>Agregar Proveedor</Text>
          <TextInput
            placeholder="Nombre de Proveedor*"
            style={styles.txtInput}
            value={nombre}
            onChangeText={text => setNombre(text)}
          />
          <TextInput
            placeholder="Número de teléfono"
            keyboardType="numeric"
            style={styles.txtInput}
            value={telefono}
            onChangeText={text => setTelefono(text)}
          />
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            style={styles.txtInput}
            value={email}
            onChangeText={text => setEmail(email)}
          />
          <TextInput
            placeholder="Descripcion"
            style={styles.txtInput}
            value={descripcion}
            onChangeText={text => setDescripcion(text)}
          />
        </ScrollView>
      </View>
      <BtnGroup
        setModalValue={setModalValue}
        action={() =>
          save(
            'provider',
            {
              nombre,
              telefono,
              email,
              descripcion,
            },
            clean(),
          )
        }
      />
    </>
  );
};

// COMPONENTES SECUNDARIOS

const BtnGroup: () => ReactNode = ({setModalValue, action}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{float: 'left', width: 'auto'}}>
        <CancelBtn setModalValue={setModalValue} />
      </View>
      <View style={{float: 'right', width: 'auto'}}>
        <SuccesBtn setModalValue={setModalValue} action={action} />
      </View>
    </View>
  );
};

const CancelBtn: () => React$Node = ({setModalValue}) => {
  return (
    <TouchableOpacity
      style={[styles.btn, styles.cancelBtn]}
      onPress={() => setModalValue({visible: false})}>
      <Text style={{color: 'white'}}>Cancelar</Text>
    </TouchableOpacity>
  );
};

const SuccesBtn: () => React$Node = ({setModalValue, action}) => {
  return (
    <TouchableOpacity
      style={[styles.btn, styles.succesBtn]}
      onPress={() => action()}>
      <Text style={{color: 'white'}}>Agregar</Text>
    </TouchableOpacity>
  );
};

export {AddClient, AddProduct, AddService, AddProvider, CancelBtn};

const styles = StyleSheet.create({
  form: {
    width: 300,
    height: 500,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formTitle: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 20,
  },
  txtInput: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#eee',
    paddingHorizontal: 32,
    paddingVertical: 5,
    marginVertical: 5,
  },
  btn: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    margin: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 150,
    backgroundColor: '#f7f8f9',
    borderRadius: 20,
  },
  cancelBtn: {
    backgroundColor: 'rgb(255,80,80)',
  },
  succesBtn: {
    backgroundColor: '#5d80b6',
  },
  txtMuted: {
    color: 'gray',
  },
});
