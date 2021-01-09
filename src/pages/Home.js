import React, {useEffect, useRef, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Header, SearchBar, Icon, Card, Badge} from 'react-native-elements';
import Axios from 'axios';
import {APIURL} from '../utils/api_urls';
import {FlatList, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import ProductCard from '../components/ProductCard';
import {getCart, getProducts, getTransaction} from '../actions';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';

const Home = (props) => {
  const productIcon = [
    require('../assets/images/icon-1.png'),
    require('../assets/images/icon-2.png'),
    require('../assets/images/icon-3.png'),
    require('../assets/images/icon-4.png'),
    require('../assets/images/icon-5.png'),
  ];

  const searchEl = useRef(false);

  const [search, setSearch] = useState('');
  const [promo, setPromo] = useState('');

  const dispatch = useDispatch();

  const getPromo = async () => {
    try {
      let getPromo = await Axios.get(APIURL + `/promo`);
      setPromo(getPromo.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAsync = async () => {
    try {
      let get = await AsyncStorage.getItem('dataUser');
    } catch (error) {
      console.log(error);
    }
  };

  const {products, iduser, totalQty, isGetCart, loading, trx} = useSelector(
    (state) => {
      return {
        products: state.productReducer.products,
        iduser: state.authReducer.iduser,
        totalQty: state.cartReducer.totalQty,
        isGetCart: state.cartReducer.reload,
        loading: state.cartReducer.loading,
        trx: state.cartReducer.trx,
      };
    },
  );

  useEffect(() => {
    getPromo();
    dispatch(getProducts());
    dispatch(getTransaction(iduser));
  }, []);

  useEffect(() => {
    console.log('running get cart');
    dispatch(getCart(iduser));
  }, [isGetCart]);

  console.log('trx', trx);

  const renderProduct = () => {
    return products.map((e, i) => {
      return (
        <TouchableWithoutFeedback
          key={i}
          onPress={() =>
            props.navigation.navigate('ProductDetail', {prodDetail: e})
          }>
          <View>
            <ProductCard data={e} />
          </View>
        </TouchableWithoutFeedback>
      );
    });
  };

  getAsync();

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          containerStyle={{backgroundColor: 'rgba(0,0,0, 0.3)', zIndex: 1}}
          leftComponent={
            <SearchBar
              inputStyle={{
                fontSize: 14,
                letterSpacing: 2,
              }}
              inputContainerStyle={{
                backgroundColor: 'white',
                borderWidth: 0,
                height: wp(9),
              }}
              value={search}
              onChangeText={(value) => setSearch(value)}
              placeholder="Search"
              containerStyle={styles.searchbar}
              cancelIcon={<Icon name="cancel" type="feather" size={20} />}
              ref={searchEl}
              onFocus={() => props.navigation.navigate('Search')}
            />
          }
          rightComponent={
            <View style={{flexDirection: 'row'}}>
              <Icon
                name="heart"
                type="feather"
                size={20}
                color="white"
                style={{marginHorizontal: wp(2)}}
              />
              <Icon
                name="mail"
                type="feather"
                size={20}
                color="white"
                style={{marginHorizontal: wp(2)}}
              />
              <View>
                <Icon
                  name="bell"
                  type="feather"
                  size={20}
                  color="white"
                  style={{marginHorizontal: wp(2)}}
                />
                <Badge
                  value={totalQty}
                  containerStyle={{position: 'absolute', top: -5, right: -2}}
                />
              </View>
            </View>
          }
        />
        <View style={{marginTop: hp(-11)}}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.idpromo.toString()}
            data={promo}
            renderItem={({item}) => (
              <ImageBackground
                source={{uri: item.image}}
                style={{width: wp(100), height: hp(40)}}
              />
            )}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <Card
            containerStyle={{
              width: wp(90),
              borderRadius: wp(1),
              elevation: 5,
              padding: wp(2),
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Icon name="grid" type="feather" size={30} />
                <Text>Scan</Text>
              </View>
              <View
                style={{flex: 2, alignItems: 'center', flexDirection: 'row'}}>
                <Icon name="dollar-sign" type="feather" size={20} />
                <View style={{marginHorizontal: wp(3)}}>
                  <Text>Rp0</Text>
                  <Text style={{fontWeight: 'bold', color: '#3498db'}}>
                    Top Up Money
                  </Text>
                </View>
              </View>
              <View
                style={{flex: 2, alignItems: 'center', flexDirection: 'row'}}>
                <Icon name="credit-card" type="feather" size={20} />
                <View style={{marginHorizontal: wp(3)}}>
                  <Text>My Promo</Text>
                  <Text style={{fontWeight: 'bold', color: '#3498db'}}>
                    16 Promo
                  </Text>
                </View>
              </View>
            </View>
          </Card>
        </View>
        <View style={{marginVertical: hp(4), marginLeft: 0}}>
          <FlatList
            data={productIcon}
            renderItem={({item}) => (
              <Image
                source={item}
                style={{width: 75, height: 75, marginHorizontal: wp(2)}}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={{flexWrap: 'wrap', flexDirection: 'row', flex: 1}}>
          {renderProduct()}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

// css style
const styles = StyleSheet.create({
  searchbar: {
    width: wp('70%'),
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    borderTopWidth: 0,
    marginLeft: wp(-3),
  },
});
