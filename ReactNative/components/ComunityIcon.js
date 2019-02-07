import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableHighlight } from 'react-native';

import Layout from '../constants/Layout';


const propTypes = {
    iconSrc : PropTypes.node,
    tintColor : PropTypes.string,
    onPress: PropTypes.func,
};

const defaultProps = {
    onPress: createWarning('onPress'),
};

function createWarning(funcName) {
    return () => console.warn(funcName + ' is not defined');
}


export default class ComunityIcon extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableHighlight style={styles.Icon}
                onPress={this.props.onPress}
                underlayColor='#fff'>
                <Image style={styles.IconImage}
                          tintColor={this.props.tintColor}
                          source={this.props.iconSrc}/>
            </TouchableHighlight>
        );
    }
}

ComunityIcon.propTypes = propTypes;
ComunityIcon.defaultProps = defaultProps;


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