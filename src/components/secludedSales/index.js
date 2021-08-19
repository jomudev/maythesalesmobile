import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import RenderVentasCollection from '../listItem';
import store from '../../../store';

const getSecludedSales = () => store.getState().secludedSales;

const SecludedSales = () => {
  const [storingSales, setStoringSales] = useState(
    store.getState().secludedSales,
  );

  useEffect(() => {
    setStoringSales(getSecludedSales());
    console.log(getSecludedSales());
    const unsubscribe = store.subscribe(() => {
      setStoringSales(getSecludedSales());
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View>
      {storingSales.map((data) => (
        <RenderVentasCollection
          key={JSON.stringify(data)}
          sale={data}
          type="secluded"
        />
      ))}
    </View>
  );
};

export default SecludedSales;
