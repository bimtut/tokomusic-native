import React, { Component, Fragment } from 'react';
import {  Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage'



 class FooterComponent extends Component{
  state={
    user:{
      id:'',
    },
  }

  componentDidMount =  () => {
     AsyncStorage.getItem('id').then((value) => {
      if (value !== null) {
        value = parseInt(value);
        this.setState({user:{...this.state.user, id:value}})
      }
    });
  }

  toHome = () => {
    this.props.navigation.navigate('CategoryScreen');
  }

  toTransaction = () => {
    this.props.navigation.navigate('TransactionScreen');
  }

  toWishlist = () => {
    this.props.navigation.navigate('WishlistScreen')
  }

  toCart = () => {
    this.props.navigation.navigate('CartScreen')
  }

   render(){
    return (
      <Footer >
        {this.props.user.id  ? 
          <FooterTab style={{backgroundColor:'#F5D372'}} >
            <Button vertical onPress={this.toHome}>
              <Icon name="home" style={{color:'white'}} />
              <Text style={{color:'white'}}>Home</Text>
            </Button>
            <Button vertical onPress={this.toWishlist}>
              <Icon name="heart" style={{color:'white'}} />
              <Text style={{color:'white'}}>Wishlist</Text>
            </Button>
            <Button vertical onPress={this.toCart}>
              <Icon active name="cart" style={{color:'white'}} />
              <Text style={{color:'white'}}>Cart</Text>
            </Button>
            {/* <Button vertical onPress={this.toTransaction}>
              <Icon active name="calendar" style={{color:'white'}} />
              <Text style={{color:'white'}}>History</Text>
            </Button> */}
          </FooterTab>
            : 
            <Fragment>
              {this.state.user.id ? 
                <FooterTab style={{backgroundColor:'#F5D372'}} >
                  <Button vertical onPress={this.toHome}>
                    <Icon name="home" style={{color:'white'}} />
                    <Text style={{color:'white'}}>Home</Text>
                  </Button>
                  <Button vertical onPress={this.toWishlist}>
                    <Icon name="heart" style={{color:'white'}} />
                    <Text style={{color:'white'}}>Wishlist</Text>
                  </Button>
                  <Button vertical onPress={this.toCart}>
                    <Icon active name="cart" style={{color:'white'}} />
                    <Text style={{color:'white'}}>Cart</Text>
                  </Button>
                  {/* <Button vertical onPress={this.toTransaction}>
                    <Icon active name="calendar" style={{color:'white'}} />
                    <Text style={{color:'white'}}>History</Text>
                  </Button> */}
                </FooterTab>
              :
                <FooterTab style={{backgroundColor:'#F5D372'}} >
                  <Button vertical onPress={this.toHome}>
                    <Icon name="home" style={{color:'white'}} />
                    <Text style={{color:'white'}}>Home</Text>
                  </Button>
                  <Button vertical onPress={this.toWishlist} disabled>
                    <Icon name="heart" style={{color:'white'}} />
                    <Text style={{color:'white'}}>Wishlist</Text>
                  </Button>
                  <Button vertical onPress={this.toCart} disabled>
                    <Icon active name="cart" style={{color:'white'}} />
                    <Text style={{color:'white'}}>Cart</Text>
                  </Button>
                  {/* <Button vertical onPress={this.toTransaction} disabled>
                    <Icon active name="calendar" style={{color:'white'}} />
                    <Text style={{color:'white'}}>History</Text>
                  </Button> */}
                </FooterTab>
              }
            </Fragment>
            
        }

      </Footer>
    );
   }
    
}

function mapStateToProps(state){
  return{
      user: state.user.user,
  }
}
export default withNavigation(connect(mapStateToProps)(FooterComponent));