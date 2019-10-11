import React, { Component, Fragment } from 'react'
import {
    Image,
    Text,
    View,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    // SafeAreaView
    ScrollView,
    Dimensions,
    FlatList

} from 'react-native'
import { getWishlist, deleteWishlist } from "../public/redux/actions/wishlist";
//masukin get dan delete wishlist
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from "react-redux";
import { SafeAreaView } from 'react-navigation';
import { Card, CardItem, Body, Left, Right, Spinner } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";


class Wishlist extends Component {
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
            wishlist: ''
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
                } else {
                    console.warn('gak dapet id nya di cart screen cuy')
                }
            })

        await this.props.dispatch(getWishlist(this.state.user.id))
        await this.setState({
            wishlist: this.props.wishlist
        })
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

    toItemDetail = (id) => {
        console.log('ini id barang dari category page >> ', id)
        this.props.navigation.navigate('ItemDetail', { id: id });
    }

    render() {
        const WIDTH = Dimensions.get('window').width

        const { height, width } = Dimensions.get('window');
        if (this.props.wishlistLoading) {
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
                            {/* <Text >ini home ya</Text> */}
                            <View style={{ flexDirection: 'row', paddingRight: 31 }}>

                                <Text
                                    text10
                                    style={{ fontSize: 22, fontWeight: 'bold', marginTop: 8, color: '#f2f2f2' }}
                                >
                                    Wishlist
                                    </Text>
                            </View>

                        </View>

                    </View>
                    <View style={{ backgroundColor: '#007ba4', width: '100%', height: 3 }}></View>

                    {/* <Text style={{ textAlign: "center", fontSize: 30, fontWeight: "900" }}>Wishlist</Text> */}
                    {this.state.wishlist.length > 0 ?
                        <View style={{ flex: 1, marginTop: 10 }}>
                            <FlatList
                                // containerStyle={styles.MainContainer}
                                contentContainerStyle={{ alignItems: 'center' }}
                                data={this.state.wishlist}
                                renderItem={({ item, index }) =>
                                    <TouchableOpacity onPress={() => { this.toItemDetail(item.id) }}>
                                        <View style={{
                                            borderRadius: 10,
                                            borderWidth: 1,
                                            width: WIDTH * 0.85,
                                            height: 110,
                                            alignSelf: 'flex-start',
                                            margin: 10,
                                            flexDirection: 'row',
                                            backgroundColor: '#cccccc',
                                            borderColor: '#47b5be'
                                        }}>
                                            <View style={{ height: 108, width: 110, borderRadius: 10 }}>
                                                <Image
                                                    style={{ height: '100%', borderRadius: 10, backgroundColor: '#47b5be' }}
                                                    source={{ uri: `${item.image}` }} />
                                            </View>
                                            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#cccccc', borderRadius: 10 }}>
                                                <Text style={{ justifyContent: 'center', alignContent: 'center', textAlign: 'left', paddingLeft: 8, fontWeight: 'bold', color: '#2f2260', fontSize: 15 }}>{item.name.slice(0, 26)}</Text>
                                                <Text style={{ justifyContent: 'center', alignContent: 'center', textAlign: 'left', paddingLeft: 8, color: '#2f2260', fontSize: 15 }}>{item.name.slice(26)}</Text>

                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                }
                                numColumns={1}
                            />
                        </View>
                        :
                        <View style={{ flex: 1, paddingTop: "50%", alignItems: "center" }}>
                            <Text style={{ fontSize: 21, color: '#007ba4' }}>No item(s) in your Wishlist</Text>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Home')}>
                                <Text style={{ fontSize: 24, color: '#47b5be', marginTop: 12 }}>Tap here to Shop now!</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    <View style={{ backgroundColor: '#01627c', width: '100%', height: 12 }}></View>

                </SafeAreaView>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        wishlistLoading: state.wishlist.isLoading,

        wishlist: state.wishlist.wishlist
    }
}
export default connect(mapStateToProps)(Wishlist)