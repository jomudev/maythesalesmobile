import React from 'react';
import {
  ScrollView,
  Text,
} from 'react-native';
import styles from './styles';
import FloatingButton from '../../utils/components/FloatingButton'
import EmptyListImages from '../emptyListImage';
import CollectionsFunctions from '../../utils/collectionsFunctions.util';
import ListItem from './listItem';
import StickyHeader from '../../utils/components/list/StickyHeader'
import BottomSheet from '../../utils/components/BottomSheet';
import AddQuantityComponent from '../../utils/components/products/AddQuantityComponent';
import SelectAddComponent from '../../utils/components/SelectAddComponent';

function ShowInventory({navigation, route}) {
  const collectionName = route.params.collectionName;
  const [collection, setCollection] = React.useState([]);
  const [headers, setHeaders] = React.useState([]);
  const [showAddQuantity, toggleAddQuantity] = React.useState(false);
  const [itemToAddId, setItemToAddId] = React.useState(null);
  let bottomSheetRef = React.createRef();

  const getHeaders = (array) => array.map((item, index) => (typeof item === "string") ? index : null).filter((item) => item !== null);

  const showModal = (type, item) => {
    toggleAddQuantity(type);
    setItemToAddId(item);
    bottomSheetRef.current.show();
  }

  React.useEffect(() => {
    const newCollection = CollectionsFunctions.getCollectionList(collectionName);
    setCollection(newCollection);
    setHeaders(getHeaders(newCollection));
  }, []);

  return (
    <>
      <ScrollView contentContainerStyle={styles.container} style={{width: '100%'}} stickyHeaderIndices={headers} >
        {collection.length > 0 ? 
          collection.map((item) => {
              const returnType = {
                object: <ListItem key={Math.random()} data={item} type={collectionName} navigation={navigation} onPressAdd={showModal} />,
                string: <StickyHeader key={Math.random()}><Text style={{fontSize: 14, fontWeight: 'bold', color: 'gray'}}>{item}</Text></StickyHeader>,
              }
            return returnType[typeof item]
        }) : 
          EmptyListImages.ImageComponent()
        }
      </ScrollView>
      <FloatingButton onPress={() => showModal('addRegistry')} />
      <BottomSheet ref={bottomSheetRef}>
        {
          showAddQuantity ? <AddQuantityComponent id={itemToAddId} /> : <SelectAddComponent type={collectionName}/>
        }
      </BottomSheet>
    </>
  );
}

export default ShowInventory;
