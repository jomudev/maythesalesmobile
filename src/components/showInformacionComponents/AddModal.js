import React from 'react';
import BottomSheet from '../../utils/components/BottomSheet';
import {Text} from 'react-native'
import SelectAddComponent from '../../utils/components/SelectAddComponent';

const AddModal = React.forwardRef(({type, registryType}, ref) => {
    const types = {
      addQuantity: <Text>Add quantity</Text>,
      addRegistry: SelectAddComponent(registryType),
    }
    return (
      <BottomSheet ref={ref}>
          {types[type]}
      </BottomSheet>
    )
  });

  export default AddModal;