import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        justifyContent: 'space-between',
        width: '100%',
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
    imageContainer: {
        width: "100%",
        height: 150,
    },
    imageContainer: {
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        position: 'relative',
        height: 260,
        width: '100%',
        marginVertical: 10,
      },
    showImageButton: {
        alignItems: 'center',
        alignContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#f1f2f3',
        zIndex: -1,
        overflow: 'hidden',
    },
    updateImageButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#f6f7f8aa',
        borderRadius: 100,
        padding: 10,
        elevation: 30,
    },
    addImageIcon: {
        fontSize: 225,
        color: '#101e5a',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    displayImage: {
        width: '100%',
        height: '100%',
    },
    displayImageContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000',
    },
});

export default styles;