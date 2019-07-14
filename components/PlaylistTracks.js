import React from 'react';
import { Audio } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo';
import { StyleSheet, Image, Text, TouchableOpacity, View, FlatList, Dimensions, RefreshControl } from 'react-native';

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
        letterSpacing: 2,
      },
      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}
          style={{ marginLeft: 12 }}
        >
          <MaterialCommunityIcons name='home-outline' size={26} />
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
    return (
      <View style={styles.container}>
        <View style={styles.artworkContainer}>
          <Image style={styles.artwork} source={{ uri: thumbnail }} />
        </View>
        <View style={styles.playlistContainer}>
          <LinearGradient colors={['white', '#ffffff00']} style={styles.gradientTop} />
          <FlatList
            data={this.props.tracks}
            contentContainerStyle={styles.playlists}
            showsVerticalScrollIndicator={false}
            refreshControl={this.renderRefreshControl()}
            renderItem={({ item }) => (
              <TouchableOpacity activeOpacity={0.9} onPress={() => this.previewTrack(item.preview)}>
                <View style={styles.track}>
                  <View style={styles.divider} />
                  <Image style={styles.trackArt} source={{ uri: item.thumbnail }} />
                  <Text
                    numberOfLines={1}
                    style={this.state.trackPlaying == item.preview && item.preview ? [styles.trackName, { color: '#7ae48c' }] : styles.trackName}
                  >
                    {item.track}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={this.state.trackPlaying == item.preview && item.preview ? [styles.trackArtists, { color: '#7ae48c' }] : styles.trackArtists}
                  >
                    {item.artists.join(', ')} - {item.album}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          >
          </FlatList>
          <LinearGradient colors={['#ffffff00', 'white']} style={styles.gradientBottom} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  divider: {
    marginBottom: 12,
    borderBottomColor: 'rgba(128,128,128,0.3)',
    borderBottomWidth: 1,
    width: '100%'
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
    width: '85%',
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
  },
  track: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 72,
  },
  trackName: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    position: 'absolute',
    marginLeft: 72,
    marginTop: 16
  },
  trackArtists: {
    fontSize: 12,
    position: 'absolute',
    marginLeft: 72,
    marginTop: 40
  },
  trackArt: {
    height: 48,
    width: 48
  }
});
