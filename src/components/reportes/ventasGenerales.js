/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, SafeAreaView, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import store from '../../../store';
import {NavigationContainer} from '@react-navigation/native';
import {Badge} from '../../components/Inventario/data';
const Stack = createStackNavigator();

const VentasGeneral: () => React$Node = ({navigation}) => {
  const Index: () => React$Node = () => {
    const [meses, setMeses] = useState([]);

    const MonthsList: () => React$Node = ({item}) => (
      <TouchableOpacity style={styles.monthListButton}>
        <Text style={{textTransform: 'uppercase', fontWeight: 'bold'}}>
          {item.mes}
        </Text>
        <Text>{` Total del mes: ${Badge} ${Number.parseFloat(
          item.total,
        ).toFixed(2)}`}</Text>
      </TouchableOpacity>
    );

    return (
      <SafeAreaView>
        {meses.map((item, index) => (
          <MonthsList key={item + index} item={item} />
        ))}
      </SafeAreaView>
    );
  };

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Principal" component={Index} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default VentasGeneral;

const styles = StyleSheet.create({
  monthListButton: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#cbc6c3',
    marginHorizontal: 10,
    marginVertical: 2,
    borderRadius: 4,
  },
});
