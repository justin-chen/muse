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
      fetchingTracks: false,
      disableNext: true,
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
      this.setState({ disableNext: false });
    } else {
      this.props.navigation.setParams({ header: genresSelected == 1 ? 'Categories' : `${genresSelected - 1} Selected`, selectAll: true });
      if (genresSelected == 1) {
        this.setState({ disableNext: true });
      }
    }

    this.props.genreToggle(genre);
  }

  genreAll = () => {
    if ((this.props.genresSelected) < 22) {
      this.props.genreSelectAll();
      this.props.navigation.setParams({ selectAll: false, header: '22 Selected' });
      this.setState({ disableNext: false });
    } else {
      this.props.genreUnselectAll();
      this.props.navigation.setParams({ selectAll: true, header: 'Categories' });
      this.setState({ disableNext: true });
    }
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <AnimatedLoader
            visible={this.state.fetchingTracks}
            overlayColor='#fff'
            animationStyle={styles.lottie}
            speed={1.5}
            source={require('../assets/loading.json')}
          />
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
        </View>
        <View style={styles.nextButtonContainer}>
          <TouchableOpacity disabled={this.state.disableNext} style={this.state.disableNext ? styles.nextButtonDisabled : styles.nextButton} activeOpacity={0.95} onPress={this.startMuseSession}>
            <Text style={styles.nextText}>NEXT</Text>
          </TouchableOpacity>
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
  nextButtonContainer: {
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  container: {
    height: '85%',
  },
  genreList: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 128
  },
  nextText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  nextButtonDisabled: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.05)',
    color: 'white',
    borderRadius: 40,
    padding: 14,
    width: 227,
    height: 53,
  },
  nextButton: {
    zIndex: 999,
    shadowOffset: { width: 0, height: 2, },
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7ae48c',
    borderRadius: 40,
    color: 'white',
    padding: 14,
    width: 227,
    height: 53,
  },
});
