import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { LinearGradient } from 'expo';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Genre from './Genre';
import genres from '../utils/genres';

export default class GenreSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectAll: true,
    };
    this.props.navigation.setParams({ 
      genreAll: this.genreAll,
      selectAll: true
    });
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return ({
      title: 'Categories',
      headerStyle: {
        borderBottomWidth: 0,
      },
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.navigate('SessionInitiation')}
          style={{ marginLeft: 18 }}
        >
          <Ionicons name='ios-arrow-back' size={32} />
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity
          onPress={() => params.genreAll()}
          style={{ marginRight: 18 }}
        >
        { params.selectAll || params.selectAll == undefined ? 
          <Text>Select All</Text> : <Text>Unselect All</Text>
        }
        </TouchableOpacity>
      )
    });
  }

  genreAll = () => {
    if (this.state.selectAll) {
      this.props.genreSelectAll();
      this.props.navigation.setParams({ selectAll: false });
    } else {
      this.props.genreUnselectAll();
      this.props.navigation.setParams({ selectAll: true });
    }
    this.setState({ selectAll: !this.state.selectAll });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 12 }}>
          <LinearGradient colors={['white', '#ffffff00']} style={styles.gradient} />
          <FlatList
            data={genres}
            contentContainerStyle={styles.genreList}
            showsVerticalScrollIndicator={false}
            extraData={this.props.genres}
            numColumns={2} renderItem={({ item, index }) => {
              return (
                <Genre item={item} index={index} checked={this.props.genres[item.key]} genreToggle={this.props.genreToggle} />
              )
            }}>
          </FlatList>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0,
    textAlign: 'center',
  },
  container: {
    paddingTop: 24,
  },
  genreList: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 100
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
    letterSpacing: 0,
    color: '#fff',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 24,
    zIndex: 999
  }
});
