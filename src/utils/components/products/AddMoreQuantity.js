import React from 'react';
import {Animated, TouchableWithoutFeedback, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddMoreQuantity = ({show, data, close}) => {
    const scale = React.useRef(new Animated.Value(0)).current;
    const [value, setValue] = React.useState(0);
    React.useEffect(() => {
        Animated.timing(scale, {
            toValue: show ? 1 : 0,
            useNativeDriver: true,
            duration: 200,
        }).start();
    }, [show]);

    return (
        <Animated.View style={{
            transform: [{
                scaleX: scale,
            }, 
            {
                scaleY: scale,
            }],
            width: '100%',
            zIndex: 100,
            height: '100%',
            backgroundColor: 'white',
            position: 'absolute',
        }}>
            <TouchableWithoutFeedback onPress={() => setValue(value + 1)}>
                <Icon name="plus" size={20} color="#555" />
            </TouchableWithoutFeedback>
                <Text>{value}</Text>
            <TouchableWithoutFeedback onPress={() => setValue(value - 1)}>
                <Icon name="plus" size={20} color="#555" />
            </TouchableWithoutFeedback>
        </Animated.View>
    );
}

export default AddMoreQuantity;