import React, { Component, Fragment } from 'react'
import {
    Image,
    Text,
    View,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    // AsyncStorage,
    ScrollView,
    Button,
    ToastAndroid
} from 'react-native'
import { withNavigation } from 'react-navigation';
import { Container, Spinner, Input } from 'native-base';

import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux';
import { login } from "../public/redux/actions/user";
import Icon from "react-native-vector-icons/Ionicons";





class LoginScreen extends Component {
    state = {
        email: '',
        password: '',

        user: {
            id: '',
            name: '',
            email: '',
            level: ''
        },
        token: ''
    }

    changeValue = (name, value) => {
        this.setState(() => ({ [name]: value }));
    }

    loginUser = async () => {
        console.warn('udah diklik loh ye')
        const data = ({
            email: this.state.email,
            password: this.state.password
        })
        if (this.state.email && this.state.password) {
            await this.props.dispatch(login(data))
            console.warn('isbjkdh', this.props.user)
            console.warn('userloading', this.props.userLoading)

            if (this.props.userLoading) {
                return (
                    <Fragment>
                        <Spinner color='orange' style={{ marginTop: '50%' }} />
                    </Fragment>
                )
            } else {
                if (this.props.user) {
                    console.warn('user level nih >> ', this.props.user.level)
                    AsyncStorage.setItem('userName', this.props.user.name)
                    AsyncStorage.setItem('id', this.props.user.id.toString()) //lah id bukannya harusnya angka ya?
                    AsyncStorage.setItem('userEmail', this.props.user.email)
                    AsyncStorage.setItem('userLevel', this.props.user.level.toString())
                    // console.warn('ini tokennya nih  ', this.props.token)
                    AsyncStorage.setItem('token', this.props.token) //dapet tokennya gimana cara kalo leh tau

                    //kenapa 2 langkah gini, bisa cut jadi selangkah aja ha sih aslinya?
                    await AsyncStorage.getItem('userName')
                        .then((e) => {
                            if (e) {
                                // e = parseInt(e)
                                this.setState({
                                    user: { ...this.state.user, name: e }
                                })
                            } else {
                                console.warn('ga dapet name cuy')
                            }
                        })

                    await AsyncStorage.getItem('id')
                        .then((e) => {
                            if (e) {
                                e = parseInt(e)
                                this.setState({
                                    user: { ...this.state.user, id: e }
                                })
                            } else {
                                console.warn('ga dapet ID cuy')
                            }
                        })

                    await AsyncStorage.getItem('token')
                        .then((e) => {
                            if (e) {
                                // e = parseInt(e)
                                this.setState({
                                    token: e
                                })
                            } else {
                                console.warn('ga dapet TOKEN cuy')
                            }
                        })

                    ToastAndroid.showWithGravity(
                        'Log in success.\nWelcome ' + this.state.user.name,
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                    );
                    setTimeout(() => {
                        this.props.navigation.navigate('Home');
                    }, 800);
                } else {
                    alert('Wrong email or password')
                }
            }


        } else {
            ToastAndroid.showWithGravity(
                'Email and password can\'t be empty',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
            );
        }
    }

    render() {
        // const { firstQuery } = this.state

        return (
            <SafeAreaView>
                <ScrollView>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: '#47b3be',
                            paddingHorizontal: 16,
                            paddingVertical: 8
                        }}
                    >
                        <StatusBar backgroundColor='white' barStyle='dark-content' />
                        {/* <View style={{ alignItems: 'center' }}>
                            <Text
                                text10
                                style={{ fontSize: 64, fontWeight: 'bold', margin: 64 }}
                            >
                                TOKO MUSIC
                            </Text>
                        </View> */}
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ height: 100, width: 100, backgroundColor: "#f2f2f2", borderRadius: 50, justifyContent: "center", alignItems: 'center', marginTop: 30, marginBottom: 30 }}>
                                <Icon name='ios-person' size={80} color='grey'></Icon>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text
                                    text10
                                    style={{ fontSize: 25, fontWeight: '100', marginBottom: 20, marginTop: 20, marginRight: 5, color:'#f2f2f2' }}
                                >
                                    Welcome to
                                </Text>
                                <Text
                                    text10
                                    style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 20, marginTop: 20, color:'#f2f2f2' }}
                                >
                                    TOKO MUSIK
                                </Text>
                            </View>

                        </View>
                        <View style={{ padding: 16, borderRadius: 8 }}>

                            <TextInput
                                placeholder='Email'
                                autoFocus
                                keyboardType='email-address'
                                mode='outlined'
                                textContentType='emailAddress'
                                label='Email'
                                value={this.state.email}
                                onChangeText={text => this.changeValue("email", text)}
                                style={{ borderRadius: 20, marginBottom: 8, borderWidth: 2, paddingLeft: 15, fontSize: 20, borderColor: '#f2f2f2', color: "#01627c", }}
                            />
                            <TextInput
                                placeholder='Password'
                                secureTextEntry
                                mode='outlined'
                                textContentType='password'
                                label='Password'
                                value={this.state.password}
                                onChangeText={text => this.changeValue("password", text)}
                                style={{ borderRadius: 20, marginBottom: 8, borderWidth: 2, paddingLeft: 15, fontSize: 20, borderColor: '#f2f2f2', color: "#01627c" }}
                            />
                            {/* <Button
                                title='login'
                                icon='keyboard-arrow-right'
                                mode='contained'
                                dark
                                color='black'
                                onPress={this.loginUser}
                            /> */}
                            {/* <TouchableOpacity onPress={this.loginUser}>
                                <Text>login cobaaa</Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity onPress={this.loginUser} style={{ alignItems: 'center', marginTop: 15 }} >
                                <View style={{ height: 50, width: '100%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 15 }}>
                                    {/* <Icon name='ios-play' size={40}></Icon> */}
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#47b5be' }}>LOGIN</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                        {/* <View style={{ alignItems: 'flex-end', marginVertical: 8 }}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Register')}
                                rippleColor='rgba(0, 0, 0, .32)'
                            >
                                <Text style={{ color: 'black' }}>New Member? Register Here!</Text>
                            </TouchableOpacity>
                        </View> */}
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                                <View style={{ flexDirection: 'row', marginBottom:180 }}>
                                    <Text
                                        text10
                                        style={{ fontSize: 14, fontWeight: '100', marginTop: 10, marginRight: 5, color:'#2f2260' }}
                                    >
                                        or Sign Up
                                    </Text>
                                    <Text
                                        text10
                                        style={{ fontSize: 16, fontWeight: 'bold',  marginTop: 10, color:'#2f2260'}}
                                    >
                                        Here!
                                    </Text>
                                </View>

                            </TouchableOpacity>

                        </View>
                    </View>
                </ScrollView>

            </SafeAreaView>

        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.user,
        userLoading: state.user.isLoading,
        token: state.user.token,
        cart: state.cart.cart
    }
}

export default connect(mapStateToProps)(LoginScreen)

// export default LoginScreen