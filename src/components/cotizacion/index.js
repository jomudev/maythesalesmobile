/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {ProductData, Badge} from './data';

class AgregarCotizacion extends React.Component {
  render() {
    return (
      <View style={styles.form}>
        <TextInput style={styles.txtInput} placeholder="Proveedor" />
        <TextInput style={styles.txtInput} placeholder="Producto o servicio" />
        <TextInput
          style={styles.txtInput}
          placeholder="Precio compra por unidad"
        />
        <TextInput
          style={styles.txtInput}
          placeholder="Precio compra por mayoreo"
        />
        <TextInput
          style={styles.txtInput}
          placeholder="Precio venta por unidad"
        />
        <TextInput
          style={styles.txtInput}
          placeholder="Precio venta por mayoreo"
        />
        <TouchableOpacity style={styles.Btn}>
          <Text style={{color: 'white'}}>Agregar cotización</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class Cotizaciones extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      data: [],
      gananciaType: true, // true = por unidad, false = por mayoria
    };
  }

  render() {
    return (
      <View style={{marginBottom: '6%'}}>
        <View style={styles.searchComponent}>
          <TextInput
            style={styles.txtSearch}
            placeholder="Buscar"
            onChangeText={text =>
              this.setState({
                search: text.toLowerCase(),
              })
            }
          />
        </View>
        <ScrollView>
          {ProductData.map((data, index) => {
            return <Card data={data} key={data + index} />;
          })}
        </ScrollView>
      </View>
    );
  }
}

// Componentes secundarios
const Card: () => React$Node = ({data}) => {
  return (
    <View style={styles.card}>
      <Text style={{fontSize: 18, textAlign: 'center'}}>{data.nombre}</Text>
      <View style={styles.cardBody}>
        <View style={styles.cardListItem}>
          <Text>{`Costo por unidad ${Badge + data.valorInvertidoP_U}`}</Text>
          <Text>
            {data.valorInvertidoP_M
              ? `Costo por mayoreo ${Badge + data.valorInvertidoP_M}`
              : null}
          </Text>
          <Text>{`Precio por unidad ${Badge + data.valorVentaP_U}`}</Text>
          <Text>
            {data.valorVentaP_M
              ? `Precio por mayoreo ${Badge + data.valorVentaP_M}`
              : null}
          </Text>
          <Text>Ganancia por unidad: {Badge + data.gananciaP_U}</Text>
          <Text>
            {data.gananciaP_M
              ? `Ganancia por mayoreo: ${Badge + data.gananciaP_M}`
              : null}
          </Text>
          <Text>
            Diferencia de ganancias:{' '}
            {data.gananciaP_M > data.gananciaP_U
              ? Badge + (data.gananciaP_M - data.gananciaP_U)
              : data.gananciaP_U > data.gananciaP_M
              ? Badge + (data.gananciaP_U - data.gananciaP_M)
              : Badge + 0}
          </Text>
          <Text>
            Mayor ganancia:{' '}
            {data.gananciaP_M > data.gananciaP_U
              ? 'Por mayoreo'
              : data.gananciaP_U > data.gananciaP_M
              ? 'Por unidad'
              : 'Indiferente'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export {AgregarCotizacion, Cotizaciones};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    width: '100%',
    padding: 2,
    maxWidth: 600,
    height: '100%',
    alignContent: 'center',
    alignItems: 'center',
  },
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
  cardListItem: {
    margin: 3,
    paddingVertical: 2,
  },
  card: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 4,
    borderColor: '#acdbd3',
    margin: 2,
    backgroundColor: '#f7f8f9',
  },
  cardBody: {
    margin: 3,
    padding: 1,
  },
  txtInput: {
    width: '95%',
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#eee',
    paddingHorizontal: 32,
    paddingVertical: 2,
    margin: 5,
  },
  Btn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 4,
    width: '100%',
    backgroundColor: '#101e5a',
    padding: 20,
  },
});
