import React from 'react';
import { StyleSheet, FlatList, View, Text, Image, TouchableHighlight } from 'react-native';
import { Tile, Button, Icon } from 'react-native-elements';

import { randomCards } from '../temp/tile';

import LayoutInfo from '../constants/Layout';

import { Dimensions } from 'react-native';
import Layout from '../constants/Layout';

const windowWidth = Dimensions.get('window').width;

class LogoTitle extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Image
          source={require('../assets/icons/spiro.png')}
          style={{ width: 30, height: 30, marginLeft: 10, marginTop: 5 }}
        />
        <Text style={{ marginLeft: 10, fontSize:27, color: '#fff' }}> FoodTraveler </Text>
      </View>
    );
  }
}

export default class FoodScreen extends React.Component {
  static navigationOptions = {
  //   // header: null,
  //   // title: 'Home',
    headerTitle: <LogoTitle />,
  //   headerStyle: {
  //     backgroundColor: '#ada',
  //   },
  };

  state = {
    refreshing: false,
    data: randomCards(20),
  };

  _onPressHeart = () => {
    console.log('_onPressHeart');
  }
  
  _onPressMessage = () => {
    console.log('_onPressMessage');
  }

  _onPressShare = () => {
    console.log('_onPressShare');
  }

  render() {
    return (
      <FlatList
        data={this.state.data}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({ item }) => {
          return (
            <View
              key={item.key}
              // title={item.title}
              // caption={item.caption}
              
              // height={LayoutInfo.size.imagePart + LayoutInfo.size.contentPart}
              width= {LayoutInfo.width}
              height= {LayoutInfo.size.imagePart + LayoutInfo.size.contentPart}
              contentContainerStyle={{ height: LayoutInfo.size.contentPart }} 
            >
            <Image
              style={styles.ImagePart}
              source={{uri: item.image}} >
            </Image>

            <View style={[styles.ContentPart]} >
              <View style={styles.ContentHeader}>
                <Text style={styles.ContentHeaderText}>몸국 / [Momguk]</Text>
                <View style={styles.IconPart} >
                  <TouchableHighlight style={styles.Icon}
                      onPress={this._onPressHeart}
                      underlayColor='#fff'>
                    <Image style={styles.IconImage}
                          source={require('../assets/icons/heart.png')}/>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.Icon}
                      onPress={this._onPressMessage}
                      underlayColor='#fff'>
                    <Image style={styles.IconImage}
                          source={require('../assets/icons/message.png')}/>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.Icon}
                      onPress={this._onPressHeart}
                      underlayColor='#fff'>
                    <Image style={styles.IconImage}
                          source={require('../assets/icons/share.png')}/>
                  </TouchableHighlight>
                </View>
              </View>
              
              {/* <Text > {item.title} </Text> */}
              <Text numberOfLines={5}
                    ellipsizeMode='tail'> {item.words} </Text>
              {/* <View
                style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }} >
                <Text numberOfLines={5}
                      ellipsizeMode='tail'> {item.words} </Text>
                <Button 
                  icon={<Icon name='rowing' color='#ffffff' />}
                  backgroundColor='#03A9F4'
                  buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                  title='Test' >
                </Button>
              </View>  */}
            </View>
          </View>
          );
        }}
      />
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  }, 
  ImagePart: {
    width: LayoutInfo.width, 
    height: LayoutInfo.size.imagePart,
    resizeMode: 'cover',
  }, 
  ContentPart: {
    flex: 1,
    flexDirection: 'column', 
    backgroundColor: 'white',
    // justifyContent: 'space-between',
    // justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  }, 
  ContentHeader: {
    flexDirection: 'row', 
    justifyContent:'space-between',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    // backgroundColor:'#a1a',
  },
  ContentHeaderText: {
    fontSize: 20,
    alignItems: 'center'
  },
  IconPart: {
    flexDirection: 'row', 
    alignItems: 'center',
    // backgroundColor:'#aaf',
  },
  Icon: {
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',
    width: Layout.contentsIconSize,
    height: Layout.contentsIconSize,
    // backgroundColor:'#afa',
  },
  IconImage: {
    width: Layout.contentsIconSize,
    height: Layout.contentsIconSize,
  }
});