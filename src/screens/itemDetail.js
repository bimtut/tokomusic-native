import React, { Component, Fragment } from 'react';
import { Image, Alert, View, Text, TouchableOpacity, ToastAndroid, Dimensions, ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux'
import { withNavigation, SafeAreaView } from "react-navigation";
import { getItemDetails } from "../public/redux/actions/items";
import { getWishlist, addWishlist, deleteWishlist } from "../public/redux/actions/wishlist";
import { getCart, addCart } from "../public/redux/actions/cart";
import AsyncStorage from "@react-native-community/async-storage";
import { } from "../public/redux/actions/items";
import { Card, CardItem, Container, Spinner } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";

class itemDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: [], //lupa deh, ini kepake g y?
      itemDetail: '',
      itemstock: '',
      favorite: false,
      toCart: false,
      user: {
        id: '',
        level: '',
        token: ''
      },
      id: '',
      header: '',
      wishlist: '',
      cart: ''
    }
  }

  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener('willFocus', () => {
        this.isi()
      })
    ]
  }

  componentWillUnmount() {
    this.subs.forEach(sub => {
      sub.remove()
    })
  }

  isi = async () => {
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    console.warn('id barang', id)
    this.setState({
      id: id //id barang nih
    })
    await this.props.dispatch(getItemDetails(id))

    this.setState({
      itemDetail: this.props.item,
      itemstock: this.props.item.itemstock
    })
    console.warn('itemstocknya nih >> ', this.state.itemstock)
    console.warn("ASYNC NYA ADA ? ", AsyncStorage)
    await AsyncStorage.getItem('id')
      .then((e) => {
        if (e) {
          e = parseInt(e)
          this.setState({
            user: { ...this.state.user, id: e }
          })
          console.warn('ini id usernya>> ', e)
        } else {
          console.warn('di item detail ga dapet id')
        }
      })

    await AsyncStorage.getItem('userLevel')
      .then((e) => {
        if (e) {
          e = parseInt(e)
          this.setState({
            user: { ...this.state.user, level: e }
          })
          // console.warn('ini id Levelnya>> ', e)

        } else {
          console.warn('di item detail ga dapet LEVEL')
        }
      })

    await AsyncStorage.getItem('token')
      .then((e) => {
        if (e) {
          // e = parseInt(e)
          this.setState({
            user: { ...this.state.user, token: e }
          })
          console.warn('ini id Tokennya >> ', this.state.user.token)

        } else {
          console.warn('di item detail ga dapet TOKEN')
        }
      })

    const header = { 'authorization': 'Bearer ' + this.state.user.token }
    this.setState({
      header: header
    })
    // console.warn('ini headernya nihhh>> ', this.state.header)

    // wishlist============
    await this.props.dispatch(getWishlist(this.state.user.id))
    await this.setState({
      wishlist: this.props.wishlist
    })
    // console.warn('ini isi state wishlist >> ', this.props.wishlist)

    this.state.wishlist.map((item) => { //nyocokin yang id nya cocok sama barang ini dengan list di array wishlist
      console.warn('state.id>> ', this.state.id, '<< item.id>> ', item.id)
      if (this.state.id === item.id) { //yg di kiri itu id barang yg ditampil, yg di kanan itu id barang yg ada di wishlist array. kalo cocok ya kodingannya jalan
        console.warn('COCOK NIH')

        return this.setState({
          favorite: true //jadi biar wishlistnya nyala merah ye
        })
      } else {
        console.warn('KAGAK COCOK NIH')

        this.setState({
          favorite: false
        })
      }
      return null
    })


    // cart ========================
    await this.props.dispatch(getCart(this.state.user.id))
    await this.setState({
      cart: this.props.cart
    })
    console.warn('ini isi cart>> ', this.state.cart)
    this.state.cart.map((item) => {
      if (this.state.id == item.itemID) {
        console.warn('nah cart mashok nih')
        return this.setState({
          toCart: true
        })
      } else {
        console.warn('ga match ye di cart')
        this.setState({
          toCart: false
        })
      }
      return null
    })
   
  }


  // function buat wishlist nih
  toggleWishlist = async (user, item, command) => { //user=id usernya, item=item yang mau dimasukin wishlist, command=perintah add atau remove
    if (command === 'add') {
      await this.props.dispatch(addWishlist(user, item))
      await this.setState({
        wishlist: this.props.wishlist, //jadi state wishlist yang lama ditimpa props baru yang udah diupdate dari backend gitu
        favorite: true
      })
      ToastAndroid.showWithGravity(
        'Item berhasil dimasukan Wishlist',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      )
    } else if (command === 'remove') {
      await this.props.dispatch(deleteWishlist(user, item))
      await this.setState({
        wishlist: this.props.wishlist, //jadi state wishlist yang lama ditimpa props baru yang udah diupdate dari backend gitu
        favorite: false
      })
      ToastAndroid.showWithGravity(
        'Item berhasil dihapus dari Wishlist',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      )
      console.warn('ini isi cart nya >> ', this.state.cart)
    }
  }

  // function buat cart ==============
  addToCart = async (user, itemID, item, branchID, branch, price, quantity) => {
    await this.state.cart.map((cartItem) => {
      if (cartItem) {
        if (item == cartItem.item && branch == cartItem.branch) {
          this.setState({
            toCart: true
          })
        }
      }
      return null
    })

    if (this.state.toCart == false) {
      const data = {
        itemID,
        item,
        price,
        branchID,
        branch,
        quantity
      }

      await this.props.dispatch(addCart(user, data))
      await this.setState({
        cart: this.props.cart,
        toCart: true
      })

      ToastAndroid.showWithGravity(
        'Item has been added to cart.',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      ToastAndroid.showWithGravity(
        'Item is already in cart',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );

    }
  }

  render() {
    const { height, width } = Dimensions.get('window');
    const WIDTH = Dimensions.get('window').width

    if (this.props.itemDetailsLoading) {
      return (
        <Fragment>
          <Spinner color='#47b5be' style={{ marginTop: '50%' }} />
        </Fragment>
      )
    } else {
      return (
        <SafeAreaView style={{ flex: 1 }}>

          <View style={{ height: 45, backgroundColor: '#47b5be', flexDirection: 'row', }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.toggleDrawer()}
              style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: 7 }}
            >
              <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#007ba4', borderRadius: 50, height: 34, width: 34, }}>
                <Icon name='ios-menu' size={30} color='#f2f2f2'></Icon>

              </View>
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', paddingRight: 31 }}>
                <Text
                  text10
                  style={{ fontSize: 22, fontWeight: '100', marginTop: 8, marginRight: 5, color: '#f2f2f2' }}
                >
                  Toko
              </Text>
                <Text
                  text10
                  style={{ fontSize: 22, fontWeight: 'bold', marginTop: 8, color: '#f2f2f2' }}
                >
                  Musik
              </Text>
              </View>

            </View>

          </View>
          <View style={{ backgroundColor: '#007ba4', width: '100%', height: 3 }}></View>
          <ScrollView >

            <View style={{ flexDirection: 'row', width: WIDTH * 0.90, margin: 10, alignItems: 'center', alignSelf: "center", }}>
              <View style={{
                borderRadius: 5,
                borderWidth: 1,
                width: WIDTH * 0.9,
                height: 110,
                alignSelf: 'flex-start',
                // margin: 10,
                flexDirection: 'row',
                backgroundColor: '#cccccc',
                borderColor: '#47b5be'
              }}>
                <View style={{ height: 108, width: 110, borderRadius: 5 }}>
                  <Image
                    style={{ height: '100%', borderRadius: 5, backgroundColor: '#47b5be' }}
                    source={{ uri: `${this.state.itemDetail.image}` }} />
                </View>
                <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#cccccc', borderRadius: 5 }}>
                  <Text style={{ justifyContent: 'center', alignContent: 'center', textAlign: 'left', paddingLeft: 8, fontWeight: 'bold', color: '#2f2260', fontSize: 15 }}>{this.state.itemDetail.name}</Text>
                  

                </View>
              </View>

            </View>
            <TouchableOpacity>
              {this.state.favorite ?
                <TouchableOpacity onPress={() => this.toggleWishlist(this.state.user.id, this.state.id, 'remove')}>
                  <View style={{ backgroundColor: '#47b5be', height: 52, width: WIDTH * 0.90, alignSelf: 'center', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name='ios-heart' size={33} color='#01627c'></Icon>
                  </View>
                </TouchableOpacity> :
                <TouchableOpacity onPress={() => this.toggleWishlist(this.state.user.id, this.state.id, 'add')}>
                  <View style={{ backgroundColor: '#cccccc', height: 52, width: WIDTH * 0.90, alignSelf: 'center', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name='ios-heart' size={33} color='#f2f2f2'></Icon>
                  </View>
                </TouchableOpacity>}

            </TouchableOpacity>
            {/* detil======================== */}
            <View style={{
              borderRadius: 5,
              borderWidth: 1,
              width: WIDTH * 0.90,
              // height: 110,
              alignSelf: 'center',
              margin: 10,
              flexDirection: 'column',
              backgroundColor: '#cccccc',
              borderColor: '#47b5be',
              padding: 5
            }}>
              <Text style={{ justifyContent: 'center', alignContent: 'center', textAlign: 'left', paddingLeft: 8, fontWeight: 'bold', color: '#2f2260', fontSize: 17, marginBottom: 6 }}>Deskripsi</Text>
              <Text style={{ justifyContent: 'center', alignContent: 'center', textAlign: 'left', paddingLeft: 8, color: '#2f2260', fontSize: 15 }}>{this.state.itemDetail.description}</Text>
            </View>
            {/* ====================== */}
            {/* available at (branch) */}
            <View style={{ marginHorizontal: 20 }}>

              <Text style={{ color: '#2f2260', fontWeight: 'bold', fontSize: 17 }}>Available at</Text>
              {this.state.itemstock ?
                <View style={{ flex: 1 }}>
                  <FlatList
                    horizontal={true}
                    data={this.state.itemstock}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity onPress={() => { this.addToCart(this.state.user.id, this.state.id, this.state.itemDetail.name, item.branchID, item.branch, item.price, 1) }}>
                        <View style={{ backgroundColor: '#cccccc', width: 130, height: 130, marginRight: 5, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 6, marginBottom: 10 }}>
                          <Text style={{ color: '#2f2260', fontWeight: 'bold', fontSize: 15 }}>{item.branch}</Text>
                          <Text style={{ color: '#2f2260', fontSize: 13 }}>{item.quantity} unit(s)</Text>
                          <Text style={{ color: '#2f2260', fontSize: 13 }}>@ Rp {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                          <Icon name='ios-basket' size={30} color='#47b5be' style={{ marginTop: 8 }}></Icon>
                          <Text style={{ color: '#2f2260', fontSize: 13 }}>Add to cart</Text>
                        </View>

                      </TouchableOpacity>
                    )
                    }

                  />
                </View> :
                null
              }


            </View>

          </ScrollView>
          <View style={{ backgroundColor: '#01627c', width: '100%', height: 12 }}></View>

        </SafeAreaView>
      );
    }
  }

}

const mapStateToProps = (state) => {
  return {
    itemDetailsLoading: state.items.isLoading,
    item: state.items.itemDetails,
    wishlist: state.wishlist.wishlist,
    cart: state.cart.cart,
    user: state.user.user
  }
}

export default connect(mapStateToProps)(itemDetail)
