//import liraries
import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {screenStyle} from '../../styles/screenStyle';
import {height, width} from '../../utils/constans';
import {AppColors} from '../../theme/colors';
import Button from '../../components/uı/button';
import {getRequest} from '../../service/verbs';
import {PRODUCTS_URL} from '../../service/urls';
import Spinner from '../../components/uı/spinner';
import {Heart, HeartAdd, Star} from 'iconsax-react-native';
import StoreContext from '../../context';
import {LOGIN} from '../../utils/routes';

// create a component
const ProductDetail = ({route, navigation}) => {
  const [product, setProduct] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const {addCart, addToFavorites, isLogin} = useContext(StoreContext);
  const {item} = route?.params;
  const checkIsLogin = () => {
    if (isLogin) {
      addToFavorites(item);
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
  const getProductDetail = () => {
    setLoading(true);
    getRequest(PRODUCTS_URL + `/${item.id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getProductDetail();
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.WHITE}}>
      {isLoading ? (
        <Spinner />
      ) : (
        <View style={screenStyle.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Image
                source={{
                  uri: product?.image,
                }}
                style={{
                  width: width,
                  height: width * 0.55,
                  resizeMode: 'contain',
                }}
              />

              <View>
                <View style={{flex: 1, marginVertical: 20}}>
                  <Text
                    numberOfLines={2}
                    style={{fontWeight: '700', fontSize: 20}}>
                    {product?.title}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    paddingHorizontal: 5,
                  }}>
                  <View>
                    <Text
                      numberOfLines={2}
                      style={{
                        fontWeight: '500',
                        fontSize: 14,
                        marginVertical: 20,
                        color: AppColors.GRAY,
                      }}>
                      {product?.category.toUpperCase()}
                    </Text>
                    <Text
                      numberOfLines={2}
                      style={{
                        fontWeight: '700',
                        fontSize: 20,
                        marginVertical: 5,
                      }}>
                      ${product?.price}
                    </Text>
                  </View>

                  <View>
                    <View
                      style={{
                        marginTop: 14,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Star
                        color={AppColors.PRIMARY}
                        variant="Bold"
                        size={25}
                      />
                      <Text
                        style={{
                          fontWeight: '700',
                          fontSize: 18,
                          marginHorizontal: 5,
                        }}>
                        {product?.rating?.rate} / {product?.rating?.count}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => checkIsLogin()}
                      style={{
                        backgroundColor: AppColors.SOFTGRAY,
                        padding: 5,
                        marginEnd: 10,
                        marginTop: 13,
                        borderRadius: 1000,
                        alignSelf: 'flex-end',
                      }}>
                      {item.favorite ? (
                        <Heart size={28} color={AppColors.RED} variant="Bold" />
                      ) : (
                        <HeartAdd
                          size={28}
                          color={AppColors.BLACK}
                          variant="Outline"
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View>
                {product?.description.split('.').map((instruction, index) => {
                  return (
                    <Text key={instruction} style={{marginVertical: 7}}>
                      {instruction}
                    </Text>
                  );
                })}
              </View>
            </View>
          </ScrollView>
        </View>
      )}

      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 15,
          backgroundColor: AppColors.WHITE,
          flexDirection: 'row',
          borderTopWidth: 1,
          borderColor: AppColors.SOFTGRAY,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{flex: 2, justifyContent: 'center'}}>
          <Button onPress={() => addCart(item)} title={'Sepete Ekle'} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;
