import React, {useState} from 'react';
import {View, Text, ScrollView, TextInput} from 'react-native';
import styles from './modalStyles';
import {save} from './modalMetodos';
import BtnGroup from './buttonGroup';

const AddProveedor = () => {
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
        <BtnGroup
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
      </View>
    </>
  );
};

export default AddProveedor;
