import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 36,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    txtInput: {
        height: 50,
        fontSize: 16,
        padding: 8,
        backgroundColor: '#e6e8f1',
        marginTop: 8,
        width: "100%",
        marginBottom: 24,
    },
    nombre: {
        flex: 9,
        fontSize: 28,
        fontWeight: 'bold',
        color: '#101e5a',
        padding: 4,
    },
    nombreInput: {
        backgroundColor: 'white',
        borderBottomWidth: 3,
        borderColor: '#aaa',
        flex: 9,
        fontSize: 28,
        fontWeight: 'bold',
        color: '#101e5a',
        borderRadius: 0,
        padding: 4,
    },
    quantity: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'flex-end',
      },
      quantityBadge: {
        width: 24,
        height: 24,
        backgroundColor: '#e6e8f1',
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 100,
        color: '#000',
      },
    editNombre: {
        flex: 1,
        textAlign: 'center',
        color: '#101e5a',
        paddingHorizontal: 8,
    },
    nombreContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default styles;