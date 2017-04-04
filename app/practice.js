import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableHighlight } from 'react-native';
const Sound = require('react-native-sound');
var content = require('./config/scripts');

class Line extends Component {
    constructor(props) {
        super(props);
        Sound.setCategory('Ambient', true);

        this.playSound = () => {
            let sound = new Sound(this.props.audio, Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    console.log('error', error);
                }
                else {
                    console.log('duration in seconds: ' + sound.getDuration());
                }
                sound.play((success) => {
                    if (success) { console.log('Playing success!'); }
                    else { console.log('playback failed. Audio decoding errors.'); }
                });
            });
        }
    }
    render() {
        let {audio, text, parity} = this.props;
        let style = (parity === "even") ? styles.lineLeft : styles.lineRight;
        return(<View style={style}>
                  <Text>  {text} </Text>
                  <Button style={styles.playButton} onPress={this.playSound} title="▷ Play" />
                </View>);
    }
}

class Dialog extends Component {
    render() {
        let {name, title, lines} = this.props;
        let lineviews = lines.map(function(line, idx) {
            let parity = (idx % 2) ? "odd" : "even"
                return(<Line key={line.audio}
                        audio={line.audio}
                        text={line.text}
                        parity={parity} />);
        });
        return(<View style={styles.dialog}>
                <Text> Dialog {name}: {title} </Text>
                {lineviews}
               </View>);
    }
}

class Chapter extends Component {
    render() {
        let {name, title, dialogues} = this.props;
        let dialogviews = dialogues.map(function(dialog) {
            return(<Dialog key={dialog.name}
                            name={dialog.name}
                            title={dialog.title}
                            lines={dialog.lines}/>);
        });
        return(<View style={styles.chapter}>
                <Text style={styles.chapHeading}>
                    Chapter {name}: {title}
                </Text>
                {dialogviews}
               </View>);
    }
}

export default class Practice extends Component {
    render() {
        let chapters = content.chapters;
        let chapterviews = chapters.map(function(chapter) {
            return(<Chapter key={chapter.name}
                            name={chapter.name}
                            title={chapter.title}
                            dialogues={chapter.dialogues}/>);
        });
        return(<View style={styles.container}>
                {chapterviews}
               </View>);
    }
}
// TODO: figure out code reuse between index.js and here; eg. the 'container' class is duplicated.
const styles = StyleSheet.create({
    playButton: {
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        padding:'0%',
        height:'80%',
    },
    chapHeading: {
        fontSize: 20,
        marginBottom: 20,
    },
    chapter: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding:'0%',
    },
    dialog: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding:'0%',
        width: '100%',
    },
    lineLeft: {
        padding:10,
    },
    lineRight: {
        padding:10,
        alignSelf: 'flex-end',
    },
});
