

import React, { Fragment } from 'react';
import { ScrollView, View, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { Spinner, Card, CardItem, Text, Body, Left, Right } from "native-base";
// import HeaderComponent  from '../components/HeaderComponent';
// import FooterComponent from '../components/FooterComponent';
import AsyncStorage from '@react-native-community/async-storage'
import { getUserTransactions } from '../public/redux/actions/transactions';
import { connect } from 'react-redux';
import Icon from "react-native-vector-icons/Ionicons";


// import ItemCard from '../Components/ItemCard';



class TransactionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userTransactions: [],
            user: {
                id: '',
            },
            token: '',
            header: '',
            total: 0,

            receipt: false
        }
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

    isinye = async () => {


        await AsyncStorage.getItem('id').then((value) => {
            console.warn('id user adalah>> ', value)
            if (value) {
                value = parseInt(value);
                this.setState({ user: { ...this.state.user, id: value } })
            }
            console.warn('state id user >>', this.state.user.id)
        });

        await this.props.dispatch(getUserTransactions(this.state.user.id));
        await this.setState({
            userTransactions: this.props.userTransactions
        })

    }
    render() {
        const { height, width } = Dimensions.get('window');
        const WIDTH = Dimensions.get('window').width

        if (this.props.userTransactionsLoading) {
            return (
                <Fragment>
                    <Spinner color='#47b5be' style={{ marginTop: '50%' }} />
                </Fragment>
            )
        } else {

            return (
                <Fragment>
                    {/* <HeaderComponent /> */}
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
                            <View style={{ flexDirection: 'row', paddingRight: 42 }}>
                                <Text
                                    text10
                                    style={{ fontSize: 22, fontWeight: '100', marginTop: 8, marginRight: 5, color: '#f2f2f2' }}
                                >
                                    Transaction
                                    </Text>
                                <Text
                                    text10
                                    style={{ fontSize: 22, fontWeight: 'bold', marginTop: 8, color: '#f2f2f2' }}
                                >
                                    History
                                    </Text>
                            </View>

                        </View>

                    </View>
                    <View style={{ backgroundColor: '#007ba4', width: '100%', height: 3 }}></View>
                    {/* {this.state.userTransactions ?
                        <View>
                            <FlatList 
                                contentContainerStyle={{ alignItems: 'center' }}
                                data={this.state.userTransactions}
                                renderItem={({item, index}) =>(
                                    const telo = hdkahd
                                    <View>

                                    </View>
                                )}
                            />
                        </View>
                        :
                        <View>

                        </View>
                    } */}
                    <React.Fragment>
                        <ScrollView style={{ flex: 1, }}>
                            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: WIDTH * 0.9, alignSelf: 'center', marginTop: 5 }}>


                                {this.state.userTransactions.map((transaction, index) => {
                                    console.warn('index ke ', index, 'transaction itemnya ini>> ', transaction)
                                    console.warn('ini transakction date indeh>>', index, '<<  ', transaction.date)
                                    const input = transaction
                                    const tanggal = input.date
                                    const tanggalPotong = tanggal.toString().slice(0, 10)
                                    return (

                                        <View key={index} style={{ flexDirection: 'column', width: WIDTH * 0.9, }}>
                                            <View style={{ backgroundColor: '#01627c', borderTopEndRadius: 5, borderTopStartRadius: 5, flexDirection: "row", height: 45, paddingLeft: 12, alignItems: 'center' }}>
                                                <Text style={{ color: '#f2f2f2' }}>Transaction Date : </Text>
                                                <Text style={{ color: '#f2f2f2', fontWeight: 'bold' }}>{tanggalPotong}</Text>

                                            </View>

                                            {transaction.transactionitems.map((item, index) => {
                                                return (

                                                    <View key={index} style={{ backgroundColor: '#cccccc', width: WIDTH * 0.9 }}>
                                                        <View style={{ width: WIDTH * 0.9, height: height / 6, borderColor: '#F5D372', borderColor: '#007ba4', borderBottomWidth: 2, borderWidth: 0, alignItems: 'flex-start', paddingHorizontal: 12, paddingVertical: 5 }} >
                                                            <Text style={{ fontWeight: 'bold', color: '#2f2260' }}>{item.itemName}</Text>
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <View style={{ flexDirection: 'row', flex: 8 }}>
                                                                    <Text style={{ color: '#2f2260' }}>Location : </Text>
                                                                    <Text style={{ fontWeight: 'bold', color: '#2f2260' }}>{item.branch}</Text>
                                                                </View>
                                                                <View style={{ flex: 1 }}></View>
                                                                <Text style={{ alignSelf: 'flex-end', color: '#2f2260' }}>x {item.quantity}</Text>
                                                            </View>
                                                            <Text style={{alignSelf:'flex-end', color: '#2f2260'}}>Rp {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                                                            <View style={{ borderWidth: 0, borderBottomWidth: 1, borderColor: '#007ba4', width: WIDTH * 0.84, alignSelf: 'center' }}></View>
                                                            <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                                                                <Text style={{color:'#2f2260'}}>subtotal : Rp {(item.price * item.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>

                                                            </View>
                                                            {/* <View style={{ flex: 10, flexDirection:'row' }}>
                                                                <Body style={{ flex: 8, marginLeft: 0, padding: 0, flexDirection: "column" }}>
                                                                    <View style={{ paddingBottom: 0, paddingTop: 0 }}>
                                                                        <Text>{item.itemName}</Text>
                                                                    </View>

                                                                    <Fragment>
                                                                        <View style={{ paddingBottom: 0, paddingTop: 0 }}>
                                                                            <Text>({item.branch})</Text>
                                                                        </View>

                                                                        <View style={{ paddingBottom: 0, paddingTop: 0 }}>
                                                                            <Text>Rp. {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                                                                        </View>

                                                                        <View style={{ paddingBottom: 0, paddingTop: 0 }}>
                                                                            <Text>Subtotal : Rp. {(item.price * item.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                                                                        </View>
                                                                    </Fragment>
                                                                </Body>

                                                                <Right style={{ flex: 2, flexWrap: "nowrap" }}>
                                                                    <Body>
                                                                        <Fragment>
                                                                            <Text style={{ paddingBottom: 0, paddingTop: 0, flexWrap: "nowrap" }}>{item.quantity}</Text>
                                                                        </Fragment>
                                                                    </Body>
                                                                </Right>
                                                            </View> */}
                                                        </View>
                                                    </View>
                                                )
                                            })}
                                            <View style={{flexDirection:'row', backgroundColor:'#47b5be', borderBottomEndRadius:5, borderBottomStartRadius:5, marginBottom:10, paddingHorizontal:10, height:38}}>
                                                <Left>
                                                    <Text style={{color:'#f2f2f2', fontWeight:'bold', fontSize:17}}>Total:</Text>
                                                </Left>
                                                <Right>
                                                    <Text style={{color:'#f2f2f2', fontWeight:'bold', fontSize:17}}>Rp.{Object.values(transaction.transactionitems).reduce((total, { price, quantity }) => total + price * quantity, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                                                </Right>
                                            </View>

                                        </View>
                                    )

                                })}

                            </View>
                        </ScrollView>
                    </React.Fragment>
                    <View style={{ backgroundColor: '#01627c', width: '100%', height: 12 }}></View>

                </Fragment >
            );
        }
    }

};


function mapStateToProps(state) {
    return {
        userTransactionsLoading: state.transactions.isLoading,
        userTransactions: state.transactions.userTransactions,
    }
}

export default connect(mapStateToProps)(TransactionScreen);