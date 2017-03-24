import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

export default class converse extends Component {
    render() {
        var reloadString = (Platform.OS === 'android') ?
            ("Double tap R on your keyboard to reload, \n" +
             "Shake or press menu button for dev menu") :
            ("Press Cmd+R to reload,\n Cmd+D or shake for dev menu");
        return (
                <View style={styles.container}>
                    <Text style={styles.welcome}>Converse App</Text>
                    <Text style={styles.instructions}>
                    {reloadString}
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
