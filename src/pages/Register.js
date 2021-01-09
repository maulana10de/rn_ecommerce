import {StackActions} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, Alert, KeyboardAvoidingView} from 'react-native';
import {Button, Icon, Input} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {onRegister} from '../actions';

const Register = (props) => {
  const [stateData, setStateData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confPassword: '',
  });

  const dispatch = useDispatch();
  const {loading, iduser} = useSelector(({authReducer}) => {
    return {
      loading: authReducer.loading,
      iduser: authReducer.iduser,
    };
  });

  const regis = async () => {
    let {fullName, username, email, password, confPassword} = stateData;
    if (
      (fullName == '',
      username == '' || email == '' || password == '' || confPassword == '')
    ) {
      Alert.alert('Please fill all the required fields');
    } else {
      dispatch(onRegister({fullName, username, email, password}));
    }
  };

  useEffect(() => {
    if (iduser) {
      props.navigation.dispatch(StackActions.replace('TabNav'));
    }
  });

  return (
    <KeyboardAvoidingView behavior="height" style={{flex: 1}} enabled={true}>
      <View style={{backgroundColor: 'white', flex: 1}}>
        <View style={{marginHorizontal: 50, marginVertical: 100, flex: 1}}>
          <Text style={{fontSize: 25, marginBottom: 15, paddingLeft: 10}}>
            Register Account
          </Text>
          <Input
            leftIcon={
              <Icon name="user" size={20} type="feather" color="grey" />
            }
            placeholder="Full Name"
            onChangeText={(value) =>
              setStateData({...stateData, fullName: value})
            }
          />
          <Input
            leftIcon={
              <Icon name="user" size={20} type="feather" color="grey" />
            }
            placeholder="Username"
            onChangeText={(value) =>
              setStateData({...stateData, username: value})
            }
          />
          <Input
            leftIcon={
              <Icon name="mail" size={20} type="feather" color="grey" />
            }
            placeholder="Email"
            onChangeText={(value) => setStateData({...stateData, email: value})}
          />
          <Input
            secureTextEntry
            leftIcon={
              <Icon name="lock" size={20} type="feather" color="grey" />
            }
            placeholder="Password"
            onChangeText={(value) =>
              setStateData({...stateData, password: value})
            }
          />
          <Input
            secureTextEntry
            leftIcon={
              <Icon name="lock" size={20} type="feather" color="grey" />
            }
            placeholder="Confirm Password"
            onChangeText={(value) =>
              setStateData({...stateData, confPassword: value})
            }
          />

          <Button
            title="Register"
            buttonStyle={{
              width: '85%',
              borderRadius: 10,
              backgroundColor: 'grey',
            }}
            containerStyle={{
              alignItems: 'center',
            }}
            titleStyle={{
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
            onPress={regis}
            loading={loading}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;
