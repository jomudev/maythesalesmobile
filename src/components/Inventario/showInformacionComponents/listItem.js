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

const ListItem = ({navigation, route, data, title, subtitle}) => {
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() =>
        navigation.navigate('ShowItem', {
          type: route.params.type,
          data,
        })
      }>
      {data.imageURL ? (
        <View style={styles.listItemImage}>
          <Image
            source={{uri: data.imageURL}}
            progressiveRenderingEnabled={true}
            style={{
              height: '100%',
            }}
            resizeMode="cover"
            resizeMethod="resize"
          />
        </View>
      ) : null}
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
