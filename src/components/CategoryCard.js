import React, { Component } from "react";
import {Image, Dimensions} from 'react-native';
import { Card, CardItem, Text, Body } from "native-base";

const  {height, width} = Dimensions.get('window');
export default class CategoryCard extends Component {

  render(props) {
    console.warn('beha ibu ke = ',this.props.category.image)
    return (
     
          <Card style={{width:width/2-10, height:height/3, borderColor:'#F5D372', marginBottom:20, padding:0}} >
            <CardItem cardBody >
              <Text>coba ah</Text>
              <Image source={{uri:this.props.category.image}} style ={{height:height/3-30, width:width/2, flex: 1}}/>
            </CardItem>
            <CardItem footer style={{backgroundColor:'#F5D372'}}>
              <Text >{this.props.category.name}</Text>
            </CardItem>
          </Card>
    );
  }
}