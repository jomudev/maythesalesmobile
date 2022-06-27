import React from 'react';
import {
  ScrollView,
  Text,
} from 'react-native';
import styles from './styles';
import store from '../../../store';
import EmptyListImages from '../emptyListImage';
import CollectionsFunctions from '../../utils/collectionsFunctions.util';
import ListItem from './listItem';
import StickyHeader from '../../utils/components/list/StickyHeader'

function wait(timeout) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

function ShowInventory({navigation, route}) {
  const collectionName = route.params.collectionName;
  const [collection, setCollection] = React.useState([]);
  const [headers, setHeaders] = React.useState([]);

  const getHeaders = (array) => array.map((item, index) => ({item, index})).filter((item) => typeof item.item === "string").map(item => item.index)

  React.useEffect(() => {
    const newCollection = CollectionsFunctions.getCollectionList(collectionName);
    setCollection(newCollection);
    setHeaders(getHeaders(newCollection));
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container} style={{width: '100%'}} stickyHeaderIndices={headers} >
      {collection.length > 0 ? 
        collection.map((item, index) => {
            const returnType = {
              object: <ListItem key={Math.random()} data={item} type={collectionName} navigation={navigation} />,
              string: <StickyHeader key={Math.random()}><Text style={{fontSize: 14, fontWeight: 'bold', color: 'gray'}}>{item}</Text></StickyHeader>,
            }
          return returnType[typeof item]
      }) : 
        EmptyListImages.ImageComponent()
      }

    </ScrollView>
  );
}

export default ShowInventory;
