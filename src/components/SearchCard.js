import React from 'react';
import {View, Text, Image} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import currency from 'currency-formatter';
import {Badge} from 'react-native-elements';

const SearchCard = ({data}) => {
  return (
    <View style={{width: wp(50), padding: 10}}>
      <Image
        source={{uri: data.image}}
        style={{
          height: 200,
          width: null,
          flex: 1,
          borderRadius: 10,
          paddingHorizontal: 5,
        }}
      />
      <View style={{margin: 10, height: wp(20)}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 10,
              letterSpacing: 2,
              color: 'grey',
              paddingBottom: 5,
            }}>
            {data.category}
          </Text>
          <Text>
            <Badge
              badgeStyle={{width: 70}}
              value={
                data.stock <= 0 ? (
                  <Text
                    style={{
                      fontSize: 8,
                      color: 'black',
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                    }}>
                    out of stock
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: 8,
                      color: 'white',
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                    }}>
                    Ready Stock
                  </Text>
                )
              }
              status={data.stock <= 0 ? 'error' : 'success'}
            />
          </Text>
        </View>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            paddingBottom: 5,
            letterSpacing: 1,
          }}>
          {data.product}
        </Text>
        <Text style={{fontWeight: 'bold', fontSize: 13}}>
          {currency.format(data.price, {code: 'IDR'})}
        </Text>
      </View>
    </View>
  );
};

export default SearchCard;
