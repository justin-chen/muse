import React from 'react';
import { Audio } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo';
import { StyleSheet, Text, Image, TouchableOpacity, View, FlatList, Dimensions, RefreshControl } from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import Track from './Track';

const soundObject = new Audio.Sound();

export default class PlaylistTracks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trackPlaying: false,
      refreshing: false,
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
      title: params.name,
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
            navigation.navigate('Home');
          }}
          style={{ paddingLeft: 12, width: 64 }}
        >
          <MaterialCommunityIcons name='home-outline' size={30} />
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
    this.props.navigation.setParams({
      readOnly: !state,
    });
  }

  _onRefresh = async () => {
    const { access_token, refresh_token } = this.props.auth;
    this.setState({ refreshing: true });
    await this.props.fetchPlaylistTracks(access_token, refresh_token, {
      url: this.props.navigation.getParam('url'),
      index: this.props.navigation.getParam('index')
    });
    this.setState({ refreshing: false })
  }

  renderRefreshControl = () => (
    <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />
  )

  _onPlaybackStatusUpdate = playbackStatus => {
    if (playbackStatus.didJustFinish) {
      this.setState({ trackPlaying: null });
    }
  };

  deleteTrack = async (playlistId, trackUri, preview_url) => {
    const { access_token, refresh_token } = this.props.auth;
    const trackCount = this.props.tracks.length;
    if (this.state.trackPlaying == preview_url) {
      soundObject.unloadAsync();
    }
    await this.props.deleteTrack(access_token, refresh_token, playlistId, trackUri);
    if (!(trackCount - 1)) {
      this.props.navigation.navigate('Home');
    } else {
      this.props.fetchPlaylistTracks(access_token, refresh_token, {
        url: this.props.navigation.getParam('url'),
        index: this.props.navigation.getParam('index')
      });
    }
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
      playThroughEarpieceAndroid: true,
      staysActiveInBackground: false,
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
     
        <View style={styles.playlistContainer}>
          { this.props.tracks && this.props.tracks.length &&
          <FlatList
            data={this.props.tracks}
            contentContainerStyle={styles.playlists}
            showsVerticalScrollIndicator={false}
            refreshControl={this.renderRefreshControl()}
            ListHeaderComponent={
            <View style={styles.artworkContainer}>
              <Image style={styles.artwork} source={{ uri: thumbnail }} onLoad={() => this.setState({ artworkLoaded: true })} />
            </View>
            }
            ListHeaderComponentStyle={{alignItems: 'center', marginBottom: 12}}
            renderItem={({ item, index }) => (
              <Track
                item={item}
                trackPlaying={this.state.trackPlaying}
                playlistId={playlistId}
                deleteTrack={this.deleteTrack}
                previewTrack={this.previewTrack}
                readOnly={this.props.navigation.getParam('readOnly')}
                lastItem={index == this.props.tracks.length - 1}
              >
              </Track>
            )}
          >
          </FlatList>
          }
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
  },
  playlistContainer: {
    height: '100%',
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
    marginTop: 18,
    marginBottom: 24
  },
  artwork: {
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 2
  }
});
