import React, { Component } from 'react';
import { ScrollView, StyleSheet, FlatList, Text } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { randomUsers } from '../temp/util';


 class ListScreen extends Component {
  static navigationOptions = {
    title: 'List',
  };

  state = {
    refreshing: false,
    data: randomUsers(40),
  };

  onEndReached = () => {
    console.log('onEndReached start');
    this.setState(state => ({
      data: [
        state.data,
        randomUsers(),
      ]
    }));

    console.log('onEndReached end');
  };

  onRefresh = () => {
    console.log('onRefresh start');
    this.setState({
      data: randomUsers(40),
    });
    console.log('onRefresh end');
  }


  render() {
    return (
       <FlatList
          // keyExtractor={this.keyExtractor}
          keyExtractor={(item, index) => index.toString()} 
          data={this.state.data}
          initialNumToRender={40}
          // onEndReachedThreshold={1}
          // onEndReached={this.onEndReached}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
          renderItem={({ item }) => {
            return (
              <ListItem
                key={item.key}
                title={item.name}
                avatar={{uri: item.avatar}}
                leftAvatar={{
                  source: item.avatar && { uri: item.avatar },
                  title: item.name
                }}
              />
            );
          }}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
export default ListScreen;