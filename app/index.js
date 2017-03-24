import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class converse extends Component {
    render() {
        return (
                <View style={styles.container}>
                    <Text style={styles.welcome}>Converse App</Text>
                    <Text style={styles.instructions}>
                        iOS:Press Cmd+R to reload,{'\n'}
                        Cmd+D or shake for dev menu
                    </Text>
                    <Text style={styles.instructions}>
                        Android: Double tap R on your keyboard to reload,{'\n'}
                        Shake or press menu button for dev menu
                    </Text>
                </View>
               )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },

});
