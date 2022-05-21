import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import store from '../../../store';
import styles from './styles';
import CurrencyFunctions from '../../utils/currencyFunctions';
const currencyFunctions = new CurrencyFunctions();
const {moneyFormat} = currencyFunctions;

const YearReportItem = ({data}) => {
    const year = store.getState().reports.reports[data];
    const isActualYear = new Date().getFullYear() == data;
    const lastSale = store.getState().collections.sales.filter((sale) => sale.getYear() === data).pop();
    return (
        <TouchableHighlight style={[styles.yearItem, isActualYear ? styles.actualYear : null]} onPress={() => {}} underlayColor={'rgba(0,0,0,0.1)'}>
            <>
            <View style={styles.itemHeader} >
                {isActualYear && <Text style={styles.actualYearText}>Año actual</Text>}
            </View>
            <View style={styles.itemBody}>
                <View style={styles.itemCol1}>
                    <Text style={styles.itemTitle}>{data}</Text>
                    <Text style={styles.itemSubtitle}>Ultima venta: {lastSale.formattedDate('dd MMM')}</Text>
                </View>
                <View style={styles.itemCol2}>
                    <View style={styles.itemCol1}>
                        <Text style={[styles.totalText, styles.textCenter]}>{moneyFormat(year.total)}</Text>
                        <Text style={[styles.heading6, styles.textCenter]}>Ventas</Text>
                    </View>
                    <View>
                        <Text style={[styles.totalText, styles.textCenter]}>{moneyFormat(year.ganancias)}</Text>
                        <Text style={[styles.heading6, styles.textCenter]}>Ganancias</Text>
                    </View>
                </View>
            </View>
            </>
        </TouchableHighlight>
    )
}

export default YearReportItem;