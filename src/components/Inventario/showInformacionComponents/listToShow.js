import React, {useState} from 'react';
import store from '../../../../store';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ListItem from './listItem';
import styles from './styles';
import {Badge} from '../data';
import DataComponent from './dataComponent';

const ListToShow = ({type, setAddData}) => {
  const [search, setSearch] = useState(false);
  const [itemData, setItemData] = useState(null);
  const [showDataComponent, setShowDataComponent] = useState(false);
  const clients = store.getState().clients;
  const products = store.getState().products;
  const services = store.getState().services;
  const providers = store.getState().providers;

  const setData = data => {
    setItemData(data);
    setShowDataComponent(true);
  };

  let ListComponent = null;

  switch (type) {
    case 'Clientes':
      !clients.length
        ? (ListComponent = () => {
            return (
              <Text style={styles.shomethingHere}>
                Aquí apareceran los clientes
              </Text>
            );
          })
        : (ListComponent = () => (
            <>
              {clients.map((item, index) => {
                if (search) {
                  if (item.nombre.toLowerCase().includes(search)) {
                    return (
                      <ListItem
                        setItemData={setItemData}
                        data={item}
                        key={item + index + item}
                        title={item.nombre}
                        subtitle={[
                          item.telefono ? `teléfono: ${item.telefono} ` : '',
                          item.email ? `email: ${item.email} ` : '',
                          item.descripcion
                            ? `\ndescripción: ${item.descripcion}`
                            : '',
                        ]}
                      />
                    );
                  }
                } else {
                  return (
                    <ListItem
                      setItemData={setData}
                      data={item}
                      key={item + index + item}
                      title={item.nombre}
                      subtitle={[
                        item.telefono ? `teléfono: ${item.telefono} ` : '',
                        item.email ? `email: ${item.email} ` : '',
                        item.descripcion
                          ? `\ndescripción: ${item.descripcion}`
                          : '',
                      ]}
                    />
                  );
                }
              })}
            </>
          ));

      break;
    case 'Proveedores':
      !providers.length
        ? (ListComponent = () => {
            return (
              <Text style={styles.shomethingHere}>
                Aquí apareceran los proveedores
              </Text>
            );
          })
        : (ListComponent = () => (
            <>
              {providers.map((item, index) => {
                if (search) {
                  if (item.nombre.toLowerCase().includes(search)) {
                    return (
                      <ListItem
                        setItemData={setItemData}
                        data={item}
                        key={item + index + item}
                        title={item.nombre}
                        subtitle={[
                          item.telefono ? `teléfono: ${item.telefono} ` : '',
                          item.email ? `email: ${item.email} ` : '',
                          item.descipcion
                            ? `\ndescripción: ${item.descipcion}`
                            : '',
                        ]}
                      />
                    );
                  }
                } else {
                  return (
                    <ListItem
                      setItemData={setData}
                      data={item}
                      key={item + index + item}
                      title={item.nombre}
                      subtitle={[
                        item.telefono ? `teléfono: ${item.telefono} ` : '',
                        item.email ? `email: ${item.email} ` : '',
                        item.descipcion
                          ? `\ndescripción: ${item.descipcion}`
                          : '',
                      ]}
                    />
                  );
                }
              })}
            </>
          ));
      break;
    case 'Productos':
      !products.length
        ? (ListComponent = () => {
            return (
              <Text style={styles.shomethingHere}>
                Aquí apareceran los productos
              </Text>
            );
          })
        : (ListComponent = () => (
            <>
              {products.map((item, index) => {
                if (search) {
                  if (
                    item.nombre.toLowerCase().includes(search) ||
                    item.ventaP_U.toString().includes(search)
                  ) {
                    return (
                      <ListItem
                        setItemData={setData}
                        data={item}
                        key={item + index + item}
                        title={item.nombre}
                        subtitle={[
                          `L${Number.parseFloat(item.ventaP_U).toFixed(
                            2,
                          )} ${
                            item.descripcion
                              ? `descripción ${item.descripcion}`
                              : ' '
                          }`,
                        ]}
                        setAddData={setAddData}
                      />
                    );
                  }
                } else {
                  return (
                    <ListItem
                      setItemData={setData}
                      data={item}
                      key={item + index + item}
                      title={item.nombre}
                      subtitle={[
                        `L${Number.parseFloat(item.ventaP_U).toFixed(
                          2,
                        )} ${
                          item.descripcion
                            ? `descripción ${item.descripcion}`
                            : ' '
                        }`,
                      ]}
                      setAddData={setAddData}
                    />
                  );
                }
              })}
            </>
          ));
      break;
    case 'Servicios Adicionales':
      !services.length
        ? (ListComponent = () => (
            <Text style={styles.shomethingHere}>
              Aquí apareceran los servicios adicionales
            </Text>
          ))
        : (ListComponent = () => (
            <>
              {services.map((item, index) => {
                if (search) {
                  if (
                    item.nombre.toLowerCase().includes(search) ||
                    item.ventaP_U
                      .toString()
                      .toLowerCase()
                      .includes(search)
                  ) {
                    return (
                      <ListItem
                        setItemData={setData}
                        data={item}
                        key={item + index + item}
                        title={item.nombre}
                        subtitle={[`L${item.ventaP_U}`]}
                        setAddData={setAddData}
                      />
                    );
                  }
                } else {
                  return (
                    <ListItem
                      setItemData={setData}
                      data={item}
                      key={item + index + item}
                      title={item.nombre}
                      subtitle={[
                        `L${item.ventaP_U} ${
                          item.descripcion
                            ? `descripción ${item.descripcion}`
                            : ' '
                        }`,
                      ]}
                      setAddData={setAddData}
                    />
                  );
                }
              })}
            </>
          ));
      break;
    default:
      return (
        <View>
          <Text>Nada para Mostrar</Text>
        </View>
      );
  }

  return (
    <>
      <View style={styles.searchComponent}>
        <TextInput
          style={styles.txtInput}
          placeholder="Buscar"
          onChangeText={text => setSearch(text.toLowerCase())}
        />
      </View>
      {ListComponent()}
      {showDataComponent ? (
        <DataComponent
          item={itemData}
          type={type}
          setShowData={setShowDataComponent}
        />
      ) : null}
      <View style={styles.centeredView}>
        <TouchableOpacity
          style={styles.AddBtn}
          onPress={() => setAddData({visible: true, type})}>
          <Icon name="add" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ListToShow;
