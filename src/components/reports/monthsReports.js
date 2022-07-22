import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from './styles';
import store from '../../../store';
import CurrencyFunctions from '../../utils/currencyFunctions';

const MonthsReports = ({year, navigation}) => {
    const keys = Object.keys(store.getState().reports.reports[year].months).reverse()
    
    return (
        <FlatList 
            data={keys}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
               <MonthItem month={item} year={year} navigation={navigation}/> 
            )}
        />
    )
}

const MonthItem = ({month, year, navigation}) => {
    const monthData = store.getState().reports.reports[year].months[month];
    const [isActualMonth, setIsActualMonth] = React.useState(false);
    const actualYear = new Date().getFullYear();
    const actualMonth = new Date().getMonth();
    const lastSale = store.getState().collections.ventas.filter((sale) => sale.getYear() == year && sale.getMonth() == month).pop();
    if (month == actualMonth && year == actualYear) {
        setIsActualMonth(true);
    }
    return (
        <TouchableOpacity 
            onPress={() => {navigation.navigate('Sales', {year: year, month: month})}}
            style={[styles.monthItem, isActualMonth ? styles.actualMonth : null]}>
            <View style={styles.itemHeader}>
                {isActualMonth && <Text style={styles.actualMonthText}>Mes actual</Text>}
            </View>
            <View style={styles.itemRow}>
                <View style={styles.itemRow}>
                    <View style={styles.itemCol}>
                        <Text style={styles.itemTitle}>{month}</Text>
                        <Text style={styles.itemSubtitle}>Última venta: {lastSale.formattedDate('dd MMM')}</Text>
                    </View>
                    <View style={styles.itemRow}>
                        <View style={styles.itemCol}> 
                            <Text style={[styles.heading1, styles.textCenter]}>{CurrencyFunctions.moneyFormat(monthData.total)}</Text>
                            <Text style={[styles.heading2, styles.textCenter]}>Ventas</Text>
                        </View>
                        <View style={styles.itemCol}> 
                            <Text style={[styles.heading1, styles.textCenter]}>{CurrencyFunctions.moneyFormat(monthData.ganancias)}</Text>
                            <Text style={[styles.heading2, styles.textCenter]}>Ganancias</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default MonthsReports;