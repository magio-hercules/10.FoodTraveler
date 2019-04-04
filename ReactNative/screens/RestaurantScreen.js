import React from 'react';
import { StyleSheet, FlatList, View, Text, Image, TouchableHighlight, ImageBackground, Dimensions } from 'react-native';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { create } from 'apisauce'
import { connect } from 'react-redux';

import * as counterActions from '../reducers/counter';

import LayoutInfo from '../constants/Layout';
import Language from '../constants/Language';

import InformationIcon from '../components/InformationIcon';
import CommunityIcon from '../components/CommunityIcon';




const api = create({
  baseURL: 'http://ec2-13-125-205-18.ap-northeast-2.compute.amazonaws.com:7000/FooTravel',
  headers: { 'Content-Type': 'application/json' },
})


class RestaurantScreen extends React.Component {
  state = {
    refreshing: false,
    data: []
  };

  // 참고 LifeCycle
  // 컴포넌트 생성시 constructor -> componentWillMount -> render -> componentDidMount
  // 컴포넌트 제거시 componentWillUnmount 
  // 컴포넌트 prop 변경시 componentWillReceiveProps -> shouldComponentUpdate -> componentWillUpdate-> render -> componentDidUpdate 

  constructor(props){
    super(props);
    console.log("RestaurantScreen constructor");
  }

  componentWillMount () {
    console.log("call componentWillMount");
  }

  async componentDidMount() {
    console.log("call componentDidMount");

    // let _data = await this._getTotalFoods();
    let _data = await this._getTotalStores();
    console.log("_data : " + _data);
    this.setState({data: _data});

    console.log("end componentDidMount");
  }

  async componentWillReceiveProps() {
    console.log('RestaurantScreen componentWillReceiveProps');

    // let _data = await this._getTotalFoods();
    let _data = await this._getTotalStores();
    console.log("_data : " + _data);
    this.setState({data: _data});
  }

  _getTotalStores() {
    console.log("call _getTotalStores");
    
    return api
      .get('/total_stores')
      .then(response => response.data)
      .then((data) => {
        // console.log(data);
        console.log("_getTotalStores count : " + data.length);

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
            food_id: data[i].food_id,
            city_id: data[i].city_id,
            name: data[i].name,
            description: data[i][_desc],
            menu: data[i].menu,
            // gallery_list: data[i].gallery_list,
            position: data[i].position,
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

  _onPressDetail = (index) => {
    console.log('call _onPressDetail : index(' + index + ')');
    let _data = this.state.data[index];
    let _key = this.state.data[index].key;
    console.log('_onPressDetail : store_id(' + _key + ')');
    
    const navigateAction = NavigationActions.navigate({
      routeName: "Detail",
      params: {
        // index: this.state.index,
        name: _data.name,
        menu: _data.menu,
      }
    });
    this.props.navigation.dispatch(navigateAction);
  }

  _onPressGallery = (index) => {
    console.log('call _onPressGallery : index(' + index + ')');
    let _key = this.state.data[index].key;
    console.log('_onPressGallery : store_id(' + _key + ')');
    
    const navigateAction = NavigationActions.navigate({
      routeName: "Gallery",
      params: {
        // gallery_list: gallery_list,
      }
    });
    this.props.navigation.dispatch(navigateAction);
  }

  _onPressMap = (index) => {
    console.log('call _onPressMap : index(' + index + ')');
    let _key = this.state.data[index].key;
    let position = this.state.data[index].position;
    console.log('_onPressMap : store_id(' + _key + ')');
    console.log('_onPressMap : position(' + position + ')');
    
    const navigateAction = NavigationActions.navigate({
      routeName: "Map",
      params: {
        // position: position,
      }
    });
    this.props.navigation.dispatch(navigateAction);
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
                  name={Language.Detail[global.language]}
                  iconSrc={require('../assets/icons/contents/detail.png')}
                  onPress={() => this._onPressDetail(index)}/>
                <InformationIcon 
                  name={Language.Gallery[global.language]}
                  iconSrc={require('../assets/icons/contents/gallery.png')}
                  onPress={() => this._onPressGallery(index)}/>
                <InformationIcon 
                  name={Language.Map[global.language]}
                  iconSrc={require('../assets/icons/contents/place.png')}
                  onPress={() => this._onPressMap(index)}/>
              </View>
            </ImageBackground>

            <View style={[styles.ContentPart]} >
              <View style={styles.ContentHeader}>
                <Text 
                  style={styles.ContentHeaderText}> 
                  {item.name} 
                </Text>
              </View>
              
              <Text 
                  style={styles.ContentText}
                  numberOfLines={6}
                  ellipsizeMode='tail'> {item.description} </Text>
            </View>
          </View>
          );
        }}
      />
    );
  }
}


RestaurantScreen.propTypes = {
  navigation: PropTypes.object
};


const mapStateToProps = (state) => {
  return {
      number: state.counter.number
      // index: state.info.index,
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
export default connect(mapStateToProps, mapDispatchProps)(RestaurantScreen);

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
});