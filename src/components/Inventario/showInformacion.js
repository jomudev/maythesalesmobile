/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Modal,
  SafeAreaView,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ProductData, ClientsData, Badge} from './data';
import {
  AddClient,
  AddProduct,
  AddService,
  AddProvider,
} from './modalComponents';

// Containers
const ShowComponent: () => React$Node = ({setModalValue, type}) => {
  const [addData, setAddData] = useState({visible: false});

  return (
    <>
      <Header setModalValue={setModalValue} title={`Invantario: ${type}`} />

      <ListToShow setAddData={setAddData} type={type} />
      {addData.visible ? (
        <AddComponent setAddData={setAddData} type={type} />
      ) : null}
    </>
  );
};

const DataComponent: () => React$Node = ({
  item,
  setAddData,
  setShowData,
  type,
}) => {
  const xPosition = useRef(new Animated.Value(500)).current;
  useEffect(() => {
    Animated.timing(xPosition, {
      toValue: 0,
      duration: 250,
    }).start();
  }, []);

  const close = () => {
    Animated.timing(xPosition, {
      toValue: 500,
      duration: 250,
    }).start();
    setTimeout(() => setShowData(false), 250);
  };

  return (
    <Animated.View
      style={{
        ...styles.showDataComponent,
        left: xPosition,
      }}>
      <Header setModalValue={close} title={item.nombre} />
      <View style={styles.container}>
        {type === 'Productos' || type === 'Servicios Adicionales' ? (
          <View style={styles.form}>
            <ScrollView>
              <TextInput
                placeholder="Nombre del producto*"
                style={styles.txtInput}
                defaultValue={item.nombre}
              />
              <Text style={styles.mutedText}>Cantidad:</Text>
              <TextInput
                placeholder="Cantidad a agregar*"
                style={styles.txtInput}
                keyboardType="number-pad"
                defaultValue={item.cantidad.toString()}
              />
              <Text style={styles.mutedText}>Proveedor:</Text>
              <TextInput
                placeholder="Proveedor"
                style={styles.txtInput}
                defaultValue={item.proveedor}
              />
              <Text style={styles.mutedText}>
                precio de compra por unindad:
              </Text>
              <TextInput
                placeholder="Precio de costo p/u*"
                style={styles.txtInput}
                keyboardType="number-pad"
                defaultValue={item.valorInvertidoP_U.toString()}
              />
              <Text style={styles.mutedText}>
                precio de compra por mayoreo:
              </Text>
              <TextInput
                placeholder="Precio de costo p/m*"
                keyboardType="number-pad"
                style={styles.txtInput}
                defaultValue={item.valorInvertidoP_M.toString()}
              />
              <Text style={styles.mutedText}>Precio de venta por uninda:</Text>
              <TextInput
                placeholder="Precio de venta p/u*"
                keyboardType="number-pad"
                style={styles.txtInput}
                defaultValue={item.valorVentaP_U.toString()}
              />
              <Text style={styles.mutedText}>Precio de venta por mayoreo:</Text>
              <TextInput
                placeholder="Precio de venta p/m*"
                style={styles.txtInput}
                keyboardType="number-pad"
                defaultValue={item.valorVentaP_M.toString()}
              />
            </ScrollView>
          </View>
        ) : type === 'Clientes' || type === 'Proveedores' ? (
          <View style={styles.form}>
            <SafeAreaView>
              <TextInput
                placeholder="Nombres ej. Daniela Andrade*"
                style={styles.txtInput}
                defaultValue={item.nombre}
              />
              <Text style={styles.mutedText}>Número de teléfono:</Text>
              <TextInput
                placeholder="Número de teléfono"
                keyboardType="numeric"
                style={styles.txtInput}
                defaultValue={item.telefono}
              />
              <Text style={styles.mutedText}>Correo Electrónico:</Text>
              <TextInput
                placeholder="Correo Electrónico"
                keyboardType="email-address"
                style={styles.txtInput}
                defaultValue={item.email}
              />
              <Text style={styles.mutedText}>Descripción:</Text>
              <TextInput
                placeholder="Descripción"
                multiline={true}
                numberOfLines={2}
                style={styles.txtInput}
                defaultValue={item.comentario}
              />
            </SafeAreaView>
          </View>
        ) : null}
      </View>
    </Animated.View>
  );
};

