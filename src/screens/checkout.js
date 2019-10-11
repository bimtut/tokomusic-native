import React, {Component} from 'react'
import {
    Image,
    Text,
    View,
    StatusBar,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

class checkout extends Component{
    render() {
        // const { firstQuery } = this.state

        return (
            <>
                {/* <StatusBar backgroundColor='white' barStyle='dark-content' /> */}
                <View>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.toggleDrawer()}
                    >
                        <Text>ini Checkout</Text>

                    </TouchableOpacity>
                    
                </View>
            </>
        )
    }
}
export default checkout