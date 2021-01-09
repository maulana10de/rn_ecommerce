import React, {useEffect, useState} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import currency from 'currency-formatter';
import {Badge, Button} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../actions';
import {Alert} from 'react-native';

const ProductDetail = (props) => {
  const {
    idproduct,
    product,
    image,
    category,
    description,
    price,
    stock,
  } = props.route.params.prodDetail;

  const dispatch = useDispatch();
  const {iduser, cartUser} = useSelector(({authReducer, cartReducer}) => {
    return {
      iduser: authReducer.iduser,
      cartUser: cartReducer.cartUser,
    };
  });

  let qty = 0;
  cartUser
    .filter((e) => e.idproduct === idproduct)
    .forEach((el) => {
      qty = el.qty;
    });

  console.log('=>', qty, stock);

  const onBtAddToCart = (qty, stock) => {
    if (qty >= stock) {
      Alert.alert(
        `Stock tersisa ${stock} dan dikeranjang anda sudah ada ${qty}`,
      );
    } else {
      dispatch(addToCart((data = {iduser, idproduct, qty: 1})));
    }
  };

  return (
    <>
      <ScrollView>
        <View style={{flex: 1}}>
          <View>
            <Image
              source={{uri: image}}
              style={{
                height: wp(100),
                borderRadius: 10,
                paddingHorizontal: 5,
              }}
            />
          </View>
          <View style={{margin: 10}}>
            <Text
              style={{
                fontSize: 14,
                letterSpacing: 1,
                color: '#787878',
              }}>
              <Badge
                value={
                  stock <= 0 ? (
                    <Text
                      style={{
                        fontSize: 10,
                        color: 'black',
                        paddingVertical: 30,
                        paddingHorizontal: 10,
                        fontWeight: 'bold',
                      }}>
                      Stock Kosong
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: 10,
                        color: 'white',
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        letterSpacing: 1,
                      }}>
                      Stock Tersedia
                    </Text>
                  )
                }
                status={stock <= 0 ? 'error' : 'success'}
              />
            </Text>

            <Text
              style={{
                fontSize: 18,
                letterSpacing: 1,
                color: '#787878',
              }}>
              {product}
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 20, marginBottom: 25}}>
              {currency.format(price, {code: 'IDR'})}
            </Text>
            <View>
              <Button
                title="add to cart"
                onPress={() => onBtAddToCart(qty, stock)}
                disabled={stock <= 0 ? true : false}
              />
            </View>

            <Text
              style={{
                fontWeight: 'bold',
                borderBottomColor: '#787878',
                borderBottomWidth: 0.3,
                paddingBottom: 10,
                marginBottom: 10,
                paddingTop: 20,
              }}>
              Deskripsi Produk
            </Text>
            <Text style={{fontSize: 13, color: '#787878', lineHeight: 20}}>
              {description}
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ProductDetail;
