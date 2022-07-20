import React from 'react';
import {View, Text, Image, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import store from '../../../../store';

const AddQuantityComponent = ({id}) => {
    const [data, setData] = React.useState(null);
    const [quantity, setQuantity] = React.useState(0);

    React.useEffect(() => {
        let collection = store.getState().collections;
        collection = Object.keys(collection).map((key) => collection[key]).flat();
        const element = collection.find((element) => element.id === id);
        setData(element)
    }, []);

    const modifyQuantity = (type) => {
        if (type === "plus") {
            setQuantity(quantity + 1);
        } else {
            if (quantity > 0) {
                setQuantity(quantity - 1)
            }
        }
    }

    const saveQuantity = () => {
        const element = Object.keys(store.getState()
        .collections).map((key) => store.getState().collections[key]).flat()
        .find((element) => element.id === id);
        element.updateProperty('cantidad', element.cantidad + quantity);
    }

    if (!data) {
        return <Text>Cargando...</Text>
    }

    return (
        <View>
            <View>
                <Image source={{uri: data.imageURL}} style={styles.image} />
                <Text style={styles.name}>{data.nombre}</Text>
            </View>
            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => modifyQuantity("minus")} style={styles.button}>
                    <Icon name="minus" size={32} />
                </TouchableOpacity>
                <TextInput 
                    defaultValue={quantity.toString()} 
                    value={quantity.toString()} 
                    style={styles.input} 
                />
                <TouchableOpacity onPress={() => modifyQuantity("plus")} style={styles.button}>
                    <Icon name="plus" size={32} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={saveQuantity} style={styles.submitButton}>
                <Text style={styles.buttonText}>Agregar {quantity} - {data.nombre}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityContainer:  {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    image: {
        width: "100%",
        height: "70%",
    },
    name: {
        fontSize: 32,
        textAlign: 'center',
    },
    input: {
        fontSize: 32, 
        textAlign: 'center',
        height: 80,
        width: 80,
    },
    submitButton: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#101a5e',
    },
    buttonText: {
        color: 'white',
    },
});

export default AddQuantityComponent;