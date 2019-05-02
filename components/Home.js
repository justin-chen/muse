import React from 'react';
import { LinearGradient } from 'expo';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Dimensions } from 'react-native';
import EmptyPlaylist from './EmptyPlaylist';

export default class Home extends React.Component {
  static navigationOptions = {
    title: 'PLAYLISTS',
    headerTitleStyle: {
      fontWeight: 'bold',
      letterSpacing: 2,
    },
    headerRight: (
      <TouchableOpacity
        onPress={() => alert('This is a button!')}
        style={{marginRight: 12}}
      >
        <AntDesign name='user' size={24}/>
      </TouchableOpacity>
    ),
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: 500 }}>
          <LinearGradient colors={['white', '#ffffff00']} style={styles.gradientTop} />
          <FlatList
            data={[{ key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }]}
            contentContainerStyle={styles.playlists}
            showsVerticalScrollIndicator={false}
            numColumns={2} renderItem={({ item, index }) => {
              return (
                <EmptyPlaylist item={item} index={index} />
              )
            }}>
          </FlatList>
          <LinearGradient colors={['#ffffff00', 'white']} style={styles.gradientBottom} />
        </View>
        <TouchableOpacity style={styles.startButton} activeOpacity={0.9} onPress={() => alert('Let\'s get this bread')}>
            <MaterialCommunityIcons name='play' size={64} style={{color: '#fff'}}/>
        </TouchableOpacity>
        <View style={styles.oval} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 2,
    textAlign: 'center',
  },
  playlists: {
    paddingTop: 24,
    paddingBottom: 24
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
    backgroundColor: 'rgba(245,245,245,0.5)',
  },
});
