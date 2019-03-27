import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';




export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    // title: 'Ingredient',
  };
  
  state = {
  };


  constructor(props){
    super(props);
    console.log("ProfileScreen constructor");
  }

  async componentDidMount () {
    console.log("call componentWillMount");

    let params = this.props.navigation.state.params;
    console.log("profile_id test : " + params.profile_id);
    // let _data = await this._getHistory(params.history_list);
    // this.setState({data: _data});
  }


  _onPressKorean = () => {
    console.log('_onPressKorean');
    // this.setState({
    //   count: this.state.count+1
    // })

    // global.language = 'ko';
    
    // Immediately reload the React Native Bundle
    // RNRestart.Restart();
  }

  _onPressEnglish = () => {
    console.log('_onPressEnglish');
    
    // global.language = 'en';

    // Immediately reload the React Native Bundle
    // RNRestart.Restart();
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={require('../../assets/icons/test/profile_tiger.png')}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>장영훈</Text>
              <Text style={styles.info}>{global.language == 'en' ? 'Developer' : '개발자'}</Text>
              <Text style={styles.description}>
                {global.language == 'en' ? 'Lorem ipsum dolor sit amet, saepe sapientem eu nam.' 
                : '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세'}
              </Text>

              <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.buttonContainer}
                  onPress={this._onPressKorean}>
                  <Text style={styles.buttonText}>한글</Text>  
                </TouchableOpacity>              
                <TouchableOpacity style={styles.buttonContainer}
                  onPress={this._onPressEnglish}>
                  <Text style={styles.buttonText}>English</Text> 
                </TouchableOpacity>
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
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonGroup: {
    marginTop:30,
    flex:1,
    flexDirection: 'row',
    // backgroundColor:'#1af',
    // color: '#aa1'
  },
  buttonContainer: {
    margin:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:150,
    borderRadius:30,
    color: '#FFFFFF',
    fontSize:25,
    backgroundColor: "#00BFFF",
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize:20,
  },
});