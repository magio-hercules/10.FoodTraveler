import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

export default class FilterScreen extends React.Component {
  static navigationOptions = {
    // title: 'Ingredient',
  };
  
  state = {
  };


  constructor(props){
    super(props);
    console.log("FilterScreen constructor");
  }

  async componentDidMount () {
    console.log("call componentWillMount");

    let params = this.props.navigation.state.params;
    console.log(params.profile_id);
    // let _data = await this._getHistory(params.history_list);
    // this.setState({data: _data});
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
              <Image style={styles.avatar}
                source={{uri: 'https://bootdey.com/img/Content/avatar/avatar1.png'}}/>

              <Text style={styles.name}>
                LABIS
              </Text>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.bodyContent}>

            <View style={styles.menuBox}>
              <Image style={styles.icon} source={{uri: 'https://png.icons8.com/facebook-like/color/40/2ecc71'}}/>
              <Text style={styles.info}>Icon</Text>
            </View>

            <View style={styles.menuBox}>
              <Image style={styles.icon} source={{uri: 'https://png.icons8.com/heart/office/40/2ecc71'}}/>
              <Text style={styles.info}>Icon</Text>
            </View>

            <View style={styles.menuBox}>
              <Image style={styles.icon} source={{uri: 'https://png.icons8.com/bar-chart/dusk/50/ffffff'}}/>
              <Text style={styles.info}>Icon</Text>
            </View>

            <View style={styles.menuBox}>
              <Image style={styles.icon} source={{uri: 'https://png.icons8.com/shopping-cart/color/50/ffffff'}}/>
              <Text style={styles.info}>Icon</Text>
            </View>

            <View style={styles.menuBox}>
              <Image style={styles.icon} source={{uri: 'https://png.icons8.com/product/nolan/50/ffffff'}}/>
              <Text style={styles.info}>Icon</Text>
            </View>

            <View style={styles.menuBox}>
              <Image style={styles.icon} source={{uri: 'https://png.icons8.com/shopping-basket/color/50/ffffff'}}/>
              <Text style={styles.info}>Icon</Text>
            </View>

            <View style={styles.menuBox}>
              <Image style={styles.icon} source={{uri: 'https://png.icons8.com/notification/dusk/50/ffffff'}}/>
              <Text style={styles.info}>Icon</Text>
            </View>

            <View style={styles.menuBox}>
              <Image style={styles.icon} source={{uri: 'https://png.icons8.com/profile/color/50/ffffff'}}/>
              <Text style={styles.info}>Icon</Text>
            </View>

            <View style={styles.menuBox}>
              <Image style={styles.icon} source={{uri: 'https://png.icons8.com/friends/color/50/ffffff'}}/>
              <Text style={styles.info}>Icon</Text>
            </View>
          </View>
      </View>
    </View>
    );
  }
}


const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body: {
    flex: 1,
    // justifyContent:'space-between',
    justifyContent:'center',
    alignItems: 'center',
    padding:10,
  },
  textInfo:{
    fontSize:18,
    marginTop:20,
    color: "#696969",
  },
  bodyContent:{
    flex:1,
    paddingTop:40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    flexWrap: 'wrap',
    // backgroundColor:'#a1a',
  },
  menuBox:{
    backgroundColor: "#DCDCDC",
    width:100,
    height:100,
    alignItems: 'center',
    justifyContent: 'center',
    margin:12,
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height:2,
      width:-2
    },
    elevation:4,
  },
  icon: {
    width:60,
    height:60,
  },
  info:{
    fontSize:22,
    color: "#696969",
  }
});