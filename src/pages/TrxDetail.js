import React, {useEffect} from 'react';
import {Image} from 'react-native';
import {View, Text} from 'react-native';
import {Divider, Icon, Skeleton} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {getTrxDetail} from '../actions';
import currency from 'currency-formatter';
import {ScrollView} from 'react-native-gesture-handler';
import moment from 'moment';

const TrxDetail = (props) => {
  const {
    idtransaction,
    invoice,
    status,
    totalPayment,
    date,
  } = props.route.params.data.item;
  const dispatch = useDispatch();

  const {trxDetail, loading} = useSelector(({cartReducer}) => {
    return {
      trxDetail: cartReducer.trxDetail,
      loading: cartReducer.loading,
    };
  });

  useEffect(() => {
    dispatch(getTrxDetail(idtransaction));
  }, []);

  return (
    <ScrollView
      style={{backgroundColor: 'white', flex: 1}}
      showsVerticalScrollIndicator={false}>
      <View>
        <View
          style={{
            marginHorizontal: 15,
            marginVertical: 15,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="shopping-bag" type="feather" size={40} />
              <View style={{paddingLeft: 5}}>
                <Text style={{fontSize: 13, color: 'grey'}}>
                  {moment(date).format('ll')}
                </Text>
                <Text style={{fontWeight: 'bold'}}>{invoice}</Text>
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 10, color: 'grey'}}>Status</Text>
              <Text
                style={{
                  fontSize: 10,
                  color: 'white',
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  letterSpacing: 1,
                  backgroundColor: 'green',
                  borderRadius: 5,
                }}>
                {status}
              </Text>
            </View>
          </View>

          <Divider style={{marginVertical: 10}} />

          <View>
            {trxDetail.map((item, idx) => (
              <View
                key={idx}
                style={{
                  backgroundColor: 'white',
                  padding: 15,
                  borderRadius: 5,
                  marginVertical: 5,
                  elevation: 2,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={{uri: item.image}}
                    style={{
                      height: 80,
                      width: 80,
                      borderRadius: 10,
                      paddingHorizontal: 5,
                    }}
                  />
                  <View style={{marginLeft: 15}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                      {item.product}
                    </Text>
                    <Text
                      style={{
                        color: 'grey',
                        fontSize: 12,
                      }}>
                      {item.qty} Barang
                    </Text>
                    <Text
                      style={{
                        color: '#FF4500',
                        fontWeight: 'bold',
                      }}>
                      {currency.format(item.price, {code: 'IDR'})}
                    </Text>
                  </View>
                </View>
                <Divider style={{marginVertical: 10, marginHorizontal: 5}} />
                <View style={{alignItems: 'flex-end'}}>
                  <Text
                    style={{
                      color: 'grey',
                      fontSize: 13,
                    }}>
                    Total Harga
                  </Text>
                  <Text
                    style={{
                      color: '#FF4500',
                      fontWeight: 'bold',
                    }}>
                    {currency.format(item.total_price, {code: 'IDR'})}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <Divider style={{marginVertical: 10}} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#DCDCDC',
              padding: 20,
              borderRadius: 5,
              alignItems: 'center',
            }}>
            <Text
              style={{
                textTransform: 'uppercase',
                letterSpacing: 2,
                color: 'black',
                fontWeight: 'bold',
              }}>
              Total
            </Text>
            <Text
              style={{
                color: '#FF4500',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              {currency.format(totalPayment, {code: 'IDR'})}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default TrxDetail;
