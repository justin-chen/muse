import React from 'react';
import { Audio } from 'expo';
import GestureRecognizer from 'react-native-swipe-gestures';
import { NavigationEvents } from 'react-navigation';
import { MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons'
import { StyleSheet, Image, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import Modal from 'react-native-modal';

const PLACEHOLDER = 'https://via.placeholder.com/650/8BE79A/ffffff?text=Muse';
const soundObject = new Audio.Sound();

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTrackId: null,
      currentTrackInfo: {},
      sessionCount: 0,
      showHomeModal: false,
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params = { header: '' } } = navigation.state;
    return {
      title: params.header,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTransparent: true,
      headerLeft: (
        <TouchableOpacity
          onPress={params.goHome}
          style={{ paddingLeft: 12, width: 64 }}
        >
          <MaterialCommunityIcons name='home-outline' size={30} />
        </TouchableOpacity>
      ),
      gesturesEnabled: false,
    };
  };

  componentWillUnmount() {
    soundObject.unloadAsync();
  }

  componentDidMount() {
    this.props.navigation.setParams({ goHome: this.goHomePrompt, goPreview: this.goPreview });
    this.setState({ sessionCount: Object.keys(this.props.tracks).length });
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      playThroughEarpieceAndroid: true
    });
    this.loadTrack();
  }

  componentDidUpdate(prevProps) {
    const { currentTrackId, sessionCount } = this.state;
    const currProps = this.props;
    const nextTrack = !(currentTrackId in currProps.tracks) && (currentTrackId in prevProps.tracks) && Object.keys(currProps.tracks).length;
    const fetchedTracks = sessionCount == 0 && !Object.keys(prevProps.tracks).length && Object.keys(currProps.tracks).length;
    if (nextTrack) {
      this.loadTrack();
    } else if (fetchedTracks) {
      this.setState({ sessionCount: Object.keys(currProps.tracks).length }, this.loadTrack);
    }
  }

  goHomePrompt = () => {
    if (this.props.added.length) {
      this.setState({ showHomeModal: true });
    } else {
      this.goHome();
    }
  }

  goHome = () => {
    this.setState({ showHomeModal: false });
    this.props.endSession();
    soundObject.unloadAsync();
    this.props.navigation.navigate('Home');
  }

  goPreview = () => {
    if (!this.props.added.length) {
      alert('No songs added to playlist builder.');
    } else {
      soundObject.stopAsync();
      this.props.navigation.navigate('PlaylistPreview', { added: this.props.added.length });
    }
  }

  loadTrack = async () => {
    const trackIds = Object.keys(this.props.tracks);
    const trackId = trackIds[trackIds.length * Math.random() << 0];
    const track = this.props.tracks[trackId];

    if (!track) return;

    this.setState({
      currentTrackId: trackId,
      currentTrackInfo: track,
    });

    try {
      await soundObject.unloadAsync();
      await soundObject.loadAsync({ uri: track.preview_url });
      await soundObject.setIsLoopingAsync(true);
      await soundObject.playAsync();
    } catch (error) {
      console.log(error)
    }
  }

  resumeTrack = async () => {
    const status = await soundObject.getStatusAsync();
    const addedCount = this.props.added.length;
    this.props.navigation.setParams({ header: addedCount ? `${addedCount.toString(10)} ${addedCount == 1 ? 'Song' : 'Songs'} Added` : '' });
    try {
      if (status.isLoaded && !status.isPlaying) {
        await soundObject.setIsLoopingAsync(true);
        await soundObject.playAsync();
      }
    } catch (error) {
      console.log(error)
    }
  }

  nextTrack = add => {
    const { currentTrackId, sessionCount, lastClicked } = this.state;

    if (lastClicked && (new Date().getTime() - lastClicked < 1000)) return;
    this.setState({ sessionCount: sessionCount - 1, lastClicked: new Date().getTime() });
    if (add) {
      const addedCount = this.props.added.length;
      this.props.navigation.setParams({ header: `${(addedCount + 1).toString(10)} ${(addedCount + 1) == 1 ? 'Song' : 'Songs'} Added` });
      this.props.addTrack(currentTrackId);
    } else {
      this.props.skipTrack(currentTrackId);
    }
    if (sessionCount <= 1) {
      const { access_token, refresh_token } = this.props.auth;
      const { genres } = this.props;

      if (this.props.navigation.getParam('personalized')) {
        this.props.fetchPersonalizedTracks(access_token, refresh_token);
      } else if (this.props.navigation.getParam('categories')) {
        this.props.fetchTracks(access_token, refresh_token, genres);
      }

    }
  }

  render() {
    const track = this.state.currentTrackInfo;
    return (
      <ImageBackground style={styles.backgroundArtwork} source={{ uri: track.artwork ? track.artwork[0] : PLACEHOLDER }} blurRadius={12}>
        <Modal style={{ alignItems: 'center' }} isVisible={this.state.showHomeModal}>
          <View style={styles.modal}>
            <Text style={{ fontWeight: 'bold', marginBottom: 24, fontSize: 18 }}>Go home?</Text>
            <Text style={{ marginBottom: 24 }}>Your selections will be discarded.</Text>
            <View style={{ flexDirection: 'row', width: 300, justifyContent: 'space-evenly' }}>
              <TouchableOpacity style={[styles.ctaButton, { borderWidth: 2, borderColor: '#EB4F64', backgroundColor: '#EB4F64' }]} activeOpacity={0.7} onPress={this.goHome}>
                <Text style={styles.ctaText}>CONTINUE</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.ctaButton, { borderWidth: 2, borderColor: '#7ae48c', backgroundColor: '#7ae48c' }]} activeOpacity={0.7} onPress={() => this.setState({ showHomeModal: false })}>
                <Text style={styles.ctaText}>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <NavigationEvents
          onWillFocus={this.resumeTrack}
        />
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
              <Image style={styles.artwork} source={{ uri: track.artwork ? track.artwork[0] : PLACEHOLDER }} />
            </View>
          </GestureRecognizer>
          <View style={{ flexDirection: 'row', width: 300, justifyContent: 'space-evenly' }}>
            <TouchableOpacity style={[styles.button, { borderWidth: 2, borderColor: '#EB4F64', backgroundColor: '#EB4F64' }]} activeOpacity={0.7} onPress={() => this.nextTrack(false)}>
              <AntDesign name='close' size={50} style={[styles.icon, { color: 'white', bottom: 8 }]} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { borderWidth: 2, borderColor: '#7ae48c', backgroundColor: '#7ae48c' }]} activeOpacity={0.7} onPress={() => this.nextTrack(true)}>
              <Ionicons name='md-heart' size={50} style={[styles.icon, { color: 'white', bottom: 6 }]} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.exportButton}
            onPress={this.goPreview}
          >
            <Text style={styles.exportText}>
              FINISH AND EXPORT
          </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
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
  ctaText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  ctaButton: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    width: '40%',
    zIndex: 999,
    backgroundColor: 'rgba(255,255,255, 0.9)',
    shadowOffset: { width: 0, height: 2, },
    shadowColor: 'grey',
    shadowOpacity: 0.3,
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
  modal: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: '90%', borderRadius: 30,
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 24,
    paddingRight: 24
  }
});
