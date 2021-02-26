/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Dot = () => (
  <>
    <Text> </Text>
    <Icon
      name="fiber-manual-record"
      size={6}
      color="#999"
      style={{
        textAlign: 'center',
      }}
    />
    <Text> </Text>
  </>
);

const ItemImage = ({imageURL}) => {
  return imageURL ? (
    <Image
      source={{uri: imageURL}}
      progressiveRenderingEnabled={true}
      style={styles.listItemImage}
      resizeMode="cover"
      resizeMethod="resize"
    />
  ) : (
    <Image
      source={require('../../assets/AdditionalMedia/productDefaultImage.png')}
      style={{
        ...styles.listItemImage,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      resizeMode="center"
      resizeMethod="resize"
    />
  );
};

const ListItem = ({navigation, type, route, data, title, subtitle}) => {
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() =>
        navigation.navigate('ShowItem', {
          type: route.params.type,
          data,
        })
      }>
      {data.cantidad ? (
        <View style={styles.listItemQuantity}>
          <Text adjustsFontSizeToFit>{data.cantidad}</Text>
        </View>
      ) : null}
      {type === 'productos' ? <ItemImage imageURL={data.imageURL} /> : null}
      <View style={styles.listItemText}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={styles.itemSubtitle}>
          {subtitle.map((item, index) => {
            return (
              <Text key={item}>
                {index > 0 ? <Dot /> : null}
                <Text>{item}</Text>
              </Text>
            );
          })}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
