import React from 'react';
import {View, StyleSheet} from 'react-native';

const StickyHeader = (props) => {
    return (
        <View style={styles.header}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: 100,
        height: 50,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff",
    }
});

export default StickyHeader;