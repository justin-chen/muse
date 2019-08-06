import React from 'react';
import { Audio } from 'expo';
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo';
import { StyleSheet, TouchableOpacity, View, FlatList, Text } from 'react-native';
import Track from './Track';

const soundObject = new Audio.Sound();

export default class PlaylistPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trackPlaying: false,
      readOnly: true,
    };
    this.props.navigation.setParams({
      readOnly: true,
      enableDelete: this.enableDelete
    });
  }

  componentWillUnmount() {
    soundObject.unloadAsync();
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Song Pool',
      headerStyle: {
        backgroundColor: '#fafafa',
        height: 59,
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        letterSpacing: 1,
        fontSize: 22,
      },
      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('TrackPreview');
          }
          }
          style={{ width: 64, paddingLeft: 18 }}
        >
          <Ionicons name='ios-arrow-back' size={32} />
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity
          onPress={params.enableDelete}
          style={{ marginRight: 18 }}
        >
         <Text style={{fontSize: 18}}>{params.readOnly || params.readOnly == undefined ? 'Edit' : 'Done'}</Text>
        </TouchableOpacity>
      )
    };
  };

  enableDelete = () => {
    const state = this.props.navigation.getParam('readOnly');
    this.setState({ readOnly: !state });
    this.props.navigation.setParams({
      readOnly: !state,
    });
  }

  deleteTrack = (key, preview_url) => {
    const count = this.props.added.length - 1;
    if (this.state.trackPlaying == preview_url) {
      soundObject.unloadAsync();
    }
    this.props.deleteAddedTrack(key);
    if (count == 0) {
      this.props.navigation.navigate('TrackPreview');
    } else {
      this.props.navigation.setParams({added: count});
    }
  }

  _onPlaybackStatusUpdate = playbackStatus => {
    if (playbackStatus.didJustFinish) {
      this.setState({ trackPlaying: null });
    }
  };

  previewTrack = async preview_url => {
    if (!preview_url) {
      alert("No preview available.");
      return;
    }
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      playThroughEarpieceAndroid: true
    });
    try {
      await soundObject.unloadAsync();
      if (this.state.trackPlaying != preview_url) {
        soundObject.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
        await soundObject.loadAsync({ uri: preview_url });
        soundObject.playAsync();
        this.setState({ trackPlaying: preview_url })
      } else {
        this.setState({ trackPlaying: null })
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const addedCount = this.props.navigation.getParam('added');
    return (
      <View style={styles.container}>
        <View style={styles.playlistContainer}>
          <LinearGradient colors={['white', '#ffffff00']} style={styles.gradientTop} />
          <FlatList
            data={this.props.added}
            contentContainerStyle={styles.playlists}
            showsVerticalScrollIndicator={false}
            extraData={this.state}
            renderItem={({ item, index }) => (
              <Track
                item={item}
                trackPlaying={this.state.trackPlaying}
                deleteTrack={this.deleteTrack}
                previewTrack={this.previewTrack}
                readOnly={this.props.navigation.getParam('readOnly')}
                lastItem={index == this.props.added.length - 1}
              >
              </Track>
            )}
          >
          </FlatList>
          <LinearGradient colors={['#ffffff00', 'white']} style={styles.gradientBottom} />
        </View>
        <TouchableOpacity
          style={styles.exportButton}
          onPress={() => {
            soundObject.unloadAsync();
            this.props.navigation.navigate('PlaylistExport');
          }}
        >
          <Text style={styles.exportText}>
            {`EXPORT ${addedCount} ${addedCount > 1 ? 'SONGS' : 'SONG'}`}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  lottie: {
    width: 240,
    height: 240
  },
  playlists: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 24,
  },
  playlistContainer: {
    height: '80%',
    width: '80%',
  },
  gradientTop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 12,
    zIndex: 999
  },
  gradientBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 12,
    zIndex: 999
  },
  exportButton: {
    position: 'absolute',
    bottom: 48,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
    borderRadius: 50,
    backgroundColor: '#7ae48c',
  },
  exportText: {
    lineHeight: 36,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
