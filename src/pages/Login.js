import React, {useEffect, useState} from 'react';
import {View, Text, Image, Alert, Keyboard} from 'react-native';
import {Button, Icon, Input} from 'react-native-elements';
import {StackActions} from '@react-navigation/native';
import {onLogin} from '../actions';
import logo from '../assets/images/logo.png';
import {useDispatch, useSelector} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {KeyboardAvoidingView} from 'react-native';

const Login = (props) => {
  const [state, setState] = useState({
    username: '',
    password: '',
  });

  const dispatch = useDispatch();
  const {loading, iduser} = useSelector(({authReducer}) => {
    return {
      loading: authReducer.loading,
      iduser: authReducer.iduser,
    };
  });

  const login = async () => {
    let {username, password} = state;
    if (username == '' || password == '') {
      Alert.alert('Isi semua form');
    } else {
      dispatch(onLogin({username, password}));
    }
  };

  useEffect(() => {
    if (iduser) {
      props.navigation.dispatch(StackActions.replace('TabNav'));
    }
  });

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={logo} style={{height: hp('12%'), width: wp('30%')}} />
        <Text style={{fontSize: 17, paddingVertical: 30, fontWeight: 'bold'}}>
          Sign In Your Account
        </Text>
        <Input
          placeholder="Username"
          leftIcon={<Icon name="users" type="feather" size={22} />}
          containerStyle={{width: wp(70)}}
          onChangeText={(value) => setState({...state, username: value})}
        />
        <Input
          secureTextEntry
          placeholder="Password"
          leftIcon={<Icon name="lock" type="feather" size={22} />}
          containerStyle={{width: wp(70)}}
          onChangeText={(value) => setState({...state, password: value})}
        />
        <Text>Forgot Password ?</Text>
        <Button
          title="Sign In"
          containerStyle={{width: wp(70), marginTop: hp(2)}}
          onPress={login}
          loading={loading}
        />
      </View>
      <Text
        style={{
          textAlign: 'center',
          paddingTop: hp(5),
          paddingBottom: hp(1),
        }}>
        Not have account ?{' '}
        <Text
          style={{color: 'skyblue', fontWeight: 'bold'}}
          onPress={() => props.navigation.navigate('Register')}>
          Regis Now
        </Text>{' '}
      </Text>
    </View>
  );
};

export default Login;
