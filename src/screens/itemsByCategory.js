

import React, { Fragment } from 'react';

// import HeaderComponent  from '../Components/HeaderComponent';
// import FooterComponent from '../Components/FooterComponent';
// import ItemList from './ItemList';

import { connect } from 'react-redux';
import { getItemsByCategory } from '../public/redux/actions/items';
import { SafeAreaView } from 'react-navigation';
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
// import SearchBar from '../Components/SearchBar';
import Icon from "react-native-vector-icons/Ionicons";
import { Spinner } from "native-base";




class itemsByCategory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }

  componentDidMount = async () => {
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

  toItemDetail = (id) => {
    console.log('ini id barang dari category page >> ', id)
    this.props.navigation.navigate('ItemDetail', { id: id });
  }
  isi = async () => {
    const { navigation } = this.props;
    const id = navigation.getParam('id');

    console.warn('navparam', id);
    await this.props.dispatch(getItemsByCategory(id));
    this.setState({
      list: this.props.items
    })
  }
  render() {
    const WIDTH = Dimensions.get('window').width

    if (this.props.itemListLoading) {
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
          {this.props.items.length ?
            <View style={{ flex: 1, marginTop: 10 }}>
              <FlatList
                // containerStyle={styles.MainContainer}
                contentContainerStyle={{ alignItems: 'center' }}
                data={this.props.items}
                renderItem={({ item, index }) =>
                  <TouchableOpacity onPress={() => { this.toItemDetail(item.id) }}>
                    <View style={{
                      borderRadius: 10,
                      borderWidth: 1,
                      width: WIDTH * 0.90,
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
                        <Text style={{ justifyContent: 'center', alignContent: 'center', textAlign: 'left', paddingHorizontal: 8, fontWeight: 'bold', color: '#2f2260', fontSize: 15 }}>{item.name.slice(0, 31)}</Text>
                        <Text style={{ justifyContent: 'center', alignContent: 'center', textAlign: 'left', paddingHorizontal: 8, color: '#2f2260', fontSize: 15 }}>{item.name.slice(31)}</Text>

                      </View>
                    </View>
                  </TouchableOpacity>
                }
                numColumns={1}
              />
            </View>
            : 
            <View style={{flex:1, justifyContent:'center'}}>
              <Text style={{color: '#01627c', fontSize: 17, justifyContent:'center', alignSelf:'center' }}>No Product(s) are available</Text>
              </View>}
          <View style={{ backgroundColor: '#01627c', width: '100%', height: 12 }}></View>

        </SafeAreaView>


      );
    }
  }

};


function mapStateToProps(state) {
  return {
    itemListLoading: state.items.isLoading,

    items: state.items.items
  }
}

export default connect(mapStateToProps)(itemsByCategory);
// export default ItemListScreen ;
