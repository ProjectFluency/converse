import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Tabs from 'react-native-tabs';
import Practice from './practice.js';
import AudioExample from './AudioExample.js';

class Record extends Component {
    render() {
        return(<View style={styles.container}>
                <Text> Coming soon: a Recording screen </Text>
               </View>);
    }
}
class Messages extends Component {
    render() {
        return(<View style={styles.container}>
                <Text> Coming soon: a Messages screen </Text>
               </View>);
    }
}
export default class converse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 'practice',
    };
  }

  render() {
    const { page } = this.state;
    let view = null;
    if (page === "practice") {
        view = <Practice />;
    } else if (page === "record") {
        view = <AudioExample /> //<Record />;
    } else if (page === "messages") {
        view = <Messages />;
    }
    return (
      <View style={styles.page}>
        <Tabs
          selected={page}
          style={styles.tabbar}
          selectedStyle={{color:'red'}} onSelect={el=>this.setState({page:el.props.name})}
        >
            <Text name="record"> Record  </Text>
            <Text name="messages"> Messages  </Text>
            <Text name="practice"> Practice </Text>
        </Tabs>

        {view}
      </View>
    )
  }
}
const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        alignSelf: 'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
    },
    tabbar: {
        backgroundColor:'white',
        height: 64,
        borderTopColor: 'red',
        borderTopWidth: 2,
        zIndex: 100,
    },
});
