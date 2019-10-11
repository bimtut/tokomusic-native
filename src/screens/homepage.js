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
    FlatList
} from 'react-native'
import { SafeAreaView } from 'react-navigation'
import CategoryCard from '../components/CategoryCard'
import { connect } from 'react-redux'
import { getCategories } from '../public/redux/actions/categories'
// import { Card, CardItem, Body, Spinner } from "native-base";
import { Card, CardItem, Body, Left, Right, Spinner } from "native-base";

import Icon from "react-native-vector-icons/Ionicons";


const { height, width } = Dimensions.get('window');


export class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                id: '',
                name: '',
                email: '',
            },
            token: '',
            categories: []
        }
    }

    componentDidMount = async () => {
        await this.props.dispatch(getCategories())
        this.setState({
            categories: this.props.categories
        })
        console.warn('hasil', this.state.categories)


    }

    toItemList = (id) => {
        this.props.navigation.navigate('itemsByCategory', { id: id });
    }

    render() {
        console.warn(this.state.categories)
        if (this.props.categoriesLoading) {
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
                    
                    <View style={{ flex: 1, backgroundColor: '#47b5be' }}>

                        <FlatList
                            containerStyle={styles.MainContainer}
                            contentContainerStyle={{ alignItems: 'center', backgroundColor: '#47b5be' }}
                            data={this.state.categories}
                            renderItem={({ item }) =>
                                <TouchableOpacity onPress={() => this.toItemList(item.id)}>
                                    <View style={{
                                        backgroundColor: 'white',
                                        borderRadius: 10,
                                        width: 138,
                                        height: 160,
                                        alignSelf: 'flex-start',
                                        margin: 10
                                    }}>
                                        <View style={{
                                            height: 136, width: 136, borderColor: 'grey', borderRadius: 10
                                        }}>
                                            <Image
                                                style={{ width: '100%', height: '100%', borderRadius: 10 }}
                                                source={{ uri: `${item.image}` }} />
                                        </View>
                                        <Text style={{ justifyContent: 'flex-start', alignContent: 'center', textAlign: 'left', paddingLeft: 8, color: '#47b5be', fontWeight: '900' }}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            }
                            numColumns={2}
                        />
                    </View>
                    <View style={{ backgroundColor: '#01627c', width: '100%', height: 12 }}></View>
                </SafeAreaView>
            )
        }
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        paddingTop: 15,
        paddingBottom: 5,
        flexDirection: 'column',
        fontFamily: 'openSans',
        backgroundColor: 'white'
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        paddingLeft: 10

    },
    noteText: {
        flex: 0.3,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    button: {
        height: 40,
        width: 40,

    },
    searchBarContainer: {
        marginBottom: 10,
        marginStart: 23,
        marginEnd: 23,
        backgroundColor: 'white',
        borderColor: 'white',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        shadowColor: '#000',
        shadowRadius: 15,
        shadowOffset: { width: 4, height: 13 },
        shadowOpacity: 0.8,
        elevation: 6,
        borderRadius: 20,
        height: 45

    },
    cardDivider: {
        borderTopStartRadius: 0,
        display: 'none'
    },
    cardTitle: {
        alignSelf: 'flex-end',
        fontSize: 10,
        flexWrap: 'wrap',
        color: 'white'
    }
})
const mapStateToProps = state => {
    return {
        categoriesLoading: state.categories.isLoading,

        categories: state.categories.categories
    }
}

export default connect(mapStateToProps)(Home)
