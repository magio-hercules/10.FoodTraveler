import React from 'react';
import { StyleSheet, FlatList, View, Text, Image, TouchableHighlight, ImageBackground } from 'react-native';
import { Tile, Button, Icon } from 'react-native-elements';
import { randomCards } from '../temp/tile';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';

import LayoutInfo from '../constants/Layout';
import Language from '../constants/Language';

import { Dimensions } from 'react-native';
import Layout from '../constants/Layout';
import InformationIcon from '../components/InformationIcon';
import CommunityIcon from '../components/CommunityIcon';

import { create } from 'apisauce'
import CookScreen from './information/CookScreen';

// for redux
import { connect } from 'react-redux';
// import * as actions from '../actions';
import * as counterActions from '../reducers/counter';


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




class FoodScreen extends React.Component {
// default class FoodScreen extends React.Component {
  static navigationOptions = {
  //   // header: null,
  //   // title: 'Home',
    // headerTitle: <LogoTitle />,
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

  // 참고 LifeCycle
  // 컴포넌트 생성시 constructor -> componentWillMount -> render -> componentDidMount
  // 컴포넌트 제거시 componentWillUnmount 
  // 컴포넌트 prop 변경시 componentWillReceiveProps -> shouldComponentUpdate -> componentWillUpdate-> render -> componentDidUpdate 

  constructor(props){
    super(props);
    console.log("FoodScreen constructor");
  }

  componentWillMount () {
    console.log("call componentWillMount");
  }

  async componentDidMount() {
    console.log("call componentDidMount");

    let _data = await this._getTotalFoods();
    console.log("_data : " + _data);
    this.setState({data: _data});

    console.log("end componentDidMount");
  }

  async componentWillReceiveProps() {
    console.log('FoodScreen componentWillReceiveProps');

    let _data = await this._getTotalFoods();
    console.log("_data : " + _data);
    this.setState({data: _data});
  }

  _getTotalFoods() {
    console.log("call _getTotalFoods");
    
    return api
      .get('/total_foods')
      .then(response => response.data)
      .then((data) => {
        // console.log(data);
        console.log("count : " + data.length);

        let _title, _desc;
        switch (global.language) {
          case 'ko':
            _title = "title_ko";
            _desc = "desc_ko";
            break;
          case 'en':
            _title = "title_en";
            _desc = "desc_en";
            break;
          case 'jp':
            _title = "title_jp";
            _desc = "desc_jp";
            break;
          case 'zh':
            _title = "title_zh";
            _desc = "desc_zh";
            break;
        } 

        let count = data.length;
        let arr = [];
        for (let i = 0; i < count; i ++) {
          arr.push({
            key: data[i].id,
            title_local: data[i].title_local,
            title_phonetic: data[i].title_phonetic,
            // title: data[i].title_en,
            // description: data[i].desc_en,
            title: data[i][_title],
            description: data[i][_desc],
            favorite: true,

            description_id: data[i].description_id,
            food_type_list: data[i].food_type_list,
            ingredient_list: data[i].ingredient_list,
            cook_list: data[i].cook_list,
            eat_list: data[i].eat_list,
            history_list: data[i].history_list,
            caution_list: data[i].caution_list,
            
            allergy_list: data[i].allergy_list,
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
    let _key = this.state.data[index].key;
    let ingredient_list = this.state.data[index].ingredient_list;
    console.log('_onPressIngredient : food_id(' + _key + ')');
    console.log('_onPressIngredient : ingredient_list(' + ingredient_list + ')');
    
    const navigateAction = NavigationActions.navigate({
      routeName: "Ingredient",
      params: {
        // index: this.state.index,
        ingredient_list: ingredient_list,
      }
    });
    this.props.navigation.dispatch(navigateAction);
  }

  _onPressCook = (index) => {
    console.log('call _onPressCook : index(' + index + ')');
    let _key = this.state.data[index].key;
    let cook_list = this.state.data[index].cook_list;
    console.log('_onPressCook : food_id(' + _key + ')');
    console.log('_onPressCook : cook_list(' + cook_list + ')');
    
    const navigateAction = NavigationActions.navigate({
      routeName: "Cook",
      params: {
        cook_list: cook_list,
      }
    });
    this.props.navigation.dispatch(navigateAction);
  }

  _onPressEat = (index) => {
    console.log('call _onPressEat : index(' + index + ')');
    let _key = this.state.data[index].key;
    let eat_list = this.state.data[index].eat_list;
    console.log('_onPressEat : food_id(' + _key + ')');
    console.log('_onPressEat : eat_list(' + eat_list + ')');
    
    const navigateAction = NavigationActions.navigate({
      routeName: "Eat",
      params: {
        eat_list: eat_list,
      }
    });
    this.props.navigation.dispatch(navigateAction);
  }

  _onPressHistory = (index) => {
    console.log('call _onPressHistory : index(' + index + ')');
    let _key = this.state.data[index].key;
    let history_list = this.state.data[index].history_list;
    console.log('_onPressHistory : food_id(' + _key + ')');
    console.log('_onPressHistory : history_list(' + history_list + ')');
    
    const navigateAction = NavigationActions.navigate({
      routeName: "History",
      params: {
        history_list: history_list,
      }
    });
    this.props.navigation.dispatch(navigateAction);
  }

  _onPressCaution = (index) => {
    console.log('call _onPressCaution : index(' + index + ')');
    let _key = this.state.data[index].key;
    let caution_list = this.state.data[index].caution_list;
    console.log('_onPressCaution : food_id(' + _key + ')');
    console.log('_onPressCaution : caution_list(' + caution_list + ')');
    
    const navigateAction = NavigationActions.navigate({
      routeName: "Caution",
      params: {
        caution_list: caution_list,
      }
    });
    this.props.navigation.dispatch(navigateAction);
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
                  // name='Ingredient'
                  name={Language.Ingredient[global.language]}
                  iconSrc={require('../assets/icons/contents/ingredients.png')}
                  // onPress={this._onPressIngredient}/>
                  number={this.props.number}
                  onPress={() => this._onPressIngredient(index)}/>
                <InformationIcon 
                  // name='Cook'
                  name={Language.Cook[global.language]}
                  iconSrc={require('../assets/icons/contents/chef.png')}
                  onPress={() => this._onPressCook(index)}/>
                <InformationIcon 
                  // name='Eat'
                  name={Language.Eat[global.language]}
                  iconSrc={require('../assets/icons/contents/eat.png')}
                  onPress={() => this._onPressEat(index)}/>
                <InformationIcon 
                  // name='History'
                  name={Language.History[global.language]}
                  iconSrc={require('../assets/icons/contents/history.png')}
                  onPress={() => this._onPressHistory(index)}/>
                <InformationIcon 
                  // name='Caution'
                  name={Language.Caution[global.language]}
                  iconSrc={require('../assets/icons/contents/caution.png')}
                  onPress={() => this._onPressCaution(index)}/>
              </View>
            </ImageBackground>

            <View style={[styles.ContentPart]} >
              <View style={styles.ContentHeader}>
                <Text 
                  style={styles.ContentHeaderText}> 
                  {item.title_local + ' [' + item.title_phonetic + ']' 
                   + '\r\n' + ': ' + item.title} 
                </Text>
                {/* <Text 
                  ellipsizeMode='tail' 
                  style={styles.ContentHeaderText}> 
                  {' / ' + item.title} 
                </Text> */}
                <View style={styles.IconPart} >
                  <CommunityIcon 
                    iconSrc={item.favorite ? require('../assets/icons/heart_3.png') : require('../assets/icons/heart_2.png')}
                    tintColor={item.favorite ? '#f44336' : 'rgb(50, 50, 50)'}
                    // onPress={() => this._onPressHeart(index)}/>
                    />
                  <CommunityIcon 
                    iconSrc={require('../assets/icons/message.png')}
                    // onPress={() => this._onPressMessage(index)}/>
                    onPlus={this.props.increment}/>
                  <CommunityIcon 
                    iconSrc={require('../assets/icons/share.png')}
                    // onPress={() => this._onPressShare(index)}/>
                    onPlus={this.props.decrement}
                    />
                </View>
              </View>
              
              <Text 
                  style={styles.ContentText}
                  numberOfLines={5}
                  ellipsizeMode='tail'> {item.description} </Text>
            </View>
          </View>
          );
        }}
      />
    );
  }
}


FoodScreen.propTypes = {
  navigation: PropTypes.object
};


const mapStateToProps = (state) => {
  return {
      number: state.counter.number,
      index: state.info.index,
      // color: state.ui.color
  };
};

// #type 1
// const mapDispatchProps = (dispatch) => {
//   return {
//       handleIncrement: () => { dispatch(actions.increment())},
//       handleDecrement: () => { dispatch(actions.decrement())},
//       handleShowIngredient: (index) => { dispatch(actions.showInfoIngredient(index))}
//   };
// };

// #type 2
// props 값으로 넣어 줄 액션 함수들을 정의해줍니다
const mapDispatchProps = (dispatch) => ({
  increment: () => dispatch(counterActions.increment()),
  decrement: () => dispatch(counterActions.decrement())
})

// 컴포넌트를 리덕스와 연동 할 떄에는 connect 를 사용합니다.
// connect() 의 결과는, 컴포넌트에 props 를 넣어주는 함수를 반환합니다.
// 반환된 함수에 우리가 만든 컴포넌트를 넣어주면 됩니다.
// #type 1
export default connect(mapStateToProps, mapDispatchProps)(FoodScreen);

// #type 2
// export default connect(
//   (state) => ({
//     number: state.counter.number
//   }), 
//   (dispatch) => ({
//     increment: () => dispatch(counterActions.increment()),
//     decrement: () => dispatch(counterActions.decrement())
//   })
// )(CounterContainer);


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
    // paddingBottom: 5,
    // backgroundColor:'#a1a',
  },
  ContentHeaderText: {
    flex: 8,
    fontSize: 18,
    alignItems: 'center',
    fontFamily: 'netmarbleM'
  },
  ContentText: {
    fontFamily: 'netmarbleL',
    marginTop: 5
  },
  IconPart: {
    flex: 3,
    justifyContent:'center',
    flexDirection: 'row', 
    alignItems: 'center',
    // backgroundColor:'#aaf',
  },
});