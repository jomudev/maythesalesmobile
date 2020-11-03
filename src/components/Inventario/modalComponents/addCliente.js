import React, {useState} from 'react';
import {View, TextInput, Text} from 'react-native';
import {save} from './modalMetodos';
import styles from './modalStyles';
import BtnGroup from './buttonGroup';

const AddCliente = () => {
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
        <BtnGroup
          action={() =>
            save('client', {nombre, telefono, email, descripcion}, clean())
          }
        />
      </View>
    </View>
  );
};

export default AddCliente;
