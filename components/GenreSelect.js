import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { LinearGradient } from 'expo';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AnimatedLoader from 'react-native-animated-loader';
import Genre from './Genre';
import genres from '../utils/genres';

export default class GenreSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingTracks: false
    }
    this.props.navigation.setParams({
      genreAll: this.genreAll,
      selectAll: true,
    });
  }

  componentWillUnmount() {
    this.props.genreUnselectAll()
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return ({
      title: params.header,
      headerStyle: {
        borderBottomWidth: 0,
      },
      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SessionInitiation');
          }
          }
          style={{ width: 64, paddingLeft: 18 }}
        >
          <Ionicons name='ios-arrow-back' size={32} />
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity
          onPress={() => params.genreAll()}
          style={{ marginRight: 18 }}
        >
          {params.selectAll || params.selectAll == undefined ?
            <Text>Select All</Text> : <Text>Unselect All</Text>
          }
        </TouchableOpacity>
      )
    });
  }

  startMuseSession = async () => {
    const { access_token, refresh_token } = this.props.auth;
    const categories = Object.entries(this.props.genres).filter(genre => genre[1]).map(genre => genre[0]);
    this.setState({ fetchingTracks: true });
    await this.props.fetchTracks(access_token, refresh_token, categories);
    this.setState({ fetchingTracks: false })
    this.props.navigation.navigate('TrackPreview');
  }

  genreToggle = (genre, selected) => {
    if (selected) {
      this.props.navigation.setParams({ header: `${this.props.genresSelected + 1} Selected`, selectAll: (this.props.genresSelected + 1) < 22 });
    } else {
      this.props.navigation.setParams({ header: this.props.genresSelected == 1 ? 'Categories' : `${this.props.genresSelected - 1} Selected`, selectAll: true });
    }
    this.props.genreToggle(genre);
  }

  genreAll = () => {
    if ((this.props.genresSelected) < 22) {
      this.props.genreSelectAll();
      this.props.navigation.setParams({ selectAll: false, header: '22 Selected' });
    } else {
      this.props.genreUnselectAll();
      this.props.navigation.setParams({ selectAll: true, header: 'Categories' });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <AnimatedLoader
          visible={this.state.fetchingTracks}
          overlayColor='#fff'
          animationStyle={styles.lottie}
          speed={1.5}
          source={require('../assets/loading.json')}
        />
        <LinearGradient colors={['white', '#ffffff00']} style={styles.gradient} />
        <FlatList
          data={genres}
          contentContainerStyle={styles.genreList}
          showsVerticalScrollIndicator={false}
          extraData={this.props.genres}
          numColumns={2} renderItem={({ item, index }) => {
            return (
              <Genre item={item} index={index} checked={this.props.genres[item.key]} genreToggle={this.genreToggle} />
            )
          }}>
        </FlatList>
        <LinearGradient colors={['#ffffff00', 'white']} style={styles.gradientBottom} />
        <TouchableOpacity style={styles.startButton} activeOpacity={0.95} onPress={this.startMuseSession}>
          <MaterialCommunityIcons name='play' size={64} style={{ color: '#fff' }} />
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
  titleText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    marginTop: 12,
    height: '90%'
  },
  genreList: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 128
  },
  nextButton: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
    marginTop: 32,
    marginBottom: 10,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#7ae48c',
    backgroundColor: '#7ae48c',
  },
  nextText: {
    lineHeight: 36,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  gradient: {
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
  startButton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 50,
    width: 100,
    height: 100,
    backgroundColor: '#7ae48c',
    right: 32,
    bottom: 4,
    zIndex: 999,
    shadowOffset: { width: 0, height: 2, },
    shadowColor: 'grey',
    shadowOpacity: 0.5,
  },
});
