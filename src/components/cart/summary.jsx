//import liraries
import React, {useContext} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import Button from '../uı/button';
import {AppColors} from '../../theme/colors';
import StoreContext from '../../context';
import {useNavigation} from '@react-navigation/native';
import {CHECKOUT, LOGIN} from '../../utils/routes';

// create a component
const Summary = () => {
  const {isLogin} = useContext(StoreContext);
  const {cart} = useContext(StoreContext);
  const navigation = useNavigation();
  function totalPrice() {
    return cart.reduce((acc, product) => acc + (product.price * product.amount), 0).toFixed(2);
  }
  const checkOut = () => {
    if (isLogin) {
      navigation.navigate(CHECKOUT);
    } else {
      Alert.alert(
        'Log In.',
        "You need to log in to purchase products.",
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {text: 'Log In.', onPress: () => navigation.navigate(LOGIN)},
        ],
      );
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 20,
        }}>
        <Text style={{color: AppColors.GRAY}}>Total</Text>
        <Text style={{fontWeight: '700'}}>${totalPrice()}</Text>
      </View>
      <Button onPress={checkOut} title="Check Out" />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: AppColors.SOFTGRAY,
  },
});

//make this component available to the app
export default Summary;
