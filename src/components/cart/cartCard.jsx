//import liraries
import React, {Component, useContext} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {width} from '../../utils/constans';
import {AppColors} from '../../theme/colors';
import StoreContext from '../../context';
import {AddCircle, MinusCirlce} from 'iconsax-react-native';

// create a component
const CartCard = ({item}) => {
  const {addCart, removeCart} = useContext(StoreContext);
  return (
    <View style={styles.container}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={{
            uri: item.image,
          }}
          style={{
            width: width * 0.14,
            height: width * 0.14,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />
      </View>
      <View style={{flex: 4, paddingHorizontal: 8}}>
        <Text
          numberOfLines={1}
          style={{
            fontWeight: '700',
            marginVertical: 5,
            fontSize: 14,
            color: AppColors.BLACK,
          }}>
          {item.title}
        </Text>
        <Text
          style={{
            marginVertical: 5,
            fontSize: 14,
            color: AppColors.GRAY,
            textTransform: 'capitalize',
          }}>
          {item.category}
        </Text>
        <Text
          style={{
            fontWeight: '700',
            marginVertical: 5,
            fontSize: 14,
            color: AppColors.BLACK,
          }}>
          ${item.price}
        </Text>
      </View>
      <View style={styles.counter}>
        <TouchableOpacity onPress={() => removeCart(item)}>
          <MinusCirlce
            size={30}
            variant="Outline"
            color={item.amount === 1 ? '#ff0000' : AppColors.BLACK}
          />
        </TouchableOpacity>
        <Text
          style={{
            paddingHorizontal: 6,
            fontSize: 20,
            fontWeight: '500',
            marginTop: 2,
          }}>
          {item.amount}
        </Text>
        <TouchableOpacity onPress={() => addCart(item)}>
          <AddCircle size={30} variant="Bold" color={AppColors.BLACK} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
  },
  counter: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
});

//make this component available to the app
export default CartCard;
