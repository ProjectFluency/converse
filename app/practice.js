import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

class Script extends Component {

}

export default class Practice extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Text> Coming soon: a Practice screen, for real </Text>
            </View>);
    }
}
// TODO: figure out code reuse between index.js and here; eg. the 'container' class is duplicated.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
