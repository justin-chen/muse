import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View, FlatList } from 'react-native';
import { LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import Genre from './Genre';
import genres from '../utils/genres';

export default class GenreSelect extends React.Component {
  static navigationOptions = {
    header: null
  }

  renderNextButton = () => (
    <TouchableOpacity
      style={styles.nextButton}
      onPress={() => { }}
    >
      <Text style={styles.nextText}>
        NEXT{'  '}<Ionicons name='ios-arrow-forward' size={24} />
      </Text>
    </TouchableOpacity>
  )

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>WHAT ARE YOU IN THE MOOD FOR?</Text>
        <View style={{ marginTop: 12 }}>
          <LinearGradient colors={['white', '#ffffff00']} style={styles.gradient} />
          <FlatList
            data={genres}
            ListFooterComponent={this.renderNextButton()}
            contentContainerStyle={styles.genreList}
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
    letterSpacing: 2,
    textAlign: 'center',
  },
  container: {
    paddingTop: 75,
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
    letterSpacing: 2,
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
