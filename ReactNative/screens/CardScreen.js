import React from 'react';
// import { ExpoConfigView } from '@expo/samples';
import { FlatList, View, Text  } from 'react-native';
import { Tile, Button, Icon, Card } from 'react-native-elements';

import { randomCards } from '../temp/tile';

export default class CardScreen extends React.Component {
  static navigationOptions = {
    title: 'Card',
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
      <FlatList
        data={this.state.data}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({ item }) => {
          const { url } = item.image;

          return (
            <Card
              key={item.key}
              title={item.title}
              // caption={item.caption}
              // image={require('../assets/images/1.jpg')}
              image={{uri: item.image}}
            >
              <Text> {item.caption} </Text>
              <Button 
                icon={<Icon name='code' color='#ffffff' />}
                backgroundColor='#03A9F4'
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='Test' >
              </Button>
            </Card>
          );
        }}
      />
    );
  }
}
