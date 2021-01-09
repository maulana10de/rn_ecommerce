import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Body, Card, CardItem, Thumbnail, Left, Right} from 'native-base';
import {Button, Input} from 'react-native-elements';
import currency from 'currency-formatter';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
import {addNote} from '../actions';

const CartCard = ({data, onBtUpdate, idx}) => {
  let dispacth = useDispatch();
  return (
    <Card>
      <CardItem>
        <Left>
          <Thumbnail
            source={{uri: data.image}}
            style={{width: wp(15), height: hp(10)}}
          />
          <Body>
            <Text style={{fontWeight: 'bold', fontSize: 14}}>
              {data.product}
            </Text>
            <Text>{currency.format(data.price, {code: 'IDR'})}</Text>
            <Text style={{fontSize: 10, color: 'red', fontWeight: 'bold'}}>
              Sisa Stock {data.stock}
            </Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem>
        <Left>
          <Input
            style={{fontSize: 14}}
            placeholder="Tulis catatan"
            onChangeText={(value) => {
              dispacth(addNote(idx, value));
            }}
          />
        </Left>
        <Right>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Button
              onPress={() =>
                onBtUpdate(data.qty, 'dec', data.idcart, data.iduser)
              }
              title="-"
              buttonStyle={{
                width: wp(6),
                height: hp(4),
                marginLeft: 'auto',
              }}
            />
            <Text style={{margin: 10}}>{data.qty}</Text>
            <Button
              title="+"
              buttonStyle={{
                width: wp(6),
                height: hp(4),
              }}
              onPress={() =>
                onBtUpdate(data.qty, 'inc', data.idcart, data.iduser)
              }
              disabled={data.qty >= data.stock ? true : false}
            />
          </View>
        </Right>
      </CardItem>
    </Card>
  );
};

export default CartCard;
