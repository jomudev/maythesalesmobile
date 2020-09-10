import React from 'react';
import {ScrollView} from 'react-native';
import RenderItem from '../listItem';

const ReporteMes = ({route}) => {
  const ventas = route.params.params.ventas;
  return (
    <ScrollView>
      {ventas.map(item => (
        <RenderItem item={item} key={Math.random()} />
      ))}
    </ScrollView>
  );
};

export default ReporteMes;
