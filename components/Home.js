import React from 'react';
import { LinearGradient } from 'expo';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Dimensions, Animated } from 'react-native';
import Playlist from './Playlist';
import EmptyPlaylist from './EmptyPlaylist';

export default class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'PLAYLISTS',
      headerTitleStyle: {
        fontWeight: 'bold',
        letterSpacing: 2,
      },
      headerRight: (
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={{ marginRight: 12 }}
        >
          <AntDesign name='user' size={24} />
        </TouchableOpacity>
      ),
    };
  };

  state = {
    fadeAnim: new Animated.Value(0),
  }

  componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 2000,
    }).start();
  }

  render() {
    let { fadeAnim } = this.state;
    return (
      <Animated.View style={[{ ...this.props.style, opacity: fadeAnim, }, styles.container]}>
        <View style={{ height: 500, width: '90%' }}>
          <LinearGradient colors={['white', '#ffffff00']} style={styles.gradientTop} />
          <FlatList
            data={this.props.playlists}
            contentContainerStyle={styles.playlists}
            showsVerticalScrollIndicator={false}
            numColumns={2} renderItem={({ item, index }) => {
              return (
                <Playlist item={item} index={index} name={item.name} count={item.trackCount} thumbnail={item.thumbnail}/>
              )
            }}>
          </FlatList>
          <LinearGradient colors={['#ffffff00', 'white']} style={styles.gradientBottom} />
        </View>
        <TouchableOpacity style={styles.startButton} activeOpacity={0.9} onPress={() => alert('Let\'s get this bread')}>
          <MaterialCommunityIcons name='play' size={64} style={{ color: '#fff' }} />
        </TouchableOpacity>
        <View style={styles.oval} />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  playlists: {
    paddingTop: 24,
    paddingBottom: 24,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 24,
  },
  gradientTop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 24,
    zIndex: 999
  },
  gradientBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 24,
    zIndex: 999
  },
  startButton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 50,
    width: 100,
    height: 100,
    backgroundColor: '#7ae48c',
    bottom: Dimensions.get('window').width / 4,
    zIndex: 999,
    shadowOffset: { width: 0, height: 2, },
    shadowColor: 'grey',
    shadowOpacity: 0.5,
  },
  oval: {
    position: 'absolute',
    bottom: -1 * Dimensions.get('window').width * 1.625,
    width: Dimensions.get('window').width * 2,
    height: Dimensions.get('window').width * 2,
    borderRadius: Dimensions.get('window').width,
    borderWidth: 0.5,
    borderColor: 'rgba(128,128,128,0.1)',
    backgroundColor: 'rgba(245,245,245,0.5)',
  },
});
