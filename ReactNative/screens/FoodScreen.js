import React from 'react';
import { StyleSheet, FlatList, View, Text, Image, TouchableHighlight, ImageBackground } from 'react-native';
import { Tile, Button, Icon } from 'react-native-elements';
import { randomCards } from '../temp/tile';

import LayoutInfo from '../constants/Layout';

import { Dimensions } from 'react-native';
import Layout from '../constants/Layout';
import InformationIcon from '../components/InformationIcon';
import ComunityIcon from '../components/ComunityIcon';

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
             <ImageBackground
              style={[styles.ImagePartLayout, styles.ImagePart]}
              source={{uri: item.image}} >
              <View style={[styles.ImagePartOverlay]}>
                <InformationIcon 
                  name='Ingredient'
                  iconSrc={require('../assets/icons/contents/ingredients.png')}
                  onPress={this._onPressIngredient}/>
                <InformationIcon 
                  name='Cook'
                  iconSrc={require('../assets/icons/contents/chef.png')}
                  onPress={this._onPressCook}/>
                <InformationIcon 
                  name='Eat'
                  iconSrc={require('../assets/icons/contents/eat.png')}
                  onPress={this._onPressEat}/>
                <InformationIcon 
                  name='History'
                  iconSrc={require('../assets/icons/contents/history.png')}
                  onPress={this._onPressHistory}/>
                <InformationIcon 
                  name='Caution'
                  iconSrc={require('../assets/icons/contents/caution.png')}
                  onPress={this._onPressCaution}/>
              </View>
            </ImageBackground>

            <View style={[styles.ContentPart]} >
              <View style={styles.ContentHeader}>
                <Text style={styles.ContentHeaderText}>몸국 / [Momguk]</Text>
                <View style={styles.IconPart} >
                  <ComunityIcon 
                    iconSrc={item.favorite ? require('../assets/icons/heart_3.png') : require('../assets/icons/heart_2.png')}
                    tintColor={item.favorite ? '#f44336' : 'rgb(50, 50, 50)'}
                    onPress={() => this._onPressHeart(index)}/>
                  <ComunityIcon 
                    iconSrc={require('../assets/icons/message.png')}
                    onPress={this._onPressMessage}/>
                  <ComunityIcon 
                    iconSrc={require('../assets/icons/share.png')}
                    onPress={this._onPressShare}/>
                </View>
              </View>
              
              <Text numberOfLines={5}
                    ellipsizeMode='tail'> {item.words} </Text>
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
});