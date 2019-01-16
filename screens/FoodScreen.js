import React from 'react';
import { StyleSheet, FlatList, View, Text, Image  } from 'react-native';
import { Tile, Button, Icon } from 'react-native-elements';

import { randomCards } from '../temp/tile';

import LayoutInfo from '../constants/Layout';

import { Dimensions } from 'react-native';
import Layout from '../constants/Layout';

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

  render() {
    return (
      <FlatList
        data={this.state.data}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({ item }) => {
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
            <Image
              style={styles.ImagePart}
              source={{uri: item.image}}
              >

            </Image>
            <View
              style={styles.ContentPart}
            >
              <Text> {item.title} </Text>
              <View
                style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }} >
                <Text> {item.caption} </Text>
                <Button 
                  icon={<Icon name='rowing' color='#ffffff' />}
                  backgroundColor='#03A9F4'
                  buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                  title='Test' >
                </Button>
              </View> 
              
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
    backgroundColor: 'white'
  }, 
  ImagePart: {
    width: LayoutInfo.width, 
    height: LayoutInfo.size.imagePart,
    resizeMode: 'cover'
  }, 
  ContentPart: {
    flex: 1, 
    flexDirection: 'column', 
    justifyContent: 'space-between',
  }
});