import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const FloatingButton = ({onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Icon name="plus" size={36} color="white" />
        </TouchableOpacity>
    )
}

const styles = {
    button: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        elevation: 8,
        backgroundColor: '#101e5a',
        borderRadius: 100,
        height: 64,
        width: 64,
        alignItems: 'center',
        justifyContent: 'center',
    },  
}

export default FloatingButton;