const ListToShow: () => React$Node = ({type, setAddData}) => {
  const [search, setSearch] = useState(false);
  const [itemData, setItemData] = useState(null);
  const [showDataComponent, setShowDataComponent] = useState(false);
  const setData = data => {
    setItemData(data);
    setShowDataComponent(true);
  };

  let ListComponent = null;

  switch (type) {
    case 'Clientes':
    case 'Proveedores':
      ListComponent = () => (
        <>
          {ClientsData.map((item, index) => {
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
                      item.comentario ? `\ncomentario: ${item.comentario}` : '',
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
                    item.comentario ? `\ncomentario: ${item.comentario}` : '',
                  ]}
                />
              );
            }
          })}
        </>
      );
      break;
    case 'Productos':
    case 'Servicios Adicionales':
      ListComponent = () => (
        <>
          {ProductData.map((item, index) => {
            if (search) {
              if (
                item.nombre.toLowerCase().includes(search) ||
                item.valorVentaP_U
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
                    subtitle={[
                      `${Badge} ${item.valorVentaP_U} Ganancias: ${Badge} ${
                        item.gananciaP_U
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
                    `${Badge} ${item.valorVentaP_U} Ganancias: ${Badge} ${
                      item.gananciaP_U
                    }`,
                  ]}
                  setAddData={setAddData}
                />
              );
            }
          })}
        </>
      );
      break;
  }
  return (
    <>
      <View style={styles.searchComponent}>
        <TextInput
          style={styles.txtSearch}
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

// Secundarios
const AddComponent: () => React$Node = ({type, setAddData}) => {
  const ModalContent: () => React$Node = () => {
    switch (type) {
      // Componenetes para agregar al Inventario
      case 'Clientes':
        return <AddClient setModalValue={setAddData} />;
      case 'Productos':
        return <AddProduct setModalValue={setAddData} />;
      case 'Servicios Adicionales':
        return <AddService setModalValue={setAddData} />;
      case 'Proveedores':
        return <AddProvider setModalValue={setAddData} />;
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

//Componentes Secundarios

const ListItem: () => React$Node = ({data, title, subtitle, setItemData}) => {
  return (
    <TouchableOpacity style={styles.listItem} onPress={() => setItemData(data)}>
      <Text style={{fontSize: 18}}>{title}</Text>
      <Text>
        {subtitle.map((item, index) => (
          <Text key={item + index}>{item}</Text>
        ))}
      </Text>
      <Icon
        name="navigate-next"
        size={28}
        style={{
          position: 'absolute',
          right: 10,
          top: '65%',
          color: '#5d80b6',
        }}
      />
    </TouchableOpacity>
  );
};

const Header: () => React$Node = ({setModalValue, title}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          setModalValue({visible: false});
        }}
        style={styles.headerLeftComponent}>
        <Icon name="navigate-before" size={28} style={{color: 'white'}} />
      </TouchableOpacity>
      <Text style={styles.headerCenterComponent}>{title}</Text>
    </View>
  );
};

export {ShowComponent};

const styles = StyleSheet.create({
  searchComponent: {
    margin: 2,
  },
  txtSearch: {
    textAlign: 'center',
    height: 45,
    paddingHorizontal: 6,
    margin: 4,
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.27,
    textShadowRadius: 4.65,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 4,
  },
  mutedText: {
    color: '#aaa',
  },
  showDataComponent: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    elevation: 7,
    left: 500,
    backgroundColor: '#fff',
  },
  centeredViewModal: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '98%',
    paddingHorizontal: 20,
    marginBottom: 10,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    position: 'absolute',
    bottom: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  AddCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '0%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '0%',
  },
  AddBtn: {
    backgroundColor: '#101e5a',
    padding: 15,
    borderRadius: 100,
    position: 'absolute',
    right: 20,
    bottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 11.5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 2,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#101e5a',
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
  },
  txtInput: {
    fontSize: 28,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  headerLeftComponent: {
    marginRight: 10,
    padding: 5,
  },
  headerCenterComponent: {
    color: 'white',
    fontSize: 24,
    padding: 4,
  },
  listItem: {
    borderBottomWidth: 1,
    borderColor: '#efefef',
    width: '100%',
    padding: 20,
  },
  form: {
    width: '100%',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    padding: 4,
  },
});
