import React from 'react';
import { StyleSheet, FlatList, View, Text, Image, TouchableHighlight, ImageBackground } from 'react-native';
import { Tile, Button, Icon } from 'react-native-elements';
import { randomCards } from '../temp/tile';

import LayoutInfo from '../constants/Layout';

import { Dimensions } from 'react-native';
import Layout from '../constants/Layout';
import InformationIcon from '../components/InformationIcon';
import CommunityIcon from '../components/CommunityIcon';

import { create } from 'apisauce'

// import cloneDeep from 'lodash/cloneDeep';
const cloneDeep = require('clone-deep');

const windowWidth = Dimensions.get('window').width;

const api = create({
  baseURL: 'http://ec2-13-125-205-18.ap-northeast-2.compute.amazonaws.com:7000/FooTravel',
  headers: { 'Content-Type': 'application/json' },
})



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
    // data: randomCards(20),
    // data: this._getTotalFoods()
    data: []
  };

  async componentDidMount() {
    console.log("call componentDidMount");

    let _data = await this._getTotalFoods();
    console.log("_data : " + _data);
    this.setState({data: _data});

    console.log("end componentDidMount");
  }

  _getTotalFoods() {
    console.log("call _getTotalFoods");
    
    return api
      .get('/total_foods')
      .then(response => response.data)
      .then((data) => {
        // console.log(data);
        console.log("count : " + data.length);

        let count = data.length;
        let arr = [];
        for (let i = 0; i < count; i ++) {
          arr.push({
            key: data[i].id,
            title: data[i].food_type_list,
            caption: data[i].caution_list,
            words: data[i].caution_list,
            favorite: true,

            description_id: data[i].description_id,
            history_id: data[i].history_id,
            food_type_list: data[i].food_type_list,
            ingredient_list: data[i].ingredient_list,
            allergy_list: data[i].allergy_list,
            caution_list: data[i].caution_list,
            direction_list: data[i].direction_list,
            eat_list: data[i].eat_list,
            city_list: data[i].city_list,
            image_url: data[i].image_url,
          });
        }
        // console.log(arr);
        return arr;
      })
      .catch((err) => {
        console.error(err);
      });
  }


  // information
  _onPressIngredient = (index) => {
    console.log('call _onPressIngredient : index(' + index + ')');
    // console.log(this.state.data);
    // console.log(this.state.data[index]);
    let _id = this.state.data[index].description_id;
    console.log('_onPressIngredient : description_id(' + _id + ')');

    api
    .post('/description', { "id": _id })
    .then(response => response.data)
    .then(console.log);
  }

  _onPressCook = (index) => {
    console.log('_onPressCook');
  }

  _onPressEat = (index) => {
    console.log('_onPressEat');
  }

  _onPressHistory = (index) => {
    console.log('_onPressHistory');
  }

  _onPressCaution = (index) => {
    console.log('_onPressCaution');
  }

  
  // community
  _onPressHeart = (index) => {
    console.log('_onPressHeart : index(' + index + ')');
    console.log('_onPressHeart 변경 전 : ' + this.state.data[index].favorite);

    const tempData = cloneDeep(this.state.data);
    tempData[index].favorite = !tempData[index].favorite;
    this.setState({data: tempData});

    console.log('_onPressHeart 변경 후 : ' + tempData[index].favorite);
  }

  _onPressMessage = (index) => {
    console.log('_onPressMessage');
  }

  _onPressShare = (index) => {
    console.log('_onPressShare');
  }




  render() {
    console.log('call render');
    
    return (
      <FlatList
        data={this.state.data}
        // keyExtractor={(item, index) => index.toString()} 
        // keyExtractor={(item) => item.key} 
        keyExtractor={(item, index) => index.toString() }
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
              source={{uri: item.image_url}} >
              <View style={[styles.ImagePartOverlay]}>
                <InformationIcon 
                  name='Ingredient'
                  iconSrc={require('../assets/icons/contents/ingredients.png')}
                  // onPress={this._onPressIngredient}/>
                  onPress={() => this._onPressIngredient(index)}/>
                <InformationIcon 
                  name='Cook'
                  iconSrc={require('../assets/icons/contents/chef.png')}
                  onPress={() => this._onPressCook(index)}/>
                <InformationIcon 
                  name='Eat'
                  iconSrc={require('../assets/icons/contents/eat.png')}
                  onPress={() => this._onPressEat(index)}/>
                <InformationIcon 
                  name='History'
                  iconSrc={require('../assets/icons/contents/history.png')}
                  onPress={() => this._onPressHistory(index)}/>
                <InformationIcon 
                  name='Caution'
                  iconSrc={require('../assets/icons/contents/caution.png')}
                  onPress={() => this._onPressCaution(index)}/>
              </View>
            </ImageBackground>

            <View style={[styles.ContentPart]} >
              <View style={styles.ContentHeader}>
                <Text style={styles.ContentHeaderText}>몸국 / [Momguk]</Text>
                <View style={styles.IconPart} >
                  <CommunityIcon 
                    iconSrc={item.favorite ? require('../assets/icons/heart_3.png') : require('../assets/icons/heart_2.png')}
                    tintColor={item.favorite ? '#f44336' : 'rgb(50, 50, 50)'}
                    onPress={() => this._onPressHeart(index)}/>
                  <CommunityIcon 
                    iconSrc={require('../assets/icons/message.png')}
                    onPress={() => this._onPressMessage(index)}/>
                  <CommunityIcon 
                    iconSrc={require('../assets/icons/share.png')}
                    onPress={() => this._onPressShare(index)}/>
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