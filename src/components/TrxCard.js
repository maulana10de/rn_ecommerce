import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import currency from 'currency-formatter';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {updatePaymentStatus} from '../actions';

const TrxCard = (props) => {
  let {idtransaction, date, invoice, status, totalPayment} = props.data.item;

  const dispatch = useDispatch();
  const {iduser} = useSelector(({authReducer}) => {
    return {
      iduser: authReducer.iduser,
    };
  });

  return (
    <View
      style={{
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: 'white',
        borderRightColor: 'green',
        borderRadius: 10,
        elevation: 1,
        borderColor: 'green',
        borderWidth: 2,
        marginBottom: 10,
      }}>
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: 'grey',
          paddingBottom: 5,
          marginBottom: 5,
        }}>
        <View>
          <Text style={{fontSize: 12, fontWeight: 'bold'}}>
            Date : {moment(date).format('ll')}
          </Text>
        </View>
        <View>
          {status === 'Paid' ? (
            <Text
              style={{
                fontSize: 10,
                color: 'white',
                paddingVertical: 3,
                paddingHorizontal: 10,
                letterSpacing: 1,
                borderRadius: 5,
                backgroundColor: '#4EBA16',
              }}>
              {status}
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 10,
                color: 'black',
                paddingVertical: 3,
                paddingHorizontal: 10,
                letterSpacing: 1,
                borderRadius: 5,
                backgroundColor: 'red',
              }}>
              {status}
            </Text>
          )}
        </View>
      </View>

      <Text>{invoice}</Text>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginTop: 15,
        }}>
        <Text style={{fontSize: 12, fontWeight: 'bold', marginTop: 15}}>
          {currency.format(totalPayment, {code: 'IDR'})}
        </Text>
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <Button
            title="Order Details"
            containerStyle={{width: 90, marginRight: 5}}
            titleStyle={{fontSize: 10}}
            buttonStyle={{backgroundColor: 'green'}}
            onPress={() =>
              props.navigation.navigate('TrxDetail', {data: props.data})
            }
          />
          {status !== 'Paid' && (
            <Button
              title="Pay Now"
              containerStyle={{width: 70}}
              titleStyle={{fontSize: 10}}
              buttonStyle={{backgroundColor: 'green'}}
              onPress={() =>
                dispatch(updatePaymentStatus(idtransaction, iduser))
              }
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default TrxCard;
