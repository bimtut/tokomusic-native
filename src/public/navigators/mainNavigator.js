
import {
  createAppContainer,
} from 'react-navigation'


import { createDrawerNavigator } from 'react-navigation-drawer'
import createStackNavigator from 'react-navigation-stack'
import Drawer from '../../components/drawer'
import Home from '../../screens/homepage'
import Cart from '../../screens/cart'
import Checkout from '../../screens/checkout'
import History from '../../screens/history'
import ItemDetail from '../../screens/itemDetail'
import Login from '../../screens/login'
import Wishlist from '../../screens/wishlist'
import Register from '../../screens/register'
import itemsByCategory from '../../screens/itemsByCategory'
import itemDetail from "../../screens/itemDetail";

// import Note from '../screens/Note'
import {Dimensions} from 'react-native'
const WIDTH = Dimensions.get('screen').width;
const HEIGHT= Dimensions.get('screen').height;

const AppNavigator = createDrawerNavigator({
  Home: Home,
  itemsByCategory: itemsByCategory,
  ItemDetail: ItemDetail,
  Cart: Cart,
  Checkout: Checkout,
  History: History,
  Login: Login,
  Wishlist: Wishlist,
  Register: Register,
  // itemDetail: itemDetail

}, {
  headerMode: 'none',
  contentComponent: Drawer,
  drawerWidth: WIDTH*0.70
})

export default createAppContainer(AppNavigator)