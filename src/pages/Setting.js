import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {onLogout} from '../actions';
import {CommonActions} from '@react-navigation/native';
import {ListItem, Icon} from 'react-native-elements';

const list = [
  {
    title: 'Account',
    icon: 'av-timer',
    link: 'account',
  },
  {
    title: 'About Us',
    icon: 'flight-takeoff',
    link: 'about-us',
  },
  {
    title: 'Term & Condition',
    icon: 'flight-takeoff',
    link: 'term',
  },
  {
    title: 'Privacy & Policy',
    icon: 'flight-takeoff',
    link: 'privacy',
  },
  {
    title: 'Logout',
    icon: 'flight-takeoff',
    link: 'logout',
  },
];

const Setting = (props) => {
  const dispatch = useDispatch();
  const {iduser} = useSelector((state) => {
    return {
      iduser: state.authReducer.iduser,
    };
  });

  const btLogout = async () => {
    dispatch(onLogout());
  };

  useEffect(() => {
    if (!iduser) {
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'Login',
          },
        ],
      });
      props.navigation.dispatch(resetAction);
    }
  });

  return (
    <View>
      {list.map((item, i) =>
        item.link === 'logout' ? (
          <ListItem key={i} bottomDivider onPress={() => btLogout()}>
            <Icon name="log-out" type="feather" />
            <ListItem.Content>
              <ListItem.Title style={{fontSize: 14, fontWeight: 'bold'}}>
                {item.title}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ) : (
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={{fontSize: 14, fontWeight: 'bold'}}>
                {item.title}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ),
      )}
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({});
