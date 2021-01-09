import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigation from './TabNavigation';
import Register from '../pages/Register';
import Login from '../pages/Login';
import ProductDetail from '../pages/ProductDetail';
import {getCart, getProducts, onKeepLogin} from '../actions';
import {useDispatch, useSelector} from 'react-redux';
import Splash from '../pages/Splash';
import Cart from '../pages/Cart';
import TopNavigation from './TopNavigation';
import TrxDetail from '../pages/TrxDetail';
import Search from '../pages/Search';
import {View, Text} from 'native-base';
import {Icon, SearchBar} from 'react-native-elements';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Stack = createStackNavigator();

const MainNavigation = (props) => {
  const {isLogin} = useSelector(({authReducer}) => {
    return {
      isLogin: authReducer.isLogin,
    };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('main navigation');
    dispatch(onKeepLogin());
  }, [isLogin]);

  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{
          headerTitle: false,
        }}
      />

      <Stack.Screen
        name="TrxDetail"
        component={TrxDetail}
        options={{
          headerTitle: 'Transaction Details',
        }}
      />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          headerTitle: '',
          headerRight: () => (
            <SearchBar
              inputContainerStyle={{
                backgroundColor: '#F8F8F8',
                borderWidth: 0,
                height: wp(9),
              }}
              inputStyle={{fontSize: 14, letterSpacing: 2}}
              placeholder="Search"
              containerStyle={{
                width: wp(90),
                backgroundColor: 'transparent',
                borderBottomWidth: 0,
                borderTopWidth: 0,
                marginLeft: wp(-3),
                paddingRight: wp(8),
              }}
              cancelIcon={<Icon name="cancel" type="feather" size={20} />}
            />
          ),
        }}
      />
      <Stack.Screen
        name="TabNav"
        component={TabNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="TopNav" component={TopNavigation} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
