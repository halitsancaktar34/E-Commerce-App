//import liraries
import React, {useContext} from 'react';
import {View, Text, ScrollView} from 'react-native';
import StoreContext from '../../context';
import UserInfo from '../../components/profile/userInfo';
import ProfileMenu from '../../components/profile/profileMenu';
import {screenStyle} from '../../styles/screenStyle';
import {Button} from '@ui-kitten/components';
import {LOGIN} from '../../utils/routes';

// create a component
const Profile = ({navigation}) => {
  const {isLogin, setIslogin} = useContext(StoreContext);
  return (
    <View style={screenStyle.container}>
      {isLogin ? (
        <ScrollView>
          <UserInfo />
          <ProfileMenu />
          <Button
            size="large"
            onPress={() => setIslogin(false)}
            style={{marginVertical: 10}}
            status="danger">
            Log out
          </Button>
        </ScrollView>
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 16, fontWeight: '500'}}>
            Please log in to see user information.
            </Text>
          </View>
          <Button
            size="large"
            onPress={() => navigation.navigate(LOGIN)}
            style={{marginVertical: 10, marginBottom: 35,}}
            status="info">
            Log in
          </Button>
        </View>
      )}
    </View>
  );
};
export default Profile;
