import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Header, Icon, SearchBar} from 'react-native-elements';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {clearSearch, getSearch} from '../actions';
import SearchCard from '../components/SearchCard';
import {CommonActions} from '@react-navigation/native';
import {
  Modal,
  ModalContent,
  SlideAnimation,
  ModalFooter,
  ModalButton,
  BottomModal,
} from 'react-native-modals';
import {TagSelect} from 'react-native-tag-select';

const Search = (props) => {
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const {searchResult, isLoading} = useSelector(({productReducer}) => {
    return {
      searchResult: productReducer.searchProducts,
      isLoading: productReducer.isLoading,
    };
  });

  const dispatch = useDispatch();

  const data = [
    {id: 1, label: 'Price'},
    {id: 2, label: 'Stock'},
  ];

  const handleBack = () => {
    dispatch(clearSearch());
    props.navigation.goBack('Home');
  };

  return (
    <View style={styles.container}>
      <Header
        containerStyle={styles.headerContainer}
        leftComponent={
          <TouchableWithoutFeedback onPress={handleBack}>
            <Icon type="feather" name="arrow-left" />
          </TouchableWithoutFeedback>
        }
        centerComponent={
          <SearchBar
            inputContainerStyle={styles.searchInput}
            inputStyle={styles.seacrhInputText}
            placeholder="Search"
            containerStyle={styles.searchContainer}
            cancelIcon={<Icon name="cancel" type="feather" size={20} />}
            value={search}
            onChangeText={(value) => setSearch(value)}
            onSubmitEditing={() => dispatch(getSearch(search))}
            returnKeyType="search"
          />
        }
      />
      {isLoading && (
        <View style={{marginVertical: 25}}>
          <TouchableWithoutFeedback
            onPress={() => setModalVisible(!modalVisible)}>
            <View style={styles.wrapper}>
              <Text>Filter</Text>
            </View>
          </TouchableWithoutFeedback>

          <ScrollView>
            <View style={styles.containerList}>
              {searchResult.map((item, index) => (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() =>
                    props.navigation.navigate('ProductDetail', {
                      prodDetail: item,
                    })
                  }>
                  <View>
                    <SearchCard data={item} />
                  </View>
                </TouchableWithoutFeedback>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
      <View style={styles.centeredView}>
        <BottomModal
          width={wp(100)}
          height={0.4}
          visible={modalVisible}
          swipeDirection={['up', 'down']}
          swipeThreshold={100}
          onSwipeOut={(event) => {
            setModalVisible(false);
          }}
          modalAnimation={
            new SlideAnimation({
              initialValue: 0,
              slideFrom: 'bottom',
              useNativeDriver: true,
            })
          }>
          <ModalContent>
            <View>
              <Text style={styles.title}>Sort By</Text>
              <View style={styles.contentWrapper}>
                <View
                  style={
                    isSelected ? styles.sortWrapper : styles.sortWrapperSelected
                  }>
                  <Text
                    style={styles.sortTitle}
                    onPress={() => setIsSelected(true)}>
                    Harga Tertinggi
                  </Text>
                </View>
                <View
                  onPress={() => console.log('a')}
                  style={
                    isSelected ? styles.sortWrapper : styles.sortWrapperSelected
                  }>
                  <Text style={styles.sortTitle}>Harga Tertinggi</Text>
                </View>
                <View
                  onPress={() => console.log('a')}
                  style={
                    isSelected ? styles.sortWrapper : styles.sortWrapperSelected
                  }>
                  <Text style={styles.sortTitle}>Stock Terbanyak</Text>
                </View>
                <View
                  onPress={() => console.log('a')}
                  style={
                    isSelected ? styles.sortWrapper : styles.sortWrapperSelected
                  }>
                  <Text style={styles.sortTitle}>Stock Terendah</Text>
                </View>
              </View>
              <View>
                <Text style={styles.title}>Filter</Text>
                <TagSelect
                  data={data}
                  itemStyle={styles.item}
                  itemLabelStyle={styles.label}
                  itemStyleSelected={styles.itemSelected}
                  itemLabelStyleSelected={styles.labelSelected}
                  ref={(tag) => {
                    return (tag = tag);
                  }}
                  max={3}
                />
              </View>
            </View>
          </ModalContent>
          <ModalFooter>
            <Button
              title="Tampilkan"
              containerStyle={styles.buttonFilter}
              titleStyle={styles.buttonTitle}
            />
          </ModalFooter>
        </BottomModal>
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  containerList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  headerContainer: {
    backgroundColor: 'transparent',
    elevation: 3,
  },
  searchInput: {
    backgroundColor: '#F8F8F8',
    borderWidth: 0,
    height: wp(9),
  },
  seacrhInputText: {
    fontSize: 14,
    letterSpacing: 1,
  },
  searchContainer: {
    width: wp(80),
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  wrapper: {
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 10,
    width: 100,
    paddingHorizontal: 5,
    paddingVertical: 3,
    alignItems: 'center',
    marginBottom: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
  },
  sortWrapper: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 5,
    width: wp(25),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DCDCDC',
    marginVertical: 5,
    marginHorizontal: 5,
  },
  sortWrapperSelected: {
    backgroundColor: '#ADFF2F',
    paddingVertical: 5,
    paddingHorizontal: 5,
    width: wp(25),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'green',
    marginVertical: 5,
    marginHorizontal: 5,
    color: 'white',
  },
  sortTitle: {
    fontSize: 10,
    textAlign: 'center',
    color: 'grey',
  },
  contentWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  title: {
    marginLeft: 5,
    marginVertical: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 5,
    width: wp(25),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DCDCDC',
    marginVertical: 5,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 10,
    textAlign: 'center',
    color: 'grey',
  },
  itemSelected: {
    backgroundColor: '#333',
  },
  labelSelected: {
    color: '#FFF',
  },
  buttonFilter: {
    flex: 1,
    marginHorizontal: wp('10%'),
    borderRadius: 10,
  },
  buttonTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
