import React from 'react';
import { StyleSheet, FlatList, View, Text, Image, TouchableHighlight, ImageBackground } from 'react-native';
import { Tile, Button, Icon } from 'react-native-elements';
import { randomCards } from '../temp/tile';

import LayoutInfo from '../constants/Layout';

import { Dimensions } from 'react-native';
import Layout from '../constants/Layout';

// import cloneDeep from 'lodash/cloneDeep';
const cloneDeep = require('clone-deep');

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

export default class LikeScreen extends React.Component {
  // static navigationOptions = {
  //   // headerTitle: <LogoTitle />,
  // };

  state = {
    refreshing: false,
    data: randomCards(20),
  };

  _onPressIngredient = () => {
    console.log('_onPressIngredient');
  }

  _onPressCook = () => {
    console.log('_onPressCook');
  }

  _onPressEat = () => {
    console.log('_onPressEat');
  }

  _onPressHistory = () => {
    console.log('_onPressHistory');
  }

  _onPressCaution = () => {
    console.log('_onPressCaution');
  }

  
  // _onPressHeart = () => {
  //   console.log('_onPressHeart');
  // }
  _onPressHeart = (index) => {
    console.log('_onPressHeart : index(' + index + ')');
    console.log('_onPressHeart 변경 전 : ' + this.state.data[index].favorite);

    const tempData = cloneDeep(this.state.data);
    tempData[index].favorite = !tempData[index].favorite;
    this.setState({data: tempData});

    console.log('_onPressHeart 변경 후 : ' + tempData[index].favorite);
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
        // keyExtractor={(item, index) => index.toString()} 
        keyExtractor={(item) => item.key} 
        renderItem={({ item, index }) => {
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
            {/* <View style={styles.ImagePartLayout}>
              <Image style={[styles.ImagePart, styles.ImagePartLayout]}
                    source={{uri: item.image}} >
              </Image>
              <View style={[styles.ImagePartOverlay]}>
              </View>
            </View> */}
             <ImageBackground
              style={[styles.ImagePartLayout, styles.ImagePart]}
              source={{uri: item.image}} >
              <View style={[styles.ImagePartOverlay]}>
                <TouchableHighlight 
                    onPress={this._onPressIngredient}
                    underlayColor='#fff'>
                    <View style={styles.ImagePartIcon}>
                      <Image style={styles.ImagePartIconImage}
                            source={require('../assets/icons/contents/ingredients.png')}/>
                      <Text style={styles.ImagePartIconText}>
                        Ingredient </Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this._onPressCook}
                    underlayColor='#fff'>
                    <View style={styles.ImagePartIcon}>
                      <Image style={styles.ImagePartIconImage}
                            source={require('../assets/icons/contents/chef.png')}/>
                      <Text style={styles.ImagePartIconText}>
                        Cook </Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this._onPressEat}
                    underlayColor='#fff'>
                    <View style={styles.ImagePartIcon}>
                      <Image style={styles.ImagePartIconImage}
                            source={require('../assets/icons/contents/eat.png')}/>
                      <Text style={styles.ImagePartIconText}>
                        Eat </Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this._onPressHistory}
                    underlayColor='#fff'>
                    <View style={styles.ImagePartIcon}>
                      <Image style={styles.ImagePartIconImage}
                            source={require('../assets/icons/contents/history.png')}/>
                      <Text style={styles.ImagePartIconText}>
                        History </Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this._onPressCaution}
                    underlayColor='#fff'>
                    <View style={styles.ImagePartIcon}>
                      <Image style={styles.ImagePartIconImage}
                            source={require('../assets/icons/contents/caution.png')}/>
                      <Text style={styles.ImagePartIconText}>
                        Caution </Text>
                    </View>
                </TouchableHighlight>
              </View>
            </ImageBackground>
            

            <View style={[styles.ContentPart]} >
              <View style={styles.ContentHeader}>
                <Text style={styles.ContentHeaderText}>몸국 / [Momguk]</Text>
                <View style={styles.IconPart} >
                  <TouchableHighlight style={styles.Icon}
                      onPress={() => this._onPressHeart(index)}
                      underlayColor='#fff'>
                    <Image style={styles.IconImage}
                          tintColor={item.favorite ? '#f44336' : 'rgb(50, 50, 50)'}
                          source={item.favorite ? require('../assets/icons/heart_3.png') : require('../assets/icons/heart_2.png')}/>
                  </TouchableHighlight>
                  {/* <TouchableHighlight style={styles.Icon}
                      onPress={this._onPressHeart}
                      underlayColor='#fff'>
                    <Image style={styles.IconImage}
                          
                          source={require('../assets/icons/heart_3.png')}/>
                  </TouchableHighlight> */}
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
  ImagePartLayout: {
    width: LayoutInfo.width, 
    height: LayoutInfo.size.imagePart,
    // position: 'absolute',
  }, 
  ImagePart: {
    resizeMode: 'cover',
  }, 
  ImagePartOverlay: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    top: LayoutInfo.imagePartIconSectionTop,
    opacity: 0.8,
    width: LayoutInfo.width, 
    height: LayoutInfo.imagePartIconSection,
    backgroundColor: 'white',
  }, 
  ImagePartIcon: {
    flexDirection: 'column', 
    justifyContent: 'center',
    alignItems: 'center',
    // top: LayoutInfo.imagePartIconSectionTop,
    // width: 70,
    width: LayoutInfo.imagePartIconSize + 15, 
    height: LayoutInfo.imagePartIconSection,
    // backgroundColor: '#aad',
  }, 
  ImagePartIconImage: {
    width: LayoutInfo.imagePartIconSize, 
    height: LayoutInfo.imagePartIconSize,
    // backgroundColor: '#dd1',
  },
  ImagePartIconText: {
    fontSize:11,
    justifyContent: 'center',
    alignItems:'center',
    // width: 70,
    // backgroundColor: '#a1a'
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
    width: Layout.contentsPartIconSize,
    height: Layout.contentsPartIconSize,
    // backgroundColor:'#afa',
  },
  IconImage: {
    width: Layout.contentsPartIconSize,
    height: Layout.contentsPartIconSize,
  }
});