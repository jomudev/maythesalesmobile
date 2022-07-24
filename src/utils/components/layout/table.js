import React from 'react';
import {View, StyleSheet} from 'react-native';

const Row = (props) => (
    <View style={[styles.row, props.style]}>
        {
            props.children
        }
    </View>
);

const Column = (props) => {
    const align = {
            right: {
                alignItems: 'flex-end',
            },
            left: {
                alignItems: 'flex-start',
            }
        };
    return (
        <View style={[styles.column, align[props.align]]}>
            {
                props.children
            }
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    column: {
        flex: 1,
        flexDirection: 'column',
    }
});

export {
    Row,
    Column,
};