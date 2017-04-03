import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Tabs from 'react-native-tabs';

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
class Practice extends Component {
    render() {
        return(<View style={styles.container}>
                <Text> Coming soon: a Practice screen </Text>
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
        view = <Record />;
    } else if (page === "messages") {
        view = <Messages />;
    }
    return (
      <View style={styles.container}>
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
    },
    vertlist: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabbar: {
        backgroundColor:'white',
        height: 64,
        borderTopColor: 'red',
        borderTopWidth: 2
    },
});
