import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import store from '../../../store';
import styles from './styles';
import MonthsReports from './monthsReports';
import CurrencyFunctions from '../../utils/currencyFunctions';

const YearReportItem = ({data, navigation}) => {
    const year = store.getState().reports.reports[data];
    const isActualYear = new Date().getFullYear() == data;
    const lastSale = store.getState().collections.ventas.filter((sale) => sale.getYear() === data).pop();
    const [showMonths, setShowMonths] = React.useState(false);

    return (
        <View style={[styles.yearItem, isActualYear ? styles.actualYear : null]} >
            <TouchableHighlight 
                style={styles.button}
                onPress={() => setShowMonths(!showMonths)} 
                underlayColor={'rgba(0,0,0,0.1)'}>
                <>
                <View style={styles.itemHeader} >
                    {isActualYear && <Text style={styles.actualYearText}>Año actual</Text>}
                </View>
                <View style={styles.itemRow}>
                    <View style={styles.itemCol}>
                        <Text style={styles.itemTitle}>{data}</Text>
                        <Text style={styles.itemSubtitle}>Última venta: {lastSale.formattedDate('dd MMM')}</Text>
                        <Text style={styles.itemSubtitle}>Ventas realizadas: {year.quantity}</Text>
                    </View>
                    <View style={styles.itemRow}>
                        <View style={styles.itemCol}>
                            <Text style={[styles.heading1, styles.textCenter]}>{CurrencyFunctions.moneyFormat(year.total)}</Text>
                            <Text style={[styles.heading2, styles.textCenter]}>Ventas</Text>
                        </View>
                        <View style={styles.itemCol}>
                            <Text style={[styles.heading1, styles.textCenter]}>{CurrencyFunctions.moneyFormat(year.ganancias)}</Text>
                            <Text style={[styles.heading2, styles.textCenter]}>Ganancias</Text>
                        </View>
                    </View>
                </View>
                </>
            </TouchableHighlight>
            {showMonths && <MonthsReports year={data} navigation={navigation} />}
        </View>

    )
}

export default YearReportItem;