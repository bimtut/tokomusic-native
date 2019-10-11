

import React, {Fragment} from 'react';
import { View, Text, Image, Dimensions} from 'react-native';
import {  Card, CardItem, Body, Icon, Left, Right } from "native-base";
// import HeaderComponent  from '../Components/HeaderComponent';
// import FooterComponent from '../Components/FooterComponent';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage'
import { withNavigation } from 'react-navigation';
import LogoutButton from '../Elements/LogoutButton';
// import { tsExpressionWithTypeArguments } from '@babel/types';

class ProfileScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user:{
        id:'',
        name:'',
        email:'',
      },  
      token:'',
      header:'',
    }
  }

  componentDidMount = async () => {
    await AsyncStorage.getItem('id').then((value) => {
      if (value !== null) {
        value = parseInt(value);
        this.setState({user:{...this.state.user, id:value}})
      }
    });

    await AsyncStorage.getItem('userName').then((value) => {
      if (value !== null) {
        this.setState({user:{...this.state.user, name:value}})
      }
    });

    await AsyncStorage.getItem('userEmail').then((value) => {
      if (value !== null) {
        this.setState({user:{...this.state.user, email:value}})
      }
    });
  }

  toTransaction = () => {
    this.props.navigation.navigate('TransactionScreen');
  }

  render(){
    const  {height, width} = Dimensions.get('window');
    
    return (
        <Fragment>
            <HeaderComponent/>
              <Image source={{uri:'https://www.searchpng.com/wp-content/uploads/2019/02/Deafult-Profile-Pitcher.png'}} style ={{width:width, height:height/3.5,marginLeft:0, paddingLeft:0,  resizeMode:"contain"}}/>

              <View style={{paddingLeft:"10%", paddingTop:"10%", marginBottom:"auto"}}>
                <Text style={{fontSize:23, textAlign:'center', marginLeft:"-10%", paddingBottom:10}}>User Profile</Text>
                {console.log(this.state.user)                }
                {(this.state.user.id) ? 
                  <Fragment>
                    <View style={{paddingBottom:"10%", paddingTop:"10%"}}>
                      <Text style={{fontSize:20, paddingBottom:10}}>Name : {this.state.user.name}</Text>
                      <Text style={{fontSize:20, paddingBottom:10}}>Email : {this.state.user.email}</Text>
                    </View>
                            
                    <TouchableOpacity style={{borderColor:'white', borderWidth:1, width:200,height:40 ,borderRadius:10, alignSelf:"center", marginLeft:"-10%", marginBottom:"5%",backgroundColor:'orange'}} onPress={this.toTransaction}>
                      <View >
                        <Text style={{fontSize:20, textAlign:"center",  textAlignVertical:"center",  color:'white'}}>Transaction History</Text>
                      </View>
                    </TouchableOpacity>

                    <View>
                      <LogoutButton/>
                    </View>
                  </Fragment>
                :
                  <Text style={{fontSize:20, textAlign:'center', marginLeft:"-10%", marginTop:'20%'}} >You have to log in first</Text>
                }
                
               
              </View>
            <FooterComponent/>
        </Fragment>
    );
  }
  
};


function mapStateToProps(state){
  return{
      user: state.cart.user
  }
}

export default connect(mapStateToProps)(ProfileScreen);