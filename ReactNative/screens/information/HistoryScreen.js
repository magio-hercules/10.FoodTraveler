import React from 'react';
import { View, Text, FlatList, StyleSheet, VirtualizedList } from 'react-native';

import { create } from 'apisauce'
import _size from 'lodash/size';
import _forEach from 'lodash/forEach';
import _values from 'lodash/values';
import _mapKeys from 'lodash/mapKeys';

import LayoutInfo from '../../constants/Layout';

import { Divider, Avatar } from 'react-native-elements';

const api = create({
  baseURL: 'http://ec2-13-125-205-18.ap-northeast-2.compute.amazonaws.com:7000/FooTravel',
  headers: { 'Content-Type': 'application/json' },
})


export default class HistoryScreen extends React.Component {
  state = {
    data: [],
    typeArray: {}
  };

  constructor(props){
    super(props);
    console.log("HistoryScreen constructor");
  }

  async componentDidMount () {
    console.log("call componentWillMount");

    let params = this.props.navigation.state.params;
    let _data = await this._getHistory(params.history_list);
    this.setState({data: _data});
  }

  render() {
    return (
      <FlatList
      data={this.state.data}
      keyExtractor={(item, index) => index.toString()} 
      renderItem={({ item, index }) => {
        console.log("renderItem");
        console.log(item);
        console.log(item.type);
        console.log(item.desc);

        return (
          <View style={styles.table}>
            <View
              style={styles.rowSection}
              key={index}
              width= {LayoutInfo.width}
              height= {100}>
              <View style={styles.iconPart}>
                <Avatar
                  size="medium"
                  rounded
                  overlayContainerStyle={{width:90, backgroundColor: '#BBDEFB'}}
                  title={item.type}
                  // iconStyle={{height:80, width:80}}
                  titleStyle={{fontSize: 15}}
                  // onPress={() => console.log("Works!")}
                  activeOpacity={0.7} />
              </View>
              <Text 
                style={{
                  flex:1,
                  marginLeft: 10,
                  // backgroundColor:'#1aa'
                  }} 
                numberOfLines={5}
                ellipsizeMode='tail'> 
                {item.desc} 
              </Text>
            </View>
            <Divider style={{ backgroundColor: 'blue' }} />
          </View>
        );
    }}
  />
    );
  } // end of render


  _getHistory(list) {
    console.log("call _getHistory");
    console.log("list : " + list);
    let array = [];
    array.push(list);

    return api
            .post('/history', { "history_list": array })
            .then(response => response.data)
            .then((data) => {
              console.log("history_list count : " + data.length);
              let count = data.length;
              let arr = [];
              let _type, _desc;
              let index = 1;
              
              let _lan;
              switch (global.language) {
                case 'ko':
                _lan = "description_ko";
                  break;
                case 'en':
                _lan = "description_en";
                  break;
                case 'jp':
                _lan = "description_jp";
                  break;
                case 'zh':
                _lan = "description_zh";
                  break;
              }

              for (let i = 0; i < count; i ++) {
                if (_type != data[i].type) {
                  index = 1;
                }
                _type = data[i].type;
                // _desc = data[i].description_en;
                _desc = data[i][_lan];
                _typeIndex = _type + ' ' +index;
                
                arr.push({
                  type: _typeIndex,
                  desc: _desc
                });
                index++;
              }

              return arr;
              // return typeArr;
            })
            .catch((err) => {
              console.error(err);
            });
  } // end of _getHistory(list)
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
    // backgroundColor: 'white',
  }, 
  iconPart: {
    width:90,
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: '#a1a'
  }
});