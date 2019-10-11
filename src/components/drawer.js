
import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
  SafeAreaView,
  ScrollView,
  Dimensions,
  ToastAndroid
} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-community/async-storage";


const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;


class Drawer extends Component {
  
  render() {
    // const { categories } = this.state
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 200, backgroundColor: '#01627c', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
          <View style={{ height: 130, width: 130, borderRadius: 60, backgroundColor: '#cccccc', alignItems: 'center', justifyContent: 'center' }}>

            <Image source={require('../assets/robot.png')} style={{ height: 100, width: 100, }} />

          </View>
          <Text style={{ marginTop: 6, color: '#f2f2f2' }}>Isi nama dulu lah hey</Text>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>

            <View style={{ backgroundColor: '#cccccc', height: 40, flexDirection: 'row', marginBottom: 10 }}>
              <View style={{ width: 7, backgroundColor: "#ffc909" }} />
              <View style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="ios-home" size={30} color="#47b5be"></Icon>
              </View>
              <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
                <Text style={{ fontSize: 17, fontWeight: "800", color: '#2f2260' }}>
                  Home
                </Text>
              </View>

            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('History')}>
            <View style={{ backgroundColor: '#cccccc', height: 40, flexDirection: 'row', marginBottom: 10 }}>
              <View style={{ width: 7, backgroundColor: "#ffc909" }} />
              <View style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="ios-cart" size={30} color="#47b5be"></Icon>
              </View>
              <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
                <Text style={{ fontSize: 17, fontWeight: "800", color: '#2f2260' }}>
                  Transactions
                </Text>
              </View>

            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Cart')}>
            <View style={{ backgroundColor: '#cccccc', height: 40, flexDirection: 'row', marginBottom: 10 }}>
              <View style={{ width: 7, backgroundColor: "#ffc909" }} />
              <View style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="ios-basket" size={30} color="#47b5be"></Icon>
              </View>
              <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
                <Text style={{ fontSize: 17, fontWeight: "800", color: '#2f2260' }}>
                  Cart
                </Text>
              </View>

            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Wishlist')}>
            <View style={{ backgroundColor: '#cccccc', height: 40, flexDirection: 'row', marginBottom: 10 }}>
              <View style={{ width: 7, backgroundColor: "#ffc909" }} />
              <View style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="ios-heart" size={30} color="#47b5be"></Icon>
              </View>
              <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
                <Text style={{ fontSize: 17, fontWeight: "800", color: '#2f2260' }}>
                  Wishlist
                </Text>
              </View>

            </View>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>

            <View style={{ backgroundColor: '#cccccc', height: 40, flexDirection: 'row', marginBottom: 10 }}>
              <View style={{ width: 7, backgroundColor: "#ffc909" }} />
              <View style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="ios-log-in" size={30} color="#47b5be"></Icon>
              </View>
              <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
                <Text style={{ fontSize: 17, fontWeight: "800", color: '#2f2260' }}>
                  Login
                </Text>
              </View>

            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
            <View style={{ backgroundColor: '#cccccc', height: 40, flexDirection: 'row', marginBottom: 10 }}>
              <View style={{ width: 7, backgroundColor: "#ffc909" }} />
              <View style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="ios-person" size={30} color="#47b5be"></Icon>
              </View>
              <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
                <Text style={{ fontSize: 17, fontWeight: "800", color: '#2f2260' }}>
                  Register
                </Text>
              </View>

            </View>

          </TouchableOpacity>

        </View>
        <TouchableOpacity onPress={()=> this.logout()}>
          <View style={{ backgroundColor: '#46b5be', height: 40, flexDirection: 'row', marginBottom: 10 }}>
            {/* <Text>LOG OUT</Text> */}
            <View style={{ width: 7, backgroundColor: "#01627c" }} />
            <View style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="ios-power" size={30} color="#f2f2f2"></Icon>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
              <Text style={{ fontSize: 17, fontWeight: "800", color: '#f2f2f2' }}>
                Log Out
                </Text>
            </View>

          </View>

        </TouchableOpacity>

      </View>
    )
  }
}


export default Drawer








