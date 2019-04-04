import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet, Image } from 'react-native';

import ImageSlider from 'react-native-image-slider';

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

const images = [
  'https://korean.visitseoul.net/comm/getImage?srvcId=MEDIA&parentSn=1889&fileTy=MEDIA&fileNo=1&thumbTy=L',
  'http://tong.visitkorea.or.kr/cms/resource/88/1290988_image2_1.jpg',
  'https://mblogthumb-phinf.pstatic.net/MjAxNzA3MDZfMjE0/MDAxNDk5MzI4NTUyMDY5.KriNSnlEsWIWsiRWY_mw7iHFptgchrzOkTooQlVtIdsg.mW7GQ5aDasNRlWDCfRHsg07RWKOYUR3Hj-OUJ47qKjcg.JPEG.thdus0322/%EB%AA%85%EB%8F%99%EC%97%AD_%EA%B3%A0%EA%B8%B0%EC%A7%91_%EA%B3%A0%EA%B6%81_%EB%AA%85%EB%8F%99%EC%A0%90_%287%29.JPG?type=w2',
  'https://t1.daumcdn.net/cfile/tistory/231769345788362A4C',
];

export default class GalleryScreen extends React.Component {
  state = {
    data: [],
    typeArray: {}
  };

  constructor(props){
    super(props);
    console.log("GalleryScreen constructor");
  }

  async componentDidMount () {
    console.log("call componentWillMount");

  }

  render() {
    return (
      <ImageSlider
        loop
        autoPlayWithInterval={5000}
        images={images}
        onPress={({ index }) => alert(index)}
        customSlide={({ index, item, style, width }) => (
        // It's important to put style here because it's got offset inside
        <View
          key={index}
          style={[
            style,
            styles.customSlide,
            { backgroundColor: 'black' },
          ]}
        >
          <Image 
            source={{ uri: item }} 
            resizeMode='contain'
            style={styles.customImage} />
        </View>
      )}
      customButtons={(position, move) => (
        <View style={styles.buttons}>
          {images.map((image, index) => {
            return (
              <TouchableHighlight
                key={index}
                underlayColor="transparent"
                onPress={() => move(index)}
                style={styles.button}
              >
                {/* <Text style={position === index ? styles.buttonSelected : styles.buttonNotSelected}>
                  {index + 1}
                </Text> */}
                <Image style={position === index ? styles.dotSelected : styles.dotNormal}
                      source={require('../../assets/icons/dot.png')}/>
              </TouchableHighlight>
            );
          })}
        </View>
      )}
    />
    );
  } // end of render

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
  },
  buttons: {
    zIndex: 1,
    height: 15,
    marginTop: -25,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    margin: 3,
    width: 15,
    height: 15,
    opacity: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotSelected: {
    opacity: 1,
    tintColor: 'white',
    width: 25,
    height: 25,
  },
  dotNormal: {
    opacity: 0.6,
    tintColor: 'white',
    width: 25,
    height: 25,
  },
  customSlide: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customImage: {
    width: LayoutInfo.window.width,
    height: LayoutInfo.window.height
  },
});