import React from 'react';
import {View, Text} from 'react-native';
import ListItem from './listItem';
import styles from './styles';

const ListComponent = ({list, title, navigation, type}) => {
    return (
       <View style={styles.listGroupContainer}>
        <Text style={styles.listTitle}>{title}</Text>
        {
            list.map(item => (<ListItem key={Math.random()} data={item} type={type} navigation={navigation} />))
        }
       </View>
    );
}

export default ListComponent;