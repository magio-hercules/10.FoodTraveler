import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
// import { Icon } from 'expo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Layout from '../constants/Layout';
import Colors from '../constants/Colors';



const propTypes = {
  // name : PropTypes.string,
  iconSrc : PropTypes.node,
};

const defaultProps = {
  // name: "",
};




export default class TabBarIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      // <Icon.Ionicons
      // <Ionicons
      //   name={this.props.name}
      //   size={26}
      //   style={{ marginBottom: -3 }}
      //   color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      // />
      // <Text>{this.props.name}</Text>
      <View>
        <Image style={styles.IconImage}
              tintColor={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
              source={this.props.iconSrc}/>
        {/* <Text>{this.props.name}</Text> */}
      </View>
    );
  }
}


TabBarIcon.propTypes = propTypes;
TabBarIcon.defaultProps = defaultProps;




const styles = StyleSheet.create({
  Icon: {
      flexDirection: 'row', 
      justifyContent: 'center',
      alignItems: 'center',
      width: Layout.contentsPartIconSize,
      height: Layout.contentsPartIconSize,
      // backgroundColor:'#afa',
    },
  IconImage: {
      width: Layout.contentsPartIconSize,
      height: Layout.contentsPartIconSize,
      // backgroundColor:'#afa',
  }
});