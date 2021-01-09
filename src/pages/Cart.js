import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Button, Header, Icon, Text} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {getCart, onUpdateQtyCart, onHandleCheckOut} from '../actions';
import CartCard from '../components/CartCard';
import currency from 'currency-formatter';
import {KeyboardAvoidingView} from 'react-native';
import {StackActions} from '@react-navigation/native';

const Cart = (props) => {
  const dispatch = useDispatch();
  const {iduser, cart, success, totalPayment} = useSelector(
    ({authReducer, cartReducer}) => {
      return {
        iduser: authReducer.iduser,
        cart: cartReducer.cartUser,
        success: cartReducer.success,
        totalPayment: cartReducer.totalPayment,
      };
    },
  );

  let idCart = [];
  let data = [];
  cart.forEach((elem) => {
    idCart.push(elem.idcart);
    data.push({
      idproduct: elem.idproduct,
      qty: elem.qty,
      total_price: elem.qty * elem.price,
      note: elem.note,
    });
  });

  const onBtUpdateQty = (qty, type, idcart, iduser) => {
    dispatch(onUpdateQtyCart(qty, type, idcart, iduser));
  };

  useEffect(() => {
    if (success) {
      props.navigation.dispatch(StackActions.replace('TabNav'));
    }
    dispatch(getCart(iduser));
  }, [success]);

  return (
    <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Header
          containerStyle={{backgroundColor: 'grey'}}
          leftComponent={
            <Text
              style={{
                fontSize: 14,
                color: 'white',
                fontWeight: 'bold',
                letterSpacing: 1,
              }}>
              Keranjang
            </Text>
          }
          rightComponent={
            <Icon name="heart" type="feather" size={20} color="white" />
          }
        />

        <FlatList
          data={cart}
          renderItem={({item, index}) => (
            <CartCard data={item} onBtUpdate={onBtUpdateQty} idx={index} />
          )}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
        />
        {cart.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 5,
              marginVertical: 10,
            }}>
            <View>
              <Text>Total Payment</Text>
              <Text h4>{currency.format(totalPayment, {code: 'IDR'})}</Text>
            </View>
            <Button
              title="Check Out"
              containerStyle={{width: '40%'}}
              onPress={() =>
                dispatch(onHandleCheckOut(data, idCart, iduser, totalPayment))
              }
            />
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default Cart;
