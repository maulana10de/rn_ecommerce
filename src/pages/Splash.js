import React, {useEffect} from 'react';
import {Text, View, Image} from 'react-native';
import splash from '../assets/images/splash.png';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9c74f',
      }}>
      <View>
        <Image source={splash} width={wp(70)} height={hp(20)} />
      </View>
    </View>
  );
};

export default Splash;
