import React from 'react';
import {
  ScrollView,
} from 'react-native';
import styles from './styles';
import store from '../../../store';
import EmptyListImages from '../emptyListImage';
import CollectionsFunctions from '../../utils/collectionsFunctions.util';
import ListComponent from './ListComponent';

function wait(timeout) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

function ShowInventory({navigation, route}) {
  const collectionName = route.params.collectionName;
  const [collection, setCollection] = React.useState({});
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    setCollection(CollectionsFunctions.getCollectionList(collectionName));
  }, []); 

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Object.keys(collection).length > 0 ? 
        Object.keys(collection).sort(CollectionsFunctions.sortCollectionItems).map((key) => (
          <ListComponent list={collection[key]} title={key} key={key} type={collectionName} navigation={navigation} />
        )) : 
        EmptyListImages.ImageComponent()
      }

    </ScrollView>
  );
}

export default ShowInventory;
