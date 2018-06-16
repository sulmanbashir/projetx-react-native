import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
  Button,
  Platform,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import Video from 'react-native-video';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../home/styles';

import { StackNavigator, NavigationActions, DrawerNavigator } from 'react-navigation';
const EntityAction = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'home' }),
    ]  
});

export class Upload extends React.Component {
     
  constructor(props) {
    super(props);
  }

    state = {
      VideoSource: null,
      VideoName: null,
      progress: null,
    };
    selectVideoTapped() {
        const options = {
            title: 'Video Picker',
            takePhotoButtonTitle: 'Take Video...',
            mediaType: 'video',
            videoQuality: 'medium'
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled video picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                this.setState({
                    VideoSource: response.uri
                });
            }
        });
    }

    sendVideoToDropbox() {
        var extension = ".mov";
        
        if (this.state.VideoName == null) {
            this.state.VideoName = "démo.mov";
        } else {
            this.state.VideoName = this.state.VideoName + extension;    
        }
        RNFetchBlob.fetch('POST', 'https://content.dropboxapi.com/2/files/upload', {
                Authorization : "Bearer V5yJZ4jOR9AAAAAAAAAAW67L7kVEWG2zi-hK4HmUyH_wuyKN1HnSsru_mZXRsdus",
                'Dropbox-API-Arg': JSON.stringify({
                  path : '/'+this.state.VideoName,
                  mode : 'add',
                  autorename : true,
                  mute : false
                }),
                'Content-Type' : 'application/octet-stream',
              }, 'RNFetchBlob-'+this.state.VideoSource)
              .uploadProgress((received, total) => {
                console.log('progress ' + Math.floor(received/total*100) + '%')
                this.state.progress = Math.floor(received/total*100) + '%';
              })
              .then((res) => {
                console.log("work good");
                this.props.navigation.dispatch(EntityAction);    

              })
              .catch((err) => {
        });
    }

    render() {
    const {navigate} = this.props.navigation;    
      return (
       <View style={styles.container}>
            {   
                this.state.VideoSource === null ? 
                <View style={styles.body}>
                    <Text>Votre vidéo sera disponible sur YouTube au bout de 20 minutes et vous pourrez la voir depuis la Home page :D.</Text>
                    <Text>Utilisez des vidéos courtes moins de 20 secondes grand max ! Si vous nommez pas votre vidéo, elle sera nommé démo automatiquement. Une fois votre vidéo envoyer sur nos serveurs, vous serez rediriger vers la home page automatiquement. Un peu de patience :D.</Text>
                    <TouchableOpacity style={styles.button} onPress={this.selectVideoTapped.bind(this)}>
                        <Text style={styles.buttonTitle}>Sélectionner une vidéo</Text>
                    </TouchableOpacity> 
                </View> :
                <View style={styles.body}>
                    <Video style={{ alignSelf: 'stretch', height: 300 }} source={{uri: this.state.VideoSource}} />
                    <TextInput style = {styles.textInput}
                       placeholder = "Nom de la vidéo"
                       autoCapitalize = "none" 
                       value={this.state.VideoName}
                       onChangeText={(VideoName) => this.setState({VideoName})}/>
                    <TouchableOpacity style={styles.button} onPress={this.sendVideoToDropbox.bind(this)}>
                        <Text style={styles.buttonTitle}>Envoyer sur YouTube</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.selectVideoTapped.bind(this)}>
                        <Text style={styles.buttonTitle}>Sélectionner une vidéo</Text>
                    </TouchableOpacity>
                    <Text value={this.state.progress}></Text>
                </View>
            }
        </View>
      );
    }  
  }
