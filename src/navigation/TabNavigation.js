import React, {useEffect} from 'react';
import {Icon} from 'react-native-elements';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Account from '../pages/Account';
import Cart from '../pages/Cart';
import {useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();

const TabNavigation = (props) => {
  const {totalQty} = useSelector(({cartReducer}) => {
    return {
      totalQty: cartReducer.totalQty,
    };
  });

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Account') {
            iconName = 'user';
          } else if (route.name === 'Cart') {
            iconName = 'shopping-cart';
          }
          return (
            <Icon name={iconName} type="feather" size={20} color={color} />
          );
        },
      })}
      tabBarOptions={{
        showLabel: true,
        activeTintColor: 'red',
        inactiveTintColor: 'grey',
        labelStyle: {
          fontWeight: 'bold',
          letterSpacing: 1,
          textTransform: 'uppercase',
        },
      }}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{tabBarBadge: totalQty}}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
