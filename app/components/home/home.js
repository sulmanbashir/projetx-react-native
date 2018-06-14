import React, { Component } from 'react';
import { Image, TouchableHighlight, TouchableOpacity, ScrollView, StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import { styles } from './styles';
import { Actions } from 'react-native-router-flux';
import { StackNavigator } from 'react-navigation';
import YouTube from 'react-native-youtube';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LoadingIndicator } from '../loadingIndicator/loadingIndicator';

const apiKey = 'AIzaSyC7uBEOA4YuSOkgbBOG-SUfuv_QTe-T3To';
const channelId = 'UCnTCkU3VKG8NB9uJhZ1gf8w';
const results = 30;

export class Home extends React.Component {
    
    static navigationOptions = {
    headerTitleStyle: { 
        alignSelf: 'center' 
    },
    title: 'Projet X',
    headerStyle: {
      backgroundColor: '#ff0000'
    },
    headerRight: (
      <TouchableOpacity>
        <Image 
          style={{height: 22, width: 22, marginLeft: 25}} 
          source={require('../images/logo.png')} />
      </TouchableOpacity>
    ),
    headerLeft: (
      <TouchableOpacity>
        <Image 
          style={{height: 22, width: 22}} 
          source={require('../images/logo2.png')} />
      </TouchableOpacity>
    )
  }

  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }

  logout() {
    this.props.logout();
    setTimeout(() => {
      Actions.reset('login');
    }, 100);
  }

  componentDidMount(){
    fetch(`https://www.googleapis.com/youtube/v3/search/?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${results}`)
    .then(res => res.json())
    .then(res => {
      const videoId = []
      res.items.forEach(item => {
        videoId.push(item)
      })
      this.setState({
        data: videoId
      }) 
    })
    .catch(error => {
      console.error(error)
    })
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.body}>
            {this.state.data.map((item, i) => 
           	<TouchableHighlight 
              key={item.id.videoId}
              onPress={() => navigate('play-video', {youtubeId: item.id.videoId})}>
              <View style={styles.vids}>
                <Image 
                  source={{uri: item.snippet.thumbnails.medium.url}} 
                  style={{width: 320, height: 180}}/>
                <View style={styles.vidItems}>
                  <Image 
                    source={require('../images/avatar2.jpg')} 
                    style={{width: 40, height: 40, borderRadius: 20, marginRight: 5}}/>
                  <Text style={styles.vidText}>{item.snippet.title}</Text>
                  <Icon name='more-vert' size={20} color='#555'/> 
                </View>
              </View>
            </TouchableHighlight>
            )}
          </View>
        </ScrollView>
        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabItems} onPress={() => navigate('home', {})}>
            <Icon name='home' size={25} color='#444'/>
            <Text style={styles.tabTitle}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItems} onPress={() => navigate('message', {})}>
            <Icon name='message' size={25} color='#444'/>
            <Text style={styles.tabTitle}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItems} onPress={() => navigate('upload', {})}>
            <Icon name='camera' size={25} color='#444'/>
            <Text style={styles.tabTitle}>Upload Video</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItems} onPress={this.logout.bind(this)} >
            <Icon name='power-settings-new' size={25} color='#444'/>
            <Text style={styles.tabTitle}>Logout</Text>
          </TouchableOpacity>
        </View>
	    </View>
    )
  }
}

/* test@test.fr */