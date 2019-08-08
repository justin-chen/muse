import React from 'react';
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo';
import { StyleSheet, TextInput, TouchableOpacity, View, FlatList, Text, RefreshControl } from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import PlaylistRow from './PlaylistRow';
import Modal from 'react-native-modal';

export default class PlaylistExport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewPlaylistModal: false,
      text: '',
      refreshing: false,
      exporting: false,
      done: false,
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add to Playlist',
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
            navigation.navigate('PlaylistPreview');
          }
          }
          style={{ width: 64, paddingLeft: 18 }}
        >
          <Ionicons name='ios-arrow-back' size={32} />
        </TouchableOpacity>
      ),
    };
  };

  createPlaylist = async () => {
    if (this.state.text) {
      const { access_token, refresh_token } = this.props.auth;
      const { id } = this.props.user.profile;
      await this.props.createPlaylist(access_token, refresh_token, id, this.state.text);
      this.props.fetchPlaylists(access_token, refresh_token, id);
      this.setState({showNewPlaylistModal: false});
    } else {
      alert('Playlist name cannot be blank.');
    }
  }

  exportToPlaylist = async playlistId => {
    const { access_token, refresh_token } = this.props.auth;
    const { id } = this.props.user.profile;
    const tracks = this.props.added.map(track => track.spotify_uri)
    const artists = this.props.added.map(track => track.artist_id);
    this.setState({ exporting: true });
    await this.props.addTracksToPlaylist(access_token, refresh_token, playlistId, tracks);
    this.props.updateUserSeeds(access_token, refresh_token, artists);
    this.props.fetchPlaylists(access_token, refresh_token, id);
    this.props.endSession();
    this.setState({ exporting: false, done: true });
    setTimeout(() => {
      this.props.navigation.navigate('Home');
    }, 1000);
  }

  _onRefresh = async () => {
    const { access_token, refresh_token } = this.props.auth;
    const { id } = this.props.user.profile;
    this.setState({ refreshing: true });
    await this.props.fetchPlaylists(access_token, refresh_token, id);
    this.setState({ refreshing: false })
  }

  renderRefreshControl = () => (
    <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />
  )

  render() {
    return (
      <View style={styles.container}>
        <AnimatedLoader
          visible={this.state.exporting}
          overlayColor='#fff'
          animationStyle={styles.lottie}
          speed={1.5}
          source={require('../assets/loading.json')}
        />
        <AnimatedLoader
          visible={this.state.done && !this.state.exporting}
          overlayColor='#fff'
          animationStyle={styles.lottieDone}
          speed={1}
          loop={false}
          source={require('../assets/donecheck.json')}
        />
        <Modal style={{ alignItems: 'center' }} isVisible={this.state.showNewPlaylistModal} onShow={() => this.textInput.focus() }>
          <View style={styles.modal}>
            <Text style={{ fontWeight: 'bold', marginBottom: 24, fontSize: 18 }}>Create a new playlist</Text>
            <TextInput
              style={styles.textInput}
              placeholder={'New Playlist'}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
              ref={(input) => this.textInput = input}
            />
            <View style={{ flexDirection: 'row', width: 300, justifyContent: 'space-evenly' }}>
              <TouchableOpacity style={[styles.ctaButton, { borderWidth: 2, borderColor: '#EB4F64', backgroundColor: '#EB4F64' }]} activeOpacity={0.7} onPress={() => this.setState({ showNewPlaylistModal: false })}>
                <Text style={styles.ctaText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.ctaButton, { borderWidth: 2, borderColor: '#7ae48c', backgroundColor: '#7ae48c' }]} activeOpacity={0.7} onPress={this.createPlaylist}>
                <Text style={styles.ctaText}>CREATE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          style={styles.newButton}
          onPress={() => this.setState({showNewPlaylistModal: true})}
        >
          <Text style={styles.newText}>NEW PLAYLIST</Text>
        </TouchableOpacity>
        <View style={styles.playlistContainer}>
          
          <LinearGradient colors={['white', '#ffffff00']} style={styles.gradientTop} />
          <FlatList
            data={this.props.playlists}
            contentContainerStyle={styles.playlists}
            showsVerticalScrollIndicator={false}
            extraData={this.state}
            refreshControl={this.renderRefreshControl()}
            renderItem={({ item, index }) => (
              <PlaylistRow
                item={item}
                exportToPlaylist={this.exportToPlaylist}
                lastItem={index == this.props.playlists.length - 1}
              >
              </PlaylistRow>
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
  lottie: {
    width: 240,
    height: 240
  },
  lottieDone: {
    width: 120,
    height: 120
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
  newButton: {
    alignItems: 'center',
    width: '50%',
    marginBottom: 24,
    paddingTop: 16, 
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
    borderRadius: 50,
    backgroundColor: '#7ae48c',
  },
  newText: {
    lineHeight: 36,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
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
  textInput: {
    height: 48,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 12,
    paddingRight: 12,
    marginBottom: 24
  },
  modal: {
    position: 'absolute',
    top: '25%',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '90%', borderRadius: 30,
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 24,
    paddingRight: 24
  }
});
