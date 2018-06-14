import React, { Component } from 'react';
import { View, Alert, Image } from 'react-native';
import { BasicFormComponent } from '../BasicForm/basicForm';
import { LoadingIndicator } from '../../loadingIndicator/loadingIndicator';
import { styles } from '../BasicForm/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';

export class SignupFormComponent extends Component {

  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    if(this.props.registered) {
      Actions.reset('home');
    }
  }

  render() {
    const { signup, loading } = this.props;
    return (
      <KeyboardAwareScrollView style={styles.scrollView}>
        <View style={styles.imageBox}>
            <Image style={styles.image} source={ require('../../images/logo.png') }/>
        </View>
        <View style={styles.loginBox}>
            {loading ? <LoadingIndicator color="#ffffff"
                                         size="large"/> :
              <BasicFormComponent buttonTitle={"Je m'inscris"}
                                  onButtonPress={signup} /> }
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
