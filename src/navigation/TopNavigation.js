import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import DetailProfile from '../pages/DetailProfile';
import Transaction from '../pages/Transaction';
import Account from '../pages/Account';

const Top = createMaterialTopTabNavigator();

const TopNav = () => {
  return (
    <Top.Navigator>
      <Top.Screen name="Account" component={Account} />
      <Top.Screen name="UserProfile" component={DetailProfile} />
      <Top.Screen name="Transaction" component={Transaction} />
    </Top.Navigator>
  );
};

export default TopNav;
