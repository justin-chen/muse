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
          onPress={params.genreAll}
          style={{ marginRight: 20 }}
        >
          <Text> {params.selectAll || params.selectAll == undefined ? 'Select All' : 'Unselect All'}</Text>
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
    this.props.navigation.navigate('TrackPreview', { personalized: false, categories: true });
  }

  genreToggle = (genre, selected) => {
    const { genresSelected } = this.props;
    if (selected) {
      this.props.navigation.setParams({ header: `${genresSelected + 1} Selected`, selectAll: (genresSelected + 1) < 22 });
    } else {
      this.props.navigation.setParams({ header: genresSelected == 1 ? 'Categories' : `${genresSelected - 1} Selected`, selectAll: true });
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
        <View style={styles.genresContainer}>
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
        </View>
        <TouchableOpacity style={styles.nextButton} activeOpacity={0.95} onPress={this.startMuseSession}>
          <Text style={styles.nextText}>NEXT</Text>
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
    flex: 1,
    alignItems: 'center',
  },
  genresContainer: {
    marginTop: 12,
    height: '75%'
  },
  genreList: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 24,
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
  nextButton: {
    width: '50%',
    alignItems: 'center',
    marginTop: 24,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
    borderRadius: 50,
    backgroundColor: '#7ae48c',
  },
  nextText: {
    lineHeight: 36,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
