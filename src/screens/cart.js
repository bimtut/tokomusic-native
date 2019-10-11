import React, { Component, Fragment } from 'react'
import {
    Image,
    Text,
    View,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    ToastAndroid,
    FlatList

} from 'react-native'
// masukin get dan delete wishlist
// import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from "react-redux";
import { SafeAreaView } from 'react-navigation';
import { Spinner } from "native-base";
import { getCart, addCart, editCart, deleteCart, clearCart } from "../public/redux/actions/cart";
import { newTransaction } from "../public/redux/actions/transactions";
import Icon from "react-native-vector-icons/Ionicons";



class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                id: '',
                name: '',
                email: ''
            },
            token: '',
            header: '', //matiin dulu. buat auth nih
            cart: '',
            receipt: false
        }
    }

    isinye = async () => {
        await AsyncStorage.getItem('id')
            .then((e) => {
                if (e) {
                    e = parseInt(e)
                    this.setState({
                        user: { ...this.state.user, id: e }
                    })
                    console.warn('dapet id nya ya ', this.state.user.id)
                } else {
                    console.warn('gak dapet id nya di cart screen cuy')
                }
            })

        await this.props.dispatch(getCart(this.state.user.id)) //nanti masukin max quantity juga ya
        await this.setState({
            cart: this.props.cart
        })
        console.warn('ini isi cartnya>>>', this.state.cart)

    }

    componentDidMount() {
        this.subs = [
            this.props.navigation.addListener('willFocus', () => {
                this.isinye()
            })
        ]
    }

    componentWillUnmount() {
        this.subs.forEach(sub => {
            sub.remove()
        })
    }

    // toItemDetail = (id) => {
    //     console.log('ini id barang dari category page >> ', id)
    //     this.props.navigation.navigate('ItemDetail', { id: id });
    // }

    increment = async (userid, item, branch, quantity) => {
        const data = {
            item,
            branch,
            quantity
        }
        console.warn('userid>>', userid, ', item>>', item, ', branch>>', branch, ' quantity>>', quantity)
        await this.props.dispatch(editCart(userid, data))
        await this.setState({
            cart: this.props.cart
        })
    }

    decrement = async (userid, item, branch, quantity) => {
        const data = {
            item,
            branch,
            quantity
        }
        console.warn('userid>>', userid, ', item>>', item, ', branch>>', branch, ' quantity>>', quantity)

        if (quantity > 0) {
            await this.props.dispatch(editCart(userid, data))
            await this.setState({
                cart: this.props.cart
            })
        } else {
            await this.props.dispatch(deleteCart(userid, item, branch))
            await this.setState({
                cart: this.props.cart
            })
        }
    }

    handleCheckout = async () => {
        const temp = [];
        this.state.cart.map((cartItem) => {
            temp.push({
                item: cartItem.itemID, //cek semua apa nama2 ini betul2 ada
                branch: cartItem.branchID,
                quantity: cartItem.quantity,
                price: (cartItem.price * cartItem.quantity),
                itemName: cartItem.item,
                location: cartItem.branch
            })
            return null
        })
        const data = {
            transactionitems: [...temp]
        }
        console.warn('ini isi data yang mau dipush ke add item', data)
        await this.props.dispatch(newTransaction(this.state.user.id, data))
        ToastAndroid.showWithGravity(
            'Transaksi sukses dan sudah masuk history',
            ToastAndroid.LONG,
            ToastAndroid.CENTER
        )
        console.warn('new transaction berhasil')
        await this.setState({
            receipt: true //buat apa nih
        })

        await this.props.dispatch(clearCart(this.state.user.id))
        this.setState({
            total: 0
        })

    }

    total = () => {
        let tot = 0;
        this.props.cart.map(item => { // eslint-disable-line
            tot += (item.quantity * item.price)
        })

        return tot;
    }
    render() {
        const { height, width } = Dimensions.get('window');
        const WIDTH = Dimensions.get('window').width

        if (this.props.cartLoading) {
            return (
                <Fragment>
                    <Spinner color='#47b5be' style={{ marginTop: '50%' }} />
                </Fragment>
            )
        } else {
            return (
                //masukan spinner aja gasih?
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
                            {/* <Text >ini home ya</Text> */}
                            <View style={{ flexDirection: 'row', paddingRight: 31 }}>

                                <Text
                                    text10
                                    style={{ fontSize: 22, fontWeight: 'bold', marginTop: 8, color: '#f2f2f2' }}
                                >
                                    Cart
                                    </Text>
                            </View>

                        </View>

                    </View>
                    <View style={{ backgroundColor: '#007ba4', width: '100%', height: 3 }}></View>
                    {this.props.cart.length ?
                        <View style={{ flex: 1, marginTop: 10 }}>
                            <FlatList
                                contentContainerStyle={{ alignItems: 'center' }}
                                data={this.props.cart}
                                renderItem={({ item, index }) =>
                                    <View style={{
                                        borderRadius: 10,
                                        borderWidth: 1,
                                        width: WIDTH * 0.90,
                                        height: 140,
                                        alignSelf: 'flex-start',
                                        margin: 10,
                                        flexDirection: 'row',
                                        backgroundColor: '#cccccc',
                                        borderColor: '#47b5be'
                                    }}
                                        key={index}>
                                        <View style={{ height: 108, width: 110, borderRadius: 10 }}>
                                            <Image
                                                style={{ height: '100%', borderRadius: 10, backgroundColor: '#47b5be' }}
                                                source={{ uri: `${item.image}` }} />
                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#cccccc', borderRadius: 10 }}>
                                            <Text style={{ justifyContent: 'center', alignContent: 'center', textAlign: 'left', paddingLeft: 8, fontWeight: 'bold', color: '#2f2260', fontSize: 15 }}>{item.item.slice(0, 26)}</Text>
                                            <Text style={{ justifyContent: 'center', alignContent: 'center', textAlign: 'left', paddingLeft: 8, color: '#2f2260', fontSize: 15 }}>{item.item.slice(26)}</Text>
                                            <Text style={{ justifyContent: 'center', alignContent: 'center', textAlign: 'left', paddingLeft: 8, color: '#2f2260', fontSize: 15 }}>Rp {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ justifyContent: 'center', alignContent: 'center', textAlign: 'left', paddingLeft: 8, color: '#2f2260', fontSize: 15 }}>Store location : </Text>
                                                <Text style={{ justifyContent: 'center', alignContent: 'center', textAlign: 'left', color: '#2f2260', fontSize: 15 }}>{item.branch}</Text>
                                            </View>
                                            <Text style={{ justifyContent: 'center', alignContent: 'center', textAlign: 'left', paddingLeft: 8, color: '#2f2260', fontSize: 15, fontWeight:'bold' }}>Subtotal : Rp. {(item.price * item.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                                            <View style={{ flexDirection: 'row', alignContent: 'flex-end', alignSelf: 'flex-end', paddingRight: 8 }}>
                                                <Icon name='ios-remove-circle' size={28} onPress={() => { this.decrement(this.state.user.id, item.itemID, item.branchID, item.quantity -= 1) }} color='#2f2260'></Icon>
                                                <View style={{ width: 40, borderBottomColor: '#2f2260', borderLeftColor: 'transparent', borderWidth: 1, borderTopColor: 'transparent', borderRightColor: 'transparent', alignItems: "center" }}>
                                                    <Text style={{color:'#2f2260', fontSize:16, fontWeight:'bold'}} >{item.quantity}</Text>
                                                </View>
                                                <Icon name='ios-add-circle' size={28} onPress={() => { this.increment(this.state.user.id, item.itemID, item.branchID, item.quantity += 1) }} color='#2f2260'></Icon>

                                            </View>
                                        </View>
                                    </View>
                                    // </TouchableOpacity>
                                }
                                numColumns={1}
                            />
                            <View style={{ backgroundColor: '#01627c', width: '100%', height: 3 }}></View>
                        </View>

                        :
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1, paddingTop: "50%", alignItems: "center" }}>
                                <Text style={{ fontSize: 21, color: '#007ba4' }}>No item(s) in your Cart</Text>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('Home')}>
                                    <Text style={{ fontSize: 24, color: '#47b5be', marginTop: 12 }}>Tap here to Shop now!</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ backgroundColor: '#01627c', width: '100%', height: 3 }}></View>

                        </View>

                    }

                    {this.props.cart.length ?
                        <View>
                            <View style={{ width: WIDTH * 0.9, alignSelf: 'center', flexDirection: 'row', height: 33, marginTop: 5 }}>
                                <Text style={{ fontSize: 20, color: '#007ba4' }}>Total : </Text>
                                <Text style={{ fontSize: 20, fontWeight: "bold", color: '#007ba4' }}>Rp. {this.total().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                            </View>
                            <TouchableOpacity>
                                <Text style={{ color: 'white', backgroundColor: '#007ba4', textAlign: "center", textAlignVertical: "center", height: 55, fontSize: 22, fontWeight: "bold" }} onPress={() => this.handleCheckout()}  >Checkout</Text>
                            </TouchableOpacity>
                        </View>
                        : null}
                </SafeAreaView>

            )
        }
    }
}

function mapStateToProps(state) {
    return {
        cartLoading: state.cart.isLoading,

        cart: state.cart.cart
    }
}
export default connect(mapStateToProps)(Cart)