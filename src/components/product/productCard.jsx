//import liraries
import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native';
import {width} from '../../utils/constans';
import {AppColors} from '../../theme/colors';
import {Heart, HeartAdd} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {LOGIN, PRODUCTDETAIL} from '../../utils/routes';
import Button from '../uı/button';
import StoreContext from '../../context';

// create a component
const ProductCard = ({item}) => {
  const navigation = useNavigation();
  const {addCart, addToFavorites, isLogin, removeFromFavorites} =
    useContext(StoreContext);
  const [favorite, setFavorite] = useState(false)
  const checkIsLogin = () => {
    if (isLogin) {
      if (item.favorite === true) {
        removeFromFavorites(item);
        setFavorite(false)
      } else {
        addToFavorites(item);
        setFavorite(true)
      }
    } else {
      Alert.alert('Log In.', 'You need to log in to purchase products.', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'Log In.', onPress: () => navigation.navigate(LOGIN)},
      ]);
    }
  };
  return (
    <Pressable
      onPress={() => navigation.navigate(PRODUCTDETAIL, {item: item})}
      style={styles.container}>
      <Image
        source={{
          uri: item.image,
        }}
        style={{
          width: width * 0.4,
          height: width * 0.3,
          resizeMode: 'contain',
          alignSelf: 'center',
        }}
      />
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <Text
          numberOfLines={3}
          style={{
            fontWeight: '700',
            marginVertical: 5,
            fontSize: 14,
            color: AppColors.BLACK,
          }}>
          {item.title}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 2}}>
          <Text
            style={{
              marginVertical: 5,
              fontSize: 14,
              color: AppColors.GRAY,
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
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => checkIsLogin()}>
            {favorite ? (
              <Heart size={20} color={AppColors.RED} variant="Bold" />
            ) : (
              <HeartAdd size={20} color={AppColors.BLACK} variant="Outline" />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Button onPress={() => addCart(item)} title="Sepete Ekle" />
      </View>
    </Pressable>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: width / 2,
    margin: 5,
    flex: 1,
    marginVertical: 15,
  },
});

//make this component available to the app
export default ProductCard;
