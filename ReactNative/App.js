import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AppNavigator from './navigation/AppNavigator';
// import { AppLoading, Asset, Font, Icon } from 'expo';
import SplashScreen from 'react-native-splash-screen';


// for Redux
import { Provider } from 'react-redux';

// #type 1, normal
import { createStore } from 'redux';
// import reducers from './reducers';
// const store = createStore(reducers);

// #type 2, import
import store from './store';




// type Props = {};
// export default class App extends Component<Props> {
export default class App extends Component {
 state = {
    isLoadingComplete: false,
  };

  constructor(props){
    super(props);
    console.log("App constructor");

    global.language = 'ko';
    // global.language = 'en';
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    // if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
    //   return (
    //     <AppLoading
    //       startAsync={this._loadResourcesAsync}
    //       onError={this._handleLoadingError}
    //       onFinish={this._handleFinishLoading}
    //     />
    //   );
    // } else {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            {/* {Platform.OS === 'android' && <StatusBar barStyle="default" />} */}
            <AppNavigator />
          </View>
        </Provider>
      );
    // }
  }

  // _handleLoadingError = error => {
  //   // In this case, you might want to report the error to your error
  //   // reporting service, for example Sentry
  //   console.warn(error);
  // };

  // _handleFinishLoading = () => {
  //   this.setState({ isLoadingComplete: true });
  // };
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
