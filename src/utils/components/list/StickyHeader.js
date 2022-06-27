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
        width: "100%",
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default StickyHeader;