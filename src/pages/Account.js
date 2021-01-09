import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getTransaction} from '../actions';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {Image} from 'react-native';
import {ImageBackground} from 'react-native';
import {Tab, Tabs} from 'native-base';
import DetailProfile from './DetailProfile';
import Transaction from './Transaction';
import Setting from './Setting';
const image = {
  uri:
    'https://image.freepik.com/free-photo/abstract-view-modern-architecture_1359-522.jpg',
};

const Profile = (props) => {
  const dispatch = useDispatch();
  const {iduser, fullName} = useSelector((state) => {
    return {
      iduser: state.authReducer.iduser,
      fullName: state.authReducer.fullName,
    };
  });

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
          width: '100%',
          height: hp(40),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ImageBackground
          source={image}
          style={{
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center',
            alignItems: 'center',
            width: wp(100),
          }}>
          <Image
            source={{
              uri:
                'https://i.pinimg.com/736x/43/91/57/4391572831eca913bf815424023ba0fd.jpg',
            }}
            style={{
              height: 80,
              width: 80,
              borderRadius: 30,
              paddingHorizontal: 5,
            }}
          />
          <Text
            style={{
              fontSize: 18,
              letterSpacing: 1,
              paddingTop: 5,
              color: 'white',
              textTransform: 'capitalize',
            }}>
            {fullName}
          </Text>
        </ImageBackground>
      </View>

      <Tabs
        tabBarUnderlineStyle={{
          borderBottomWidth: 2,
          borderBottomColor: 'grey',
        }}>
        <Tab
          heading="Transaction"
          tabStyle={{backgroundColor: 'white'}}
          textStyle={{color: 'black'}}
          activeTabStyle={{backgroundColor: 'white'}}
          activeTextStyle={{color: 'black', fontWeight: 'normal'}}>
          <Transaction navigation={props.navigation} />
        </Tab>
        <Tab
          heading="Profile"
          tabStyle={{backgroundColor: 'white'}}
          textStyle={{color: 'black'}}
          activeTabStyle={{backgroundColor: 'white'}}
          activeTextStyle={{color: 'black', fontWeight: 'normal'}}>
          <DetailProfile />
        </Tab>
        <Tab
          heading="Setting"
          tabStyle={{backgroundColor: 'white'}}
          textStyle={{color: 'black'}}
          activeTabStyle={{backgroundColor: 'white'}}
          activeTextStyle={{color: 'black', fontWeight: 'normal'}}>
          <Setting navigation={props.navigation} />
        </Tab>
      </Tabs>
    </View>
  );
};

export default Profile;
