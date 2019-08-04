import React from 'react';
import { Audio } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo';
import { StyleSheet, Image, TouchableOpacity, View, FlatList, Dimensions, RefreshControl } from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import Track from './Track';

const soundObject = new Audio.Sound();

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  componentWillUnmount() {
    soundObject.unloadAsync();
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: params.name,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}
          style={{ paddingLeft: 12, width: 64 }}
        >
          <MaterialCommunityIcons name='home-outline' size={30} />
        </TouchableOpacity>
      ),
    };
  };

  _onRefresh = async () => {
    const { access_token, refresh_token } = this.props.auth;
    this.setState({ fetchingPlaylistTracks: true });
    await this.props.fetchPlaylistTracks(access_token, refresh_token, {
      url: this.props.navigation.getParam('url'),
      index: this.props.navigation.getParam('index')
    });
    this.setState({ fetchingPlaylistTracks: false })
  }

  renderRefreshControl = () => (
    <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />
  )

  _onPlaybackStatusUpdate = playbackStatus => {
    if (playbackStatus.didJustFinish) {
      this.setState({ trackPlaying: null });
    }
  };

  deleteTrack = async (playlistId, trackUri) => {
    const { access_token, refresh_token } = this.props.auth;
    await this.props.deleteTrack(access_token, refresh_token, playlistId, trackUri)
    await this._onRefresh()
  }

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
    const thumbnail = this.props.navigation.getParam('thumbnail');
    const playlistId = this.props.navigation.getParam('playlistId');
    return (
      <View style={styles.container}>
        <AnimatedLoader
          visible={!this.state.artworkLoaded}
          overlayColor='#fff'
          animationStyle={styles.lottie}
          speed={1.5}
          source={require('../assets/loading.json')}
        />
        <View style={styles.artworkContainer}>
          <Image style={styles.artwork} source={{ uri: thumbnail }} onLoad={() => this.setState({ artworkLoaded: true })} />
        </View>
        <View style={styles.playlistContainer}>
          <LinearGradient colors={['white', '#ffffff00']} style={styles.gradientTop} />
          { this.props.tracks && this.props.tracks.length &&
          <FlatList
            data={this.props.tracks}
            contentContainerStyle={styles.playlists}
            showsVerticalScrollIndicator={false}
            refreshControl={this.renderRefreshControl()}
            renderItem={({ item, index }) => (
              <Track
                item={item}
                trackPlaying={this.state.trackPlaying}
                playlistId={playlistId}
                deleteTrack={this.deleteTrack}
                previewTrack={this.previewTrack}
                lastItem={index == this.props.tracks.length - 1}
              >
              </Track>
            )}
          >
          </FlatList>
          }
          <LinearGradient colors={['#ffffff00', 'white']} style={styles.gradientBottom} />
        </View>
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
    height: '60%',
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
  artworkContainer: {
    shadowOffset: { width: 0, height: 2, },
    shadowColor: 'grey',
    shadowOpacity: 1.0,
    marginTop: 16,
    marginBottom: 24
  },
  artwork: {
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 2
  }
});
