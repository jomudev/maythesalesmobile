import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, Modal} from 'react-native';

class BottomSheet extends React.Component{
    constructor(props) {
        super();
        this.props = props;
        this.state = {
            show: false,
        }
    }

    show() {
        this.setState({
            show: true,
        });
    }
    
    close() {
        this.setState({
            show: false,
        });
    }

    render() {
        return this.state.show && (
            <Modal transparent={true} style={styles.modal} animationType="slide" animated={true} onRequestClose={() => this.close()}>
                <View style={styles.childrenContainer}>
                    {this.props.children}
                </View>
            </Modal>
        )
    }

}

const styles = StyleSheet.create({
    childrenContainer: {
        flex: 1,
        margin: 8,
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 16,
        elevation: 16,
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },  
    modal: {
        position: 'absolute',
        flex: 1,
    },
});

export default BottomSheet;