import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Divider} from 'react-native-elements';
import {useSelector} from 'react-redux';

const DetailProfile = () => {
  const {fullName, username, email} = useSelector(({authReducer}) => {
    return {
      fullName: authReducer.fullName,
      username: authReducer.username,
      email: authReducer.email,
    };
  });
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Full Name</Text>
        <Text>{fullName}</Text>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.wrapper}>
        <Text style={styles.title}>Username</Text>
        <Text>{username}</Text>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.wrapper}>
        <Text style={styles.title}>Email</Text>
        <Text>{email}</Text>
      </View>
      <Divider style={styles.divider} />
    </View>
  );
};

export default DetailProfile;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 25,
    marginVertical: 25,
  },
  wrapper: {
    marginBottom: 0,
  },
  divider: {
    marginVertical: 10,
  },
  title: {
    fontSize: 12,
    color: 'grey',
  },
});
