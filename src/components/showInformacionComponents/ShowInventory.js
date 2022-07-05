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
import AddProduct from '../AddComponents/addProducto';

function ShowInventory({navigation, route}) {
  const collectionName = route.params.collectionName;
  const [collection, setCollection] = React.useState([]);
  const [headers, setHeaders] = React.useState([]);
  const [showAddQuantity, toggleAddQuantity] = React.useState(false);
  let bottomSheetRef = React.createRef();

  const getHeaders = (array) => array.map((item, index) => ({item, index})).filter((item) => typeof item.item === "string").map(item => item.index)

  const handleShowAddQuantity = () => {
    console.log("show Add quantity");
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
                object: <ListItem key={Math.random()} data={item} type={collectionName} navigation={navigation} onPressAdd={() => handleShowAddQuantity()} />,
                string: <StickyHeader key={Math.random()}><Text style={{fontSize: 14, fontWeight: 'bold', color: 'gray'}}>{item}</Text></StickyHeader>,
              }
            return returnType[typeof item]
        }) : 
          EmptyListImages.ImageComponent()
        }
      </ScrollView>
      <FloatingButton onPress={() => bottomSheetRef.current.show()} />
      <AddModal type={showAddQuantity ? 'addQuantity' : 'addRegistry'} ref={bottomSheetRef}/>
    </>
  );
}

const AddModal = React.forwardRef((props, ref) => {
  const {type} = props;
  const types = {
    addQuantity: <Text>Add quantity</Text>,
    addRegistry: <AddProduct route={{params: null}}/>
  }
  return (
    <BottomSheet ref={ref}>
        {types[type]}
    </BottomSheet>
  )
})

export default ShowInventory;
