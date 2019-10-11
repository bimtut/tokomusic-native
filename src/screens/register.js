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
    ScrollView,
    Button,
    ToastAndroid
} from 'react-native'
import { register } from "../public/redux/actions/user";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";


class RegisterScreen extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        register: {}
    }

    changeValue = (name, value) => {
        this.setState(() => ({ [name]: value }));
    }

    registerUser = async () => {
        console.warn('udah klik ye')
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        await this.props.dispatch(register(data))
        this.setState({
            register: this.props.register
        })

        if (this.state.register.error) {
            ToastAndroid.showWithGravity(
                this.state.register.error,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            )
        } else {
            ToastAndroid.showWithGravity(
                'Register berhasil. \n Selamat datang',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            )
            this.props.navigation.navigate('Login')
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
                            backgroundColor: '#007ba4',
                            paddingHorizontal: 16,
                            paddingVertical: 8,
                        }}
                    >
                        <StatusBar backgroundColor='white' barStyle='dark-content' />
                        <View style={{ alignItems: 'center', }}>
                            <View style={{ height: 100, width: 100, backgroundColor: "#f2f2f2", borderRadius: 50, justifyContent: "center", alignItems: 'center', marginTop: 30, marginBottom: 30 }}>
                                <Icon name='ios-person' size={80} color='grey'></Icon>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text
                                    text10
                                    style={{ fontSize: 28, fontWeight: '100', marginBottom: 20, marginTop: 20, color:"#f2f2f2" }}
                                >
                                    CREATE
                        </Text>
                                <Text
                                    text10
                                    style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20, marginTop: 20, color:'#f2f2f2' }}
                                >
                                    ACCOUNT
                        </Text>
                            </View>
                            <View style={{ borderColor: '#f2f2f2', borderWidth: 2, width: 170, marginBottom: 25, borderRadius:30, backgroundColor: '#f2f2f2' }}></View>
                        </View>
                        <View style={{ padding: 25, }}>

                            <TextInput
                                placeholderTextColor='#47b5be'
                                placeholder='Username'
                                autoFocus
                                keyboardType='default'
                                mode='outlined'
                                textContentType='username'
                                label='Username'
                                value={this.state.name}
                                onChangeText={text => this.changeValue("name", text)}
                                style={{ borderRadius: 20, marginBottom: 8, borderWidth: 2, paddingLeft: 15, fontSize: 20, borderColor: '#47b5be', color: "#47b5be" }}
                            />
                            <TextInput
                                placeholder='Email'
                                placeholderTextColor='#47b5be'
                                autoFocus
                                keyboardType='email-address'
                                mode='outlined'
                                textContentType='emailAddress'
                                label='Email'
                                value={this.state.email}
                                onChangeText={text => this.changeValue("email", text)}
                                style={{ borderRadius: 20, marginBottom: 8, borderWidth: 2, paddingLeft: 15, fontSize: 20, borderColor: '#47b5be', color: "#47b5be" }}
                            />
                            <TextInput
                                placeholderTextColor='#47b5be'
                                placeholder='Password'
                                secureTextEntry
                                mode='outlined'
                                textContentType='password'
                                label='Password'
                                value={this.state.password}
                                onChangeText={text => this.changeValue("password", text)}
                                style={{ borderRadius: 20, marginBottom: 8, borderWidth: 2, paddingLeft: 15, fontSize: 20, borderColor: '#47b5be', color: "#47b5be" }}
                            />
                            {/* <Button
                        title='REGiSTER'
                        icon='keyboard-arrow-right'
                        mode='contained'
                        dark
                        color='yellow'
                        onPress={this.registerUser}
                    /> */}
                            <TouchableOpacity onPress={this.registerUser} style={{ alignItems: 'center', marginTop: 15 }} >
                                <View style={{ height: 50, width: 85, backgroundColor: '#ffc909', alignItems: 'center', justifyContent: 'center', borderRadius: 15 }}>
                                    <Icon name='ios-play' size={40} color='#2f2260'></Icon>
                                </View>
                            </TouchableOpacity>


                        </View>
                        <View style={{ alignItems: 'center' }}>

                            <TouchableOpacity

                                onPress={() => this.props.navigation.navigate('Login')}
                                rippleColor='rgba(0, 0, 0, .32)'
                            >
                                <View style={{ flexDirection: 'row', marginTop: 60, marginBottom: 10 }}>
                                    <Text style={{ color: '#47b5be', alignItems: 'flex-end', fontSize: 14, fontWeight:'100' }}>Have account already ? </Text>
                                    <Text style={{ color: '#ffc909', fontSize: 14, fontWeight:'bold' }}>Login Here</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>

            </SafeAreaView>

        )
    }
}
// export default RegisterScreen

function mapStateToProps(state) {
    return {
        register: state.user.register
    }
}

export default connect(mapStateToProps)(RegisterScreen);