import React from 'react';
import {TextInput, View, Text} from 'react-native';

const TextBox = (props) => {
    let {style, Ref, isTextArea} = props;
    return (
      <TextInput
        underlineColorAndroid="transparent"
        {...props}
        style={{
          backgroundColor: '#e6e8f1',
          paddingHorizontal: 16,
          textAlignVertical: isTextArea ? 'top' : 'auto',
          width: '100%',
          marginBottom: 24,
        }}
        spellCheck={true}
        ref={Ref}
      />
    );
};

const LabeledInput = (props) => {
    const styles = {
        textContainer: {
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
        },
        label: {
            textAlign: 'left',
            fontWeight: 'bold',
            fontSize: 18,
            marginLeft: 8,
            width: '100%',
        },
    };

    return (
      <View style={styles.textContainer}>
        <Text style={styles.label}>{props.label}</Text>
        <TextBox {...props} />
      </View>
    )
}

export {
    TextBox,
    LabeledInput,
};