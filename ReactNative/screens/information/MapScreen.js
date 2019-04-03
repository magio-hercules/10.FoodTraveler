import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, Button, TouchableHighlight, ToastAndroid } from 'react-native';

// # type1
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// # type2
// var MapView = require('react-native-maps');
import { Marker, Callout, ProviderPropType } from 'react-native-maps';

import { create } from 'apisauce'
import _size from 'lodash/size';
import _forEach from 'lodash/forEach';
import _values from 'lodash/values';
import _mapKeys from 'lodash/mapKeys';

import LayoutInfo from '../../constants/Layout';

import { Divider, Avatar } from 'react-native-elements';

const ASPECT_RATIO = LayoutInfo.window.width / LayoutInfo.window.height;
const LATITUDE = 37.561918;
const LONGITUDE = 126.986552;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const LATITUDE_DELTA = 0.015;
const LONGITUDE_DELTA = 0.0121;

const api = create({
  baseURL: 'http://ec2-13-125-205-18.ap-northeast-2.compute.amazonaws.com:7000/FooTravel',
  headers: { 'Content-Type': 'application/json' },
})

// 37.561918, 126.986552
var position = {
  latitude: 37.561918,
  longitude: 126.986552
};

var position2 = {
  latitude: 37.562218,
  longitude: 126.979552
};

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


export default class MapScreen extends React.Component {
  state = {
    data: [],
    typeArray: {}
  };

  constructor(props){
    super(props);
    
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      poi: null,
    };

    this.onPoiClick = this.onPoiClick.bind(this);

    console.log("MapScreen constructor");
  }

  componentDidMount () {
    console.log("[MAP] call componentDidMount");
    
    console.log("[MAP] end componentDidMount");
  }

  onPoiClick(e) {
    console.log("onPoiClick");
    const poi = e.nativeEvent;
    console.log("onPoiClick (poi.placeId : " + poi.placeId + ", poi.name : " + poi.name + ")");

    this.setState({
      poi,
    });
  }

  
  _onPressMyPosition = () => {
    console.log('call _onPressMyPosition');
    
    ToastAndroid.show('press My Position', ToastAndroid.SHORT);
  }

  _onPressButton = (flag) => {
    console.log('call _onPressButton : flag(' + flag + ')');
    
    if (flag) {
      ToastAndroid.show('press Plus Button', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('press Minus Button', ToastAndroid.SHORT);
    }
  }


  render() {
    console.log("[MAP] render");

    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          // provider={this.props.provider}
          style={styles.map}
          // region={{
          //   latitude: 37.561918,
          //   longitude: 126.986552,
          //   latitudeDelta: 0.015,
          //   longitudeDelta: 0.0121,
          // }}
          initialRegion={this.state.region}
          // onPoiClick={this.onPoiClick}
          // onPoiClick={(e) => console.log(e)}
          // onPoiClick={({ nativeEvent }: any) => console.log(nativeEvent)}
          onPoiClick={() => Alert.alert('onPoiClick')}
        >
        <Marker
              // key={marker.key}
              // coordinate={marker.coordinate}
              // pinColor={marker.color}
              coordinate={position} 
              pinColor={randomColor()}
              // pinColor={'#aa1100'}
              title="고궁 음식점"
              description="서울특별시 중구 충무로2가 명동8가길 27"
            />

        {this.state.poi && (
            <Marker
              coordinate={this.state.poi.coordinate}
            >
              <Callout>
                <View>
                  <Text>Place Id: { this.state.poi.placeId }</Text>
                  <Text>Name: { this.state.poi.name }</Text>
                </View>
              </Callout>
            </Marker>
          )}
      </MapView>
      <TouchableHighlight 
          style={styles.button_my_position}
          underlayColor='#EEEEEE'
          onPress={() => this._onPressMyPosition()}>
        <Image style={styles.icon}
                      source={require('../../assets/icons/map/my_pos.png')}
        />
      </TouchableHighlight>
      <TouchableHighlight
          style={styles.button_plus} 
          underlayColor='#EEEEEE'
          onPress={() => this._onPressButton(true)}>
        <Text style={styles.button_font} >
          +
        </Text>
      </TouchableHighlight>
      <TouchableHighlight 
          style={styles.button_minus}
          underlayColor='#EEEEEE'
          onPress={() => this._onPressButton(false)}>
          <Text style={styles.button_font}>
            -
          </Text>
        </TouchableHighlight>
    </View>
   
    );
  } // end of render

}


MapScreen.propTypes = {
  provider: ProviderPropType,
};




const styles = StyleSheet.create({
  container: {
    // marginTop: 50,
    ...StyleSheet.absoluteFillObject,
    // height: 400,
    // width: 400,
    width: LayoutInfo.width, 
    height: LayoutInfo.height,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#aa1100'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
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
  icon: {
    width: 30, 
    height: 30, 
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: '#a1a'
  },
  button_font: {
    fontSize: 18
  },
  button_my_position: {
    position: "absolute", 
    justifyContent:'center',
    alignItems: 'center',
    width: 50, 
    height: 50, 
    left: 10, 
    bottom: 30, 
    borderRadius: 50 / 2,
    // shadowColor: '#11aa11',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 10,
    elevation: 5,
    backgroundColor: '#ffffff'
  },
  button_plus: {
    position: "absolute", 
    justifyContent:'center',
    alignItems: 'center',
    elevation: 5,
    width: 30, 
    height: 30, 
    right:10, 
    top: 10, 
    borderRadius: 5,
    backgroundColor: '#ffffff'
  },
  button_minus: {
    position: "absolute", 
    justifyContent:'center',
    alignItems: 'center',
    elevation: 5,
    width: 30, 
    height: 30, 
    right:10, 
    top: 45, 
    borderRadius: 5,
    backgroundColor: '#ffffff'
  },
  
});