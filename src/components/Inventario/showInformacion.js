import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  ProductData,
  ClientsData,
  ProvidersData,
  Badge,
  ServicesData,
} from './data';
import {
  AddClient,
  CancelBtn,
  AddProduct,
  AddService,
  AddProvider,
} from './modalComponents';

// Containers
const ShowComponent: () => React$Node = ({setModalValue, type}) => {
  const [showData, setShowData] = useState({visible: false});
  return (
    <>
      <Header setModalValue={setModalValue} title={`Invantario: ${type}`} />
      <ListToShow setShowData={setShowData} type={type} />
      {showData.visible ? (
        <AddComponent setShowData={setShowData} type={type} />
      ) : null}
      <View style={styles.AddCenteredView}>
        <TouchableOpacity
          style={styles.AddBtn}
          onPress={() => setShowData({visible: true, type})}>
          <Icon name="add" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
};

const ListToShow: () => React$Node = ({type, setShowData}) => {
  const [search, setSearch] = useState(false);
  switch (type) {
    case 'Clientes':
      return (
        <>
          <View style={styles.searchComponent}>
            <TextInput
              style={styles.txtSearch}
              placeholder="Buscar"
              onChangeText={text => setSearch(text.toLowerCase())}
            />
          </View>
          {ClientsData.map((item, index) => {
            if (search) {
              if (item.nombre.toLowerCase().includes(search)) {
                return (
                  <ListItem
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
    case 'Productos':
      return (
        <>
          <View style={styles.searchComponent}>
            <TextInput
              style={styles.txtSearch}
              placeholder="Buscar por nombre o precio de venta"
              onChangeText={text => setSearch(text.toLowerCase())}
            />
          </View>
          {ProductData.map((item, index) => {
            if (search) {
              if (
                item.nombre.toLowerCase().includes(search) ||
                item.valorVenta
                  .toString()
                  .toLowerCase()
                  .includes(search)
              ) {
                return (
                  <ListItem
                    key={item + index + item}
                    title={item.nombre}
                    subtitle={[
                      `${Badge} ${item.valorVenta} Ganancias: ${Badge} ${
                        item.ganancia
                      }`,
                    ]}
                    setShowData={setShowData}
                  />
                );
              }
            } else {
              return (
                <ListItem
                  key={item + index + item}
                  title={item.nombre}
                  subtitle={[
                    `${Badge} ${item.valorVenta} Ganancias: ${Badge} ${
                      item.ganancia
                    }`,
                  ]}
                  setShowData={setShowData}
                />
              );
            }
          })}
        </>
      );
    case 'Servicios Adicionales':
      return (
        <>
          <View style={styles.searchComponent}>
            <TextInput
              style={styles.txtSearch}
              placeholder="Buscar por nombre o precio de venta"
              onChangeText={text => setSearch(text.toLowerCase())}
            />
          </View>
          {ServicesData.map((item, index) => {
            if (search) {
              if (
                item.nombre.toLowerCase().includes(search) ||
                item.valorVenta
                  .toString()
                  .toLowerCase()
                  .includes(search)
              ) {
                return (
                  <ListItem
                    key={item + index + item}
                    title={item.nombre}
                    subtitle={[
                      `${Badge} ${
                        item.valorVenta
                      } Ganancias: ${Badge} item.ganancia`,
                    ]}
                  />
                );
              }
            } else {
              return (
                <ListItem
                  key={item + index + item}
                  title={item.nombre}
                  subtitle={[
                    `${Badge} ${
                      item.valorVenta
                    } Ganancias: ${Badge} item.ganancia`,
                  ]}
                />
              );
            }
          })}
        </>
      );
    case 'Proveedores':
      return (
        <>
          <View style={styles.searchComponent}>
            <TextInput
              style={styles.txtSearch}
              placeholder="Buscar"
              onChangeText={text => setSearch(text.toLowerCase())}
            />
          </View>
          {ProvidersData.map((item, index) => {
            if (search) {
              if (item.nombre.toLowerCase().includes(search)) {
                return (
                  <ListItem
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
  }
  return null;
};

// Secundarios
const AddComponent: () => React$Node = ({type, setShowData}) => {
  const ModalContent: () => React$Node = () => {
    console.log(type);
    switch (type) {
      // Componenetes para agregar al Inventario
      case 'Clientes':
        return <AddClient setModalValue={setShowData} />;
      case 'Productos':
        return <AddProduct setModalValue={setShowData} />;
      case 'Servicios Adicionales':
        return <AddService setModalValue={setShowData} />;
      case 'Proveedores':
        return <AddProvider setModalValue={setShowData} />;
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

const ListItem: () => React$Node = ({title, subtitle}) => {
  return (
    <TouchableOpacity style={styles.listItem}>
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
    flexDirection: 'row',
    height: 45,
    paddingHorizontal: 6,
    margin: 10,
    borderRadius: 100,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.27,
    textShadowRadius: 4.65,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 6,
  },
  centeredViewModal: {
    flex: 1,
    justifyContent: 'flex-end',
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
  centeredViewShowData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: '#ffffff',
    zIndex: 1000,
  },
  modalViewShowData: {
    position: 'relative',
    width: '100%',
    height: '100%',
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
    elevation: 5,
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
  txtSearch: {
    margin: 0,
    width: '100%',
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
});
