import React from 'react';
// import { ExpoConfigView } from '@expo/samples';
import { StyleSheet, FlatList, View, Text  } from 'react-native';
import { Tile, Button, Icon } from 'react-native-elements';

import { randomCards } from '../temp/tile';

export default class TileScreen extends React.Component {
  static navigationOptions = {
    title: 'Tile',
  };

  state = {
    refreshing: false,
    data: randomCards(20),
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    // return <ExpoConfigView />;

    return (
      // 1. Tile
      <FlatList
        data={this.state.data}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({ item }) => {
          return (
            <Tile
              key={item.key}
              // title={item.title}
              // caption={item.caption}
              // imageSrc={require('../assets/images/1.jpg')}
              imageSrc={{uri: item.image}}
              // featured
              contentContainerStyle={{ height: 100 }}
            >
              <View
                style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}
              >
                {/* <Text> {item.title} </Text> */}
                <Text> {item.caption} </Text>

                <View
                  style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}
                >
                  <Text>Caption</Text>
                  {/* <Text>Caption</Text> */}
                  <Button 
                    icon={<Icon name='rowing' color='#ffffff' />}
                    backgroundColor='#03A9F4'
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='Test' >
                  </Button>
                </View> 
                
              </View>
            </Tile>
          );
        }}
      />
        
      // 3. test
//       <View>
// <Tile
//       key={'1'}
//       title={'aaa'}
//       // caption={item.caption}
//       imageSrc={require('../assets/images/1.jpg')}
//       // featured
//       // icon={{ name: 'play-circle', type: 'font-awesome' }}
//       contentContainerStyle={{ height: 70 }}
//     >
//       <View
//         style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}
//       >
//         <Text>Caption</Text>
//         <Text>Caption</Text>
//       </View>
//     </Tile>

//     <Tile
//       key={'1'}
//       title={'aaa'}
//       // caption={item.caption}
//       imageSrc={require('../assets/images/1.jpg')}
//       // featured
//       // icon={{ name: 'play-circle', type: 'font-awesome' }}
//       contentContainerStyle={{ height: 70 }}
//     >
//       <View
//         style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}
//       >
//         <Text>Caption</Text>
//         <Text>Caption</Text>
//       </View>
//     </Tile>
//       </View>
      
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  }
});