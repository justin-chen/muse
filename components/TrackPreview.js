import React from 'react';
import { Audio } from 'expo';
import GestureRecognizer from 'react-native-swipe-gestures';
import { MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons'
import { StyleSheet, Image, Text, TouchableOpacity, View, ImageBackground } from 'react-native';

const soundObject = new Audio.Sound();

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTrackId: null,
      currentTrackInfo: {},
      sessionCount: 0,
      addedCount: 0,
      fetchingTracks: false,
    };

  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Discover',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerStyle: {
        borderBottomWidth: 0,
      },
      headerTransparent: true,
      headerLeft: (
        <TouchableOpacity
          onPress={async () => {
            params.goHome();
            soundObject.unloadAsync();
            navigation.navigate('Home');
          }}
          style={{ paddingLeft: 12, width: 64 }}
        >
          <MaterialCommunityIcons name='home-outline' size={30} />
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity
          onPress={() => { }}
          style={{ marginRight: 14 }}
        >
          <MaterialCommunityIcons name='playlist-check' size={32} />
        </TouchableOpacity>
      ),
      gesturesEnabled: false,
    };
  };

  async componentDidMount() {
    this.props.navigation.setParams({ goHome: this.props.endSession });
    this.setState({ sessionCount: Object.keys(this.props.tracks).length });
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      playThroughEarpieceAndroid: true
    });
    await this.loadTrack();
  }

  async componentDidUpdate(prevProps) {
    const { currentTrackId } = this.state;
    const currProps = this.props;
    const nextTrack = !(currentTrackId in currProps.tracks) && (currentTrackId in prevProps.tracks) && Object.keys(currProps.tracks).length;
    const fetchedTracks = this.state.sessionCount == 0 && Object.keys(currProps.tracks).length;
    if (nextTrack) {
      await this.loadTrack();
    } else if (fetchedTracks) {
      this.setState({ sessionCount: Object.keys(currProps.tracks).length });
      await this.loadTrack();
    }
  }

  loadTrack = async () => {
    const trackIds = Object.keys(this.props.tracks);
    const trackId = trackIds[trackIds.length * Math.random() << 0];
    const preview_url = this.props.tracks[trackId].preview_url;

    try {
      await soundObject.unloadAsync();
      await soundObject.loadAsync({ uri: preview_url });
      await soundObject.setIsLoopingAsync(true);
      await soundObject.playAsync();
    } catch (error) {
      console.log(error)
    }
    this.setState({
      currentTrackId: trackId,
      currentTrackInfo: this.props.tracks[trackId],
    });
  }

  nextTrack = async add => {
    const { currentTrackId, sessionCount, lastClicked } = this.state;
    if (lastClicked && (new Date().getTime() - lastClicked < 1500)) return;
    this.setState({ sessionCount: sessionCount - 1, lastClicked: new Date().getTime() });
    if (add) {
      this.props.addTrack(currentTrackId);
    } else {
      this.props.skipTrack(currentTrackId);
    }
    if (sessionCount <= 1) {
      const { access_token, refresh_token } = this.props.auth;
      const { genres } = this.props;
      await this.props.fetchTracks(access_token, refresh_token, genres);
    }
  }


  render() {
    const track = this.state.currentTrackInfo;
    const count = this.props.added.length;
    return (
      <ImageBackground style={styles.backgroundArtwork} source={{ uri: track ? track.artwork : null }} blurRadius={12}>
        <View style={styles.container}>
          <GestureRecognizer
            onSwipeLeft={() => this.nextTrack(false)}
            onSwipeRight={() => this.nextTrack(true)}
            config={{
              velocityThreshold: 0.3,
              directionalOffsetThreshold: 80
            }}
          >
            <View style={styles.artworkContainer}>
              <Image style={styles.artwork} source={{ uri:  track ? track.artwork : null }} />
            </View>
          </GestureRecognizer>
          <Text style={styles.progress}>{count.toString(10)}{count == 1 ? ' song ' : ' songs '}added to playlist</Text>
          <View style={{ flexDirection: 'row', width: 300, justifyContent: 'space-evenly' }}>
            <TouchableOpacity style={[styles.button, { borderWidth: 2, borderColor: '#EB4F64', backgroundColor: '#EB4F64' }]} activeOpacity={0.7} onPress={() => this.nextTrack(false)}>
              <AntDesign name='close' size={50} style={[styles.icon, { color: 'white', bottom: 8 }]} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { borderWidth: 2, borderColor: '#7ae48c', backgroundColor: '#7ae48c' }]} activeOpacity={0.7} onPress={() => this.nextTrack(true)}>
              <Ionicons name='md-heart' size={50} style={[styles.icon, { color: 'white', bottom: 6 }]} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  lottie: {
    width: 240,
    height: 240
  },
  progress: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 48
  },
  icon: {
    position: 'absolute',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255, 0.5)',
    alignItems: 'center',
    paddingTop: '40%',
  },
  artworkContainer: {
    shadowOffset: { width: 0, height: 2, },
    shadowColor: 'grey',
    shadowOpacity: 1.0,
    marginBottom: 48
  },
  artwork: {
    width: 300,
    height: 300
  },
  backgroundArtwork: {
    resizeMode: 'cover',
    flex: 1,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    width: 80,
    height: 80,
    zIndex: 999,
    backgroundColor: 'rgba(255,255,255, 0.9)',
    shadowOffset: { width: 0, height: 2, },
    shadowColor: 'grey',
    shadowOpacity: 0.3,
  },
});
