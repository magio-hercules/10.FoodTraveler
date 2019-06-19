import React, { Component } from 'react';
import { StyleSheet, 
  Platform,
  FlatList, 
  View, 
  Text, 
  TextInput,
  Button,
  Image,
  Picker,
  TouchableHighlight, 
  SafeAreaView,
  ImageBackground } from 'react-native';
// import { NavigationActions } from 'react-navigation';
// import { Dimensions } from 'react-native';

import { create } from 'apisauce'
import PropTypes from 'prop-types';

import LayoutInfo from '../constants/Layout';
import Language from '../constants/Language';

import InformationIcon from '../components/InformationIcon';
import CommunityIcon from '../components/CommunityIcon';

// import CookScreen from './information/CookScreen';

// for redux
// import * as counterActions from '../reducers/counter';


// import cloneDeep from 'lodash/cloneDeep';
// const cloneDeep = require('clone-deep');

// const windowWidth = Dimensions.get('window').width;

import { decorate, observable, observe, action, when, computed, autorun, runInAction } from 'mobx';
import { observer, inject } from 'mobx-react';
// import { FoodStoreContext } from './stores/FoodStore';


const api = create({
  baseURL: 'http://ec2-13-125-205-18.ap-northeast-2.compute.amazonaws.com:7000/FooTravel',
  headers: { 'Content-Type': 'text/plain' },
})

// class LogoTitle extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, flexDirection: 'row' }}>
//         <Image
//           source={require('../assets/icons/spiro.png')}
//           style={{ width: 30, height: 30, marginLeft: 10, marginTop: 5 }}
//         />
//         <Text style={{ marginLeft: 10, fontSize:27, color: '#fff' }}> FoodTraveler </Text>
//       </View>
//     );
//   }
// }



// @inject("testStore")
// @observer
class FoodScreen extends Component {
// export default class FoodScreen extends React.Component {
// default class FoodScreen extends React.Component {

  // @observable curFoodId = ''
  curFoodId = -1;

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
    language: '',
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

  async componentWillMount () {
    console.log("call componentWillMount");
  }

  

