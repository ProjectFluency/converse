import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableHighlight } from 'react-native';
const Sound = require('react-native-sound');
var content = require('./config/scripts');
import FlipCard from 'react-native-flip-card';


function playSound(soundfile, folder) {
    folder = (folder) ? folder : Sound.MAIN_BUNDLE;
    let sound = new Sound(soundfile, folder, (error) => {
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
    return sound;
}

class Line extends Component {
    render() {
        let {audio, text, parity} = this.props;
        let viewStyle = (parity === "even") ? styles.lineLeft : styles.lineRight;
        let textStyle = (parity === "even") ? styles.lineTextLeft: styles.lineTextRight;
        return(<View style={viewStyle}>
                  <Text style={textStyle}>{text}</Text>
                </View>);
    }
}

class PlayButton extends Component {
    state = {
        soundPlaying: null,
    }
    constructor(props) {
        super(props);
        Sound.setCategory('Ambient', true);

        this.playSound = () => {
            let sound = playSound(this.props.audio);
            this.setState({soundPlaying: sound});
        }
        this.stopSound = () => {
            this.state.soundPlaying.stop();
            this.setState({soundPlaying: null});
        }
    }
    render() {
        let playOrStop = null;
        if(this.state.soundPlaying) {
            playOrStop = <Button style={styles.playButton}
                                 color='#922'
                                 onPress = {this.stopSound}
                                 title = "□ STOP" />
        } else {
            playOrStop = <Button style={styles.playButton}
                                 onPress = {this.playSound}
                                 title="▷  Play" />
        }
        return(playOrStop);
    }
}

class Dialog extends Component {
    render() {
        let {name, title, lines, audio} = this.props;
        let lineviews = lines.map(function(line, idx) {
            let parity = (idx % 2) ? "odd" : "even"
                return(<Line key={line.audio}
                        audio={line.audio}
                        text={line.text}
                        parity={parity} />);
        });
        return(<FlipCard
                style={styles.card}
                flipHorizontal={true}
                flipVertical={false}>
                <View style={styles.cardFace}>
                    <Text style={styles.cardHeading}> {title} </Text>
                </View>
                <View style={styles.cardBack}>
                    <View style={styles.dialog}>
                        {lineviews}
                    </View>
                    <PlayButton audio={audio} />
                </View>
               </FlipCard>);
    }
}

class Chapter extends Component {
    render() {
        let {name, title, dialogues} = this.props;
        let dialogviews = dialogues.map(function(dialog) {
            return(<Dialog key={dialog.name}
                            name={dialog.name}
                            title={dialog.title}
                            lines={dialog.lines}
                            audio={dialog.audio}/>);
        });
        return(<View style={styles.chapter}>
                <Text style={styles.chapHeading}>
                    Chapter {name}: {title}
                </Text>
                <View style={styles.allCards}>
                    {dialogviews}
                </View>
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
        flex: 0,
    },
    playButton: {
        color: '#922',
        flex: 0,
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
        alignItems: 'center',
        padding:'0%',
    },
    dialog: {
        flex: 0,
        justifyContent: 'space-around',
        alignItems: 'flex-start',
    },
    allCards: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    card: {
        flex: 0,
        height: 250,
        width: 170,
        margin: 5,
        borderColor: 'transparent',
    },
    cardBack: {
        flex: 1,
        transform: [{scaleX: -1}],
        borderRadius: 10,
        borderColor: '#4990E2',
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 10,
    },
    cardFace: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#4990E2',
    },
    cardHeading: {
        color: '#fff',
        textAlign: 'center',
        padding: 10,
    },
    lineLeft: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    lineRight: {
        alignSelf: 'flex-end',
        paddingTop: 10,
        paddingBottom: 10,
    },
    lineTextLeft: {
    },
    lineTextRight: {
        textAlign: 'right',
    },
});
