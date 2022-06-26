import React from 'react';
import {FlatList} from 'react-native';
import ListItem from '../listItem';
import store from '../../../store';

const Sales = ({route}) => {
    const {year, month} = route.params;
    const salesIds = store.getState().reports.reports[year].months[month].ventas;
    return <FlatList 
        data={salesIds}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (<ListItem saleId={item}/>)}
    />
}

export default Sales;