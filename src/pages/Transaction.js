import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {getTransaction, onLogout, updatePaymentStatus} from '../actions';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {CommonActions} from '@react-navigation/native';
import {Image} from 'react-native';
import {ImageBackground} from 'react-native';
import {Tab, Tabs} from 'native-base';
import DetailProfile from './DetailProfile';
import {
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import TrxCard from '../components/TrxCard';

const Transaction = (props) => {
  const dispatch = useDispatch();
  const {iduser, username, trx} = useSelector(({authReducer, cartReducer}) => {
    return {
      iduser: authReducer.iduser,
      username: authReducer.username,
      trx: cartReducer.trx,
    };
  });

  // const btLogout = async () => {
  //   dispatch(onLogout());
  // };

  useEffect(() => {
    dispatch(getTransaction(iduser));
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <View
        style={{
          flex: 2,
          width: wp(100),
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            marginVertical: 10,
            backgroundColor: 'white',
          }}>
          <Text
            style={{
              paddingVertical: 5,
              fontWeight: 'bold',
            }}>
            Daftar Transaksi
          </Text>
        </View>
        <View>
          <FlatList
            data={trx}
            renderItem={(item) => (
              <TrxCard data={item} navigation={props.navigation} />
            )}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 100}}
          />
        </View>

        {/* <Button
          title="Logout"
          containerStyle={{width: wp(50), marginTop: hp(2)}}
          onPress={btLogout}
        /> */}
      </View>
    </View>
  );
};

export default Transaction;
