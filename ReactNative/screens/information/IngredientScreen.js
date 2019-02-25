import React from 'react';
import { View, Text, FlatList, StyleSheet, VirtualizedList } from 'react-native';

import { create } from 'apisauce'
import _size from 'lodash/size';
import _forEach from 'lodash/forEach';
import _values from 'lodash/values';
import _mapKeys from 'lodash/mapKeys';

import LayoutInfo from '../../constants/Layout';
import AvatarIcon from '../../components/AvatarIcon';

import { Divider, Avatar } from 'react-native-elements';

const api = create({
  baseURL: 'http://ec2-13-125-205-18.ap-northeast-2.compute.amazonaws.com:7000/FooTravel',
  headers: { 'Content-Type': 'application/json' },
})

export default class IngredientScreen extends React.Component {
  static navigationOptions = {
    // title: 'Ingredient',
  };

  state = {
    // params: this.props.navigation.state.params,
    data: [],
    typeArray: {}
  };

  constructor(props){
    super(props);
    console.log("IngredientScreen constructor");
  }

  async componentDidMount () {
    console.log("call componentWillMount");

    let params = this.props.navigation.state.params;
    let _data = await this._getInfoIngredient(params.ingredient_list);
    // console.log("_data : " + _data);
    // console.log("_data : ");
    // console.log(_data);
    this.setState({data: _data});
  }

  
  render() {
    console.log('call render');
    console.log(this.state.data);
    console.log('call render 1');
    let keys = Object.keys(this.state.data);
    let arrayData = Object.values(this.state.data)
    console.log(keys);
    console.log(arrayData);
    console.log('call render 2');

    var newArr = _values(_mapKeys(this.state.data, function(value, key) { 
      value.id = key; 
      return value; 
    }));
    console.log(newArr);

    return (
      <FlatList
        // data={_values(this.state.data)}
        data={newArr}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({ item, index }) => {
          console.log("renderItem");
          console.log(item);
          console.log(index);
          console.log(keys[index]);

          let _imageSrc;
          // let fileName = `../../assets/icons/ingredient/` + keys[index] + `.png`;
          // _imageSrc = require(fileName);

          if (keys[index] == "Meat") {
            _imageSrc = require('../../assets/icons/ingredient/Meat.png');
          } else if (keys[index] == "Seafood") {
            _imageSrc = require('../../assets/icons/ingredient/Seafood.png');
          } else if (keys[index] == "Grain") {
            _imageSrc = require('../../assets/icons/ingredient/Grain.png');
          } else if (keys[index] == "Vegetable") {
            _imageSrc = require('../../assets/icons/ingredient/Vegetable.png');
          } else if (keys[index] == "Nut") {
            _imageSrc = require('../../assets/icons/ingredient/Nut.png');
          } else if (keys[index] == "Bread") {
            _imageSrc = require('../../assets/icons/ingredient/Bread.png');
          }else if (keys[index] == "Fruit") {
            _imageSrc = require('../../assets/icons/ingredient/Fruit.png');
          } else if (keys[index] == "Oil") {
            _imageSrc = require('../../assets/icons/ingredient/Oil.png');
          } else if (keys[index] == "Flavor") {
            _imageSrc = require('../../assets/icons/ingredient/Flavor.png');
          } else if (keys[index] == "Milk product") {
            _imageSrc = require('../../assets/icons/ingredient/Milk product.png');
          } else if (keys[index] == "Drink") {
            _imageSrc = require('../../assets/icons/ingredient/Drink.png');
          } else if (keys[index] == "Liquor") {
            _imageSrc = require('../../assets/icons/ingredient/Liquor.png');
          }

          return (
            <View style={styles.table}>
              <View
                style={styles.rowSection}
                key={index}
                width= {LayoutInfo.width}
                height= {100}
              >
                <View style={{width:80, 
                  // backgroundColor: '#a1a'
                  }}>
                <AvatarIcon
                    title={keys[index]}
                    // icon={{name: 'meat', type: 'font-awesome'}} // https://fontawesome.com/
                    // imageSrc={require('../../assets/icons/test/profile.png')}
                    imageSrc={_imageSrc}
                  />
                </View>
                {/* <View style={styles.iconPart}>
                  <Avatar
                    size="medium"
                    // rounded
                    // overlayContainerStyle={{width:70, backgroundColor: '#BBDEFB'}}
                    title={keys[index]}
                    source={_imageSrc}
                    // iconStyle={{height:80, width:80}}
                    titleStyle={{fontSize: 15}}
                    // onPress={() => console.log("Works!")}
                    activeOpacity={0.7} />
                </View> */}
                <Text 
                      style={{
                        flex:1,
                        marginLeft: 10,
                        //  backgroundColor:'#1aa'
                        }} 
                      numberOfLines={3}
                      ellipsizeMode='tail'
                      > {item} </Text>
              </View>
              <Divider style={{ backgroundColor: 'blue' }} />
            </View>
          );
      }}
    />
    );
  } // end of render

  
  _getInfoIngredient(list) {
    console.log("call _getInfoIngredient");
    console.log("list : " + list);
    let array = [];
    array.push(list);

    return api
            .post('/ingredient', { "ingredient_list": array })
            .then(response => response.data)
            // .then(console.log)
            // .then(data => data[_id])
            // .then(console.log)
            .then((data) => {
              console.log("ingredient_list count : " + data.length);
              let count = data.length;
              let arr = [];
              let typeArr = {};

              for (let i = 0; i < count; i ++) {
                // type 1
                // arr.push({
                //   key: data[i].id,
                //   ingredient_ko: data[i].ingredient_ko,
                //   ingredient_en: data[i].ingredient_en,
                //   type_ko: data[i].type_ko,
                //   type_en: data[i].type_en,
                //   icon_url: data[i].icon_url,
                // });

                // type 2
                let _type_en = data[i].type_en;
                let _ingredient_en = data[i].ingredient_en;
                if (false) {
                  if (typeArr[_type_en] == null || typeArr[_type_en] == undefined) {
                    typeArr[_type_en] = [];
                    console.log("add " + _type_en + ": " + _ingredient_en);
                    typeArr[_type_en].push(_ingredient_en);
                  } else {
                    console.log("add " + _type_en + ": " + _ingredient_en);
                    typeArr[_type_en].push(_ingredient_en);
                  }
                } else {
                  if (typeArr[_type_en] == null || typeArr[_type_en] == undefined) {
                    typeArr[_type_en] = _ingredient_en;
                  } else {
                    typeArr[_type_en] += ', ' + _ingredient_en;
                  }
                }

                // type3 
                // arr.push({
                //   type_en: data[i].type_en,
                //   ingredient_ko: data[i].ingredient_ko,
                //   ingredient_en: data[i].ingredient_en,
                //   type_ko: data[i].type_ko,
                //   icon_url: data[i].icon_url,
                // });
              }
              // arr.push(typeArr);

              // console.log(arr);
              // console.log(typeArr);
              // return arr;
              return typeArr;
            })
            .catch((err) => {
              console.error(err);
            });
  } // end of _getInfoIngredient(list)
}


const styles = StyleSheet.create({
  table: {
    padding: 10,
    backgroundColor: 'white',
  }, 
  rowSection: {
    flexDirection: 'row', 
    alignItems: 'center',
    // justifyContent: 'space-evenly',
    justifyContent: 'flex-start',
    // padding: 10,
    backgroundColor: 'white',
  }, 
  iconPart: {
    width:90,
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: '#a1a'
  }
});