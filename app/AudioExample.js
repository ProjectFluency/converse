import React, {Component} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Platform,
  PermissionsAndroid,
} from 'react-native';

import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';

class AudioExample extends Component {
    constructor (props) {
        super(props);
    }

    state = {
      currentTime: 0.0,
      recording: false,
      stoppedRecording: false,
      finished: false,
      audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac',
      hasPermission: undefined,
    };

    prepareRecordingPath(audioPath){
      AudioRecorder.prepareRecordingAtPath(audioPath, {
        SampleRate: 22050,
        Channels: 1,
        AudioQuality: "Low",
        AudioEncoding: "aac",
        AudioEncodingBitRate: 32000
      });
    }

    componentDidMount() {
      this._checkPermission().then((hasPermission) => {
        this.setState({ hasPermission });

        if (!hasPermission) return;

        this.prepareRecordingPath(this.state.audioPath);

        AudioRecorder.onProgress = (data) => {
          this.setState({currentTime: Math.floor(data.currentTime)});
        };

        AudioRecorder.onFinished = (data) => {
          // Android callback comes in the form of a promise instead.
          if (Platform.OS === 'ios') {
            this._finishRecording(data.status === "OK", data.audioFileURL);
          }
        };
      });
    }

    _checkPermission() {
      if (Platform.OS !== 'android') {
        return Promise.resolve(true);
      }

      const rationale = {
        'title': 'Microphone Permission',
        'message': 'AudioExample needs access to your microphone so you can record audio.'
      };

      return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
        .then((result) => {
          console.log('Permission result:', result);
          return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
        });
    }

    _renderButton(title, onPress, active) {
      var style = (active) ? styles.activeButtonText : styles.buttonText;

      return (
        <TouchableHighlight style={styles.button} onPress={onPress}>
          <Text style={style}>
            {title}
          </Text>
        </TouchableHighlight>
      );
    }

    async _pause() {
      if (!this.state.recording) {
        console.warn('Can\'t pause, not recording!');
        return;
      }

      this.setState({stoppedRecording: true, recording: false});

      try {
        const filePath = await AudioRecorder.pauseRecording();

        // Pause is currently equivalent to stop on Android.
        if (Platform.OS === 'android') {
          this._finishRecording(true, filePath);
        }
      } catch (error) {
        console.error(error);
      }
    }

    async _stop() {
      if (!this.state.recording) {
        console.warn('Can\'t stop, not recording!');
        return;
      }

      this.setState({stoppedRecording: true, recording: false});

      try {
        const filePath = await AudioRecorder.stopRecording();

        if (Platform.OS === 'android') {
          this._finishRecording(true, filePath);
        }
        return filePath;
      } catch (error) {
        console.error(error);
      }
    }

    _stopPlaying() {
        this.state.sound.stop();
        this.setState({donePlaying: true, playing: false, sound: null});
    }

    async _play() {
      if (this.state.recording) {
        await this._stop();
      }
      that = this;

      // These timeouts are a hacky workaround for some issues with react-native-sound.
      // See https://github.com/zmxv/react-native-sound/issues/89.
      setTimeout(() => {
        var sound = new Sound(this.state.audioPath, '', (error) => {
          if (error) {
            console.log('failed to load the sound', error);
          }
        });

        setTimeout(() => {
          that.setState({playing: true, donePlaying: false, sound: sound});
          sound.play((success) => {
            if (success) {
              that.setState({donePlaying: true, playing: false, sound: null});
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
            }
          });
        }, 100);
      }, 100);
    }

    async _record() {
      if (this.state.recording) {
        console.warn('Already recording!');
        return;
      }

      if (!this.state.hasPermission) {
        console.warn('Can\'t record, no permission granted!');
        return;
      }

      if(this.state.stoppedRecording){
        this.prepareRecordingPath(this.state.audioPath);
      }

      this.setState({recording: true, stoppedRecording: false,
                     donePlaying: false, playing: false});

      try {
        const filePath = await AudioRecorder.startRecording();
      } catch (error) {
        console.error(error);
      }
    }

    _finishRecording(didSucceed, filePath) {
      this.setState({ finished: didSucceed });
      console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath}`);
    }

    render() {
      let innerview = null;
      let mode = null;
      if (this.state.recording) { mode = 'recording'; }
      else if (this.state.stoppedRecording) {
        if (this.state.donePlaying) {mode = 'donePlaying';}
        else if (this.state.playing) {mode = 'playing'; }
        else { mode = 'doneRecording'; }
      }
      else { mode = 'beginning'; }
      console.log(mode);
      switch(mode) {
          case 'beginning':
              innerview = this._renderButton("RECORD", () => {this._record()}, this.state.recording );
              break;
          case 'playing':
              innerview = this._renderButton("...", () => {this._stopPlaying()} );
              break;
          case 'recording':
              innerview = this._renderButton("STOP", () => {this._stop()} );
              break;
          case 'doneRecording':
          case 'donePlaying':
              innerview = <View style={styles.inline}>
                            {this._renderButton("REDO", () => {this._record()}, this.state.recording )}
                            <Text> | </Text>
                            {this._renderButton("REPLAY", () => {this._play()} )}
                            <Text> | </Text>
                            {this._renderButton("SUBMIT", () => {console.log("SUBMIT!")} )}
                          </View>;
              break;
          default:
              innerview = <Text> Unsupported mode: {mode} </Text>;
      }

      //<Text style={styles.progressText}>{this.state.currentTime}s</Text>
      return (
        <View style={styles.container}>
          <View style={styles.controls}>
            {innerview}
          </View>
        </View>
      );
    }
  }

  var styles = StyleSheet.create({
    container: {
      flex: 0,
      backgroundColor: "#2b608a",
      justifyContent: 'center',
      alignItems: 'center',
    },
    controls: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 0,
    },
    inline: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 0,
    },
    progressText: {
      paddingTop: 5,
      fontSize: 10,
      color: "#fff"
    },
    button: {
      padding: 20
    },
    disabledButtonText: {
      color: '#eee'
    },
    buttonText: {
      fontSize: 20,
      color: "#fff"
    },
    activeButtonText: {
      fontSize: 20,
      color: "#B81F00"
    }

  });

export default AudioExample;
