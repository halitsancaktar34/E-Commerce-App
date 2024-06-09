//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {height} from '../../utils/constans';
import {AppColors} from '../../theme/colors';
import {Button} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';
import {PRODUCTLIST} from '../../utils/routes';

// create a component
const ListEmptyComponent = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View
        style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
        <Text style={{fontSize: 16, fontWeight: '500'}}>
          You haven't added any products to your favorites yet.
        </Text>
      </View>
      <Button
        onPress={() => navigation.navigate(PRODUCTLIST)}
        style={styles.button}
        status="info">
        Go to Products Page
      </Button>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.WHITE,
    padding: 20,
  },
  button: {
    marginVertical: 20,
  },
});

//make this component available to the app
export default ListEmptyComponent;