  async componentDidMount() {
    console.log("call componentDidMount");

    let _data = await this._getTotalFoods();
    console.log("_data : " + _data);
    this.setState({data: _data});

    this.setState({ language: this.props.profileStore.language });
    console.log("curLanguage : " + this.props.profileStore.language);
    
    autorun(() => {
      console.log("autorun");
      console.log("this.state.language : " + this.state.language);
      console.log("this.props.profileStore.language : " + this.props.profileStore.language);
      if (this.state.language == this.props.profileStore.language) {
        console.log("this.state.language == this.props.profileStore.language");
      } else {
        console.log("this.state.language != this.props.profileStore.language");

        // let _data = this._getTotalFoods();
        this._getTotalFoods().then(
          _data => {
            this.setState({ data: _data });
            console.log("_data : " + _data);
            console.log("after setState({ data: _data })");
            console.log("this.props.profileStore.language : " + this.props.profileStore.language);
          },
          error => {
            console.log('after then error : ');
            console.log(error);
          }
        );
        console.log("this.state.language : " + this.state.language);
        this.setState({ language: this.props.profileStore.language });
      }
    });

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
      // .then(console.log)
      // .then(response => response.data) 
      .then((response) => {
        // console.log("!!!response!!!");
        // console.log(response);
        return response.data;
      })
      .then((data) => {
        // console.log(data);
        console.log("count : " + data.length);
        // console.log("this.props.profileStore.language : " + this.props.profileStore.language);
        
        let _title, _desc;
        switch (this.props.profileStore.language) {
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
          default:
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

  increase = () => {
    console.log('increase');
    this.curFoodId++;
  }

  decrease = () => {
    console.log('decrease');
    this.curFoodId--;
  }

  // information
  _onPressIngredient = (index) => {
    console.log('call _onPressIngredient : index(' + index + ')');
    let _key = this.state.data[index].key;
    let ingredient_list = this.state.data[index].ingredient_list;
    console.log('_onPressIngredient : food_id(' + _key + ')');
    console.log('_onPressIngredient : ingredient_list(' + ingredient_list + ')');

    this.props.routerStore.screen = 'Ingredient';
    this.props.foodStore.food_id = _key;
    this.props.foodStore.ingredient_list = ingredient_list;
    console.log('this.props.routerStore.screen : (' + this.props.routerStore.screen + ')');
    console.log('this.props.foodStore.foodId : (' + this.props.foodStore.food_id + ')');
    console.log('this.props.foodStore.ingredient_list : (' + this.props.foodStore.ingredient_list + ')');

    // const navigateAction = NavigationActions.navigate({
    //   routeName: "Ingredient",
    //   params: {
    //     // index: this.state.index,
    //     ingredient_list: ingredient_list,
    //   }
    // });
    // this.props.navigation.dispatch(navigateAction);
  }

  _onPressCook = (index) => {
    console.log('call _onPressCook : index(' + index + ')');
    let _key = this.state.data[index].key;
    let cook_list = this.state.data[index].cook_list;
    console.log('_onPressCook : food_id(' + _key + ')');
    console.log('_onPressCook : cook_list(' + cook_list + ')');

    this.props.routerStore.screen = 'Cook';
    this.props.foodStore.food_id = _key;
    this.props.foodStore.cook_list = cook_list;
    console.log('this.props.routerStore.screen : (' + this.props.routerStore.screen + ')');
    console.log('this.props.foodStore.food_id : (' + this.props.foodStore.food_id + ')');
    console.log('this.props.foodStore.cook_list : (' + this.props.foodStore.cook_list + ')'); 

    // const navigateAction = NavigationActions.navigate({
    //   routeName: "Cook",
    //   params: {
    //     cook_list: cook_list,
    //   }
    // });
    // this.props.navigation.dispatch(navigateAction);
  }

  _onPressEat = (index) => {
    console.log('call _onPressEat : index(' + index + ')');
    let _key = this.state.data[index].key;
    let eat_list = this.state.data[index].eat_list;
    console.log('_onPressEat : food_id(' + _key + ')');
    console.log('_onPressEat : eat_list(' + eat_list + ')');

    this.props.routerStore.screen = 'Eat';
    this.props.foodStore.food_id = _key;
    this.props.foodStore.eat_list = eat_list;
    console.log('this.props.routerStore.screen : (' + this.props.routerStore.screen + ')');
    console.log('this.props.foodStore.food_id : (' + this.props.foodStore.food_id + ')');
    console.log('this.props.foodStore.eat_list : (' + this.props.foodStore.eat_list + ')');

    // const navigateAction = NavigationActions.navigate({
    //   routeName: "Eat",
    //   params: {
    //     eat_list: eat_list,
    //   }
    // });
    // this.props.navigation.dispatch(navigateAction);
  }

  _onPressHistory = (index) => {
    console.log('call _onPressHistory : index(' + index + ')');
    let _key = this.state.data[index].key;
    let history_list = this.state.data[index].history_list;
    console.log('_onPressHistory : food_id(' + _key + ')');
    console.log('_onPressHistory : history_list(' + history_list + ')');
    
    this.props.routerStore.screen = 'History';
    this.props.foodStore.food_id = _key;
    this.props.foodStore.history_list = history_list;
    console.log('this.props.routerStore.screen : (' + this.props.routerStore.screen + ')');
    console.log('this.props.foodStore.food_id : (' + this.props.foodStore.food_id + ')');
    console.log('this.props.foodStore.history_list : (' + this.props.foodStore.history_list + ')');

    // const navigateAction = NavigationActions.navigate({
    //   routeName: "History",
    //   params: {
    //     history_list: history_list,
    //   }
    // });
    // this.props.navigation.dispatch(navigateAction);    
  }

  _onPressCaution = (index) => {
    console.log('call _onPressCaution : index(' + index + ')');
    let _key = this.state.data[index].key;
    let caution_list = this.state.data[index].caution_list;
    console.log('_onPressCaution : food_id(' + _key + ')');
    console.log('_onPressCaution : caution_list(' + caution_list + ')');
    
    this.props.routerStore.screen = 'Caution';
    this.props.foodStore.food_id = _key;
    this.props.foodStore.caution_list = caution_list;
    console.log('this.props.routerStore.screen : (' + this.props.routerStore.screen + ')');
    console.log('this.props.foodStore.food_id : (' + this.props.foodStore.food_id + ')');
    console.log('this.props.foodStore.caution_list : (' + this.props.foodStore.caution_list + ')');
    
    // const navigateAction = NavigationActions.navigate({
    //   routeName: "Caution",
    //   params: {
    //     caution_list: caution_list,
    //   }
    // });
    // this.props.navigation.dispatch(navigateAction);
  }

  
  // community
  _onPressHeart = (index) => {
    console.log('_onPressHeart : index(' + index + ')');
    console.log('_onPressHeart 변경 전 : ' + this.state.data[index].favorite);

    // const tempData = cloneDeep(this.state.data);
    // tempData[index].favorite = !tempData[index].favorite;
    // this.setState({data: tempData});

    // console.log('_onPressHeart 변경 후 : ' + tempData[index].favorite);
  }

  get lan() {
    // correct; computed property will track the `user.name` property
    return this.props.profileStore.language
  }

  _onPressMessage = (index) => {
    console.log('_onPressMessage');

    // if (this.props.profileStore.language == 'ko') {
    //   this.props.profileStore.language = 'en';
    // } else if (this.props.profileStore.language == 'en') {
    //   this.props.profileStore.language = 'ko';
    // }

  }

  _onPressShare = (index) => {
    console.log('_onPressShare');
  }

  _handleBack = () => {
    // this._handleAction(RNTesterActions.Back());
    console.log('_handleBack');
  }


  render() {
    // const { curFoodId } = this

    console.log('call render');
    
    return (
      <View style={styles.RootView}>
          {/* <Text style={styles.TitleContainer}> FoodTraveler </Text> */}
          
          {/* <View style={styles.headerContainer}>
            <View style={styles.header}>
              <View style={styles.headerCenter}>
                <Image
                  source={require('../assets/icons/spiro.png')}
                  style={{ width: 25, height: 25, marginLeft: 0, marginTop: 0, marginRight: 10, tintColor: '#2f95dc' }}
                />
                <Text accessibilityRole="heading" aria-level="3" style={styles.title}>FoodTraveler</Text>
              </View>
              <React.Fragment>
                <View style={styles.headerLeft}>
                  <TouchableHighlight 
                    style={styles.Button}
                    underlayColor='#448AFF'
                    onPress={this._handleBack}>
                    <View >
                        <Text style={styles.ButtonText}>
                          MENU {this.props.foodStore.food_id}
                        </Text>
                    </View>
                  </TouchableHighlight>
                </View>
                <View style={styles.headerRight}>
                </View>
              </React.Fragment>
            </View>
          </View> */}
          
          <View style={styles.container}>
            <FlatList style={styles.listContainer}
              data={this.state.data}
              // keyExtractor={(item, index) => index.toString()} 
              // keyExtractor={(item) => item.key} 
              keyExtractor={(item, index) => index.toString() }
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{ marginTop: "50px", borderWidth: "1px", borderColor: '#efefef' }}
                    key={item.key}
                    width= {LayoutInfo.size.imagePart}
                    height= {LayoutInfo.size.imagePart + LayoutInfo.size.contentPart}
                    contentContainerStyle={{ height: LayoutInfo.size.contentPart }} 
                  >
                  <ImageBackground
                    style={[styles.ImagePartLayout, styles.ImagePart]}
                    source={{uri: item.image_url}} >
                    <View style={[styles.ImagePartOverlay]}>
                      <InformationIcon 
                        // name='Ingredient'
                        name={Language.Ingredient[this.props.profileStore.language]}
                        iconSrc={require('../assets/icons/contents/ingredients.png')}
                        // onPress={this._onPressIngredient}/>
                        number={this.props.number}
                        onPress={() => this._onPressIngredient(index)}
                        />
                      <InformationIcon 
                        // name='Coo'
                        name={Language.Cook[this.props.profileStore.language]}
                        iconSrc={require('../assets/icons/contents/chef.png')}
                        onPress={() => this._onPressCook(index)}
                        />
                      <InformationIcon 
                        // name='Eat'
                        name={Language.Eat[this.props.profileStore.language]}
                        iconSrc={require('../assets/icons/contents/eat.png')}
                        onPress={() => this._onPressEat(index)}/>
                      <InformationIcon 
                        // name='History'
                        name={Language.History[this.props.profileStore.language]}
                        iconSrc={require('../assets/icons/contents/history.png')}
                        onPress={() => this._onPressHistory(index)}/>
                      <InformationIcon 
                        // name='Caution'
                        name={Language.Caution[this.props.profileStore.language]}
                        iconSrc={require('../assets/icons/contents/caution.png')}
                        onPress={() => this._onPressCaution(index)}/>
                    </View>
                  </ImageBackground>

                  <View style={[styles.ContentPart]} >
                    <View style={styles.ContentHeader}>
                      <Text 
                        style={styles.ContentHeaderText}> 
                        {/* {item.title_local + " [" + item.title_phonetic + "]" + "\r\n" + ": " + item.title}  */}
                          {`${item.title_local} [${item.title_phonetic}] \r\n : ${item.title}`} 
                      </Text>
                      <Text 
                        style={styles.ContentHeaderText}> 
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
                          onPress={() => this._onPressMessage(index)}
                          // onPlus={this.props.increment}/>
                          />
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
          </View>
          
      </View>
    );
  }
}


// FoodScreen.propTypes = {
//   navigation: PropTypes.object
// };


// const mapStateToProps = (state) => {
//   return {
//       number: state.counter.number
//       // index: state.info.index,
//       // color: state.ui.color
//   };
// };


// #type 2
// props 값으로 넣어 줄 액션 함수들을 정의해줍니다
// const mapDispatchProps = (dispatch) => ({
//   increment: () => dispatch(counterActions.increment()),
//   decrement: () => dispatch(counterActions.decrement())
// })

// 컴포넌트를 리덕스와 연동 할 떄에는 connect 를 사용합니다.
// connect() 의 결과는, 컴포넌트에 props 를 넣어주는 함수를 반환합니다.
// 반환된 함수에 우리가 만든 컴포넌트를 넣어주면 됩니다.
// #type 1
// export default connect(mapStateToProps, mapDispatchProps)(FoodScreen);



const styles = StyleSheet.create({
  RootView: {
    // width: (Platform.OS === 'web') ? "50%" : "100%",
    // height: (Platform.OS === 'web') ? "200" : "100%",
    flex: 1,
    // flexDirection:'column',
    backgroundColor: '#fafafa',
    alignItems: "center",
    justifyContent: "center",
    // minWidth: "50%",
    // maxWidth: "70%",
  },
  headerContainer: {
    width: "100%",
    backgroundColor: '#fff',
    // alignItems: "center",
    // justifyContent: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#efefef',
    backgroundColor: '#F5F5F6',
  },
  header: {
    padding: 10,
    paddingVertical: 5,
    // alignItems: 'center',
    flexDirection: 'row',
    minHeight: 50
  },
  headerLeft: {
    order: 1,
    width: 80,
  },
  headerCenter: {
    flex: 1,
    order: 2,
    flexDirection: 'row',
    fontSize: "30px",
    alignItems: 'center',
    justifyContent: "center",
  },
  headerRight: {
    order: 3,
    width: 80
  },
  title: {
    fontSize: 19,
    fontWeight: '600',
    textAlign: 'center',
  },
  Button: {
    width: 100,
    height: 50,
    borderRadius: 10,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: "#42A5F5",
  },
  ButtonText: {
    color: '#FFF',
    fontFamily: 'netmarbleM',
    fontSize: 20,
    justifyContent:'center',
    alignItems: 'center',
  },
  TitleContainer: {
    marginLeft: 10, 
    fontSize:27, 
    color: '#aaa', 
    backgroundColor: '#fff',
    // border: '5px'
    borderBottomColor: 'red',
    borderBottomWidth: '2px',
    marginBottom: 20,
    paddingBottom:20,
  },
  container: {
    backgroundColor: 'white',
    width: (Platform.OS === 'web') ? LayoutInfo.size.imagePart : "100%",
    minWidth: LayoutInfo.size.webMinWidth,
    maxWidth: LayoutInfo.size.imagePart,
  }, 
  listContainer: {
    flex: 1,
    height: "100%",
    backgroundColor: '#fafafa',
  },
  ImagePartLayout: {
    width: LayoutInfo.size.imagePart, 
    height: LayoutInfo.size.imagePart,
    // width: 400, 
    // height: 400,
  }, 
  ImagePart: {
    // resizeMode: 'cover',
  }, 
  ImagePartOverlay: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    top: LayoutInfo.imagePartIconSectionTop,
    opacity: 0.8,
    width: LayoutInfo.size.imagePart, 
    height: LayoutInfo.imagePartIconSection,
    backgroundColor: 'white',
  }, 
  ContentPart: {
    flex: 1,
    flexDirection: 'column', 
    backgroundColor: 'white',
    // justifyContent: 'space-between',
    // justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,

  }, 
  ContentHeader: {
    flexDirection: 'row', 
    justifyContent:'space-between',
    alignItems: 'center',
    paddingTop: 8,
    // paddingBottom: 5,
    // backgroundColor:'#a1a',
  },
  ContentHeaderText: {
    flex: 10,
    fontSize: 18,
    alignItems: 'center',
    fontFamily: 'netmarbleM'
  },
  ContentText: {
    fontFamily: 'netmarbleL',
    marginTop: 8,
    marginBottom: 8,
  },
  IconPart: {
    flex: 2,
    justifyContent:'center',
    flexDirection: 'row', 
    alignItems: 'center',
    // backgroundColor:'#aaf',
  },
});

decorate(FoodScreen, {
  curFoodId: observable,
  increase: action,
  decrease: action,
  setFoodId: action,
  lan: computed
})

// export default FoodScreen;
// export default observer(FoodScreen);
// export default inject('rootStore')(observer(FoodScreen));
export default inject('profileStore', 'foodStore', 'routerStore')(observer(FoodScreen));
