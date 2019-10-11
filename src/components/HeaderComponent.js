import React from 'react';
import { Image, Text } from 'react-native';
import {  Header,  Body, Right  } from 'native-base';

import LoginButton from '../Elements/LoginButton';
import ProfileButton from '../Elements/ProfileButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage'



 class HeaderComponent extends React.Component {
  state={
    user:{
      id:'',
      name:'',
      email:'',
    },
    token:''
  }

  componentDidMount =  () => {
  }
  
  toHome = () => {
    this.props.navigation.navigate('CategoryScreen');
  }
  
  render(){
    AsyncStorage.getItem('id').then((value) => {
     if (value !== null) {
       value = parseInt(value);
       this.setState({user:{...this.state.user, id:value}})
     }
   });
    return (
        <Header style={{backgroundColor:'#F5D372', alignItems:"flex-start"}} androidStatusBarColor='#F5C372'>
        
          {/* <Left/> */}
          <TouchableOpacity style={{ alignItems:"center"}} onPress={this.toHome}>
          {/* <Body style={{ alignItems:"center"}}> */}
            <Image style={{width:100, height:50, borderRadius:10}} source={require('../imgs/logo.png')}/>
          {/* </Body> */}
          </TouchableOpacity>
          <Right />
          {this.props.user.id  ? 
            
            <TouchableOpacity>
              <ProfileButton/>
            </TouchableOpacity>
            :
            <React.Fragment>
              {!this.state.user.id ? 
                <LoginButton/>  
                : 
                <TouchableOpacity>
                  <ProfileButton/>
                </TouchableOpacity>
            }
            </React.Fragment>
         
          }
        </Header>
    );
  }
}

function mapStateToProps(state){
  return{
      user: state.user.user,
      token: state.user.token,
  }
}

export default withNavigation(connect(mapStateToProps)(HeaderComponent));
// export default withNavigation(HeaderComponent);