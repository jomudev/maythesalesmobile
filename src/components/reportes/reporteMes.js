import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import RenderVentasCollection from '../listItem';
import {db} from '../mainFunctions';
import {format} from 'date-fns';
import {es} from 'date-fns/locale';
import styles from '../listItem/listStyles';

const ReporteMes = ({route}) => {
  const [sales, setSales] = useState([]);
  const month = route.params.params.month;

  useEffect(() => {
    const subscriber = db('ventas').onSnapshot((snapshot) => {
      if (!snapshot) {
        return;
      }
      let docChanges = snapshot.docChanges();
      docChanges = docChanges.map((change) => change.doc.data());
      docChanges = docChanges.filter(
        (data) =>
          format(new Date(data.timestamp.seconds * 1000), 'MMMM', {
            locale: es,
          }) === month,
      );
      if (JSON.stringify(docChanges) !== JSON.stringify(sales)) {
        setSales(docChanges);
      }
    });

    return subscriber;
  }, [month, sales]);

  return (
    <ScrollView style={styles.listVentas}>
      {sales
        .map((item) => (
          <RenderVentasCollection venta={item} key={Math.random()} />
        ))
        .reverse()}
    </ScrollView>
  );
};

export default ReporteMes;
