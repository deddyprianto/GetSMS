/* eslint-disable prettier/prettier */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text, View, StatusBar} from 'react-native';
import tw from 'tailwind-react-native-classnames';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 3000);
  }, [navigation]);

  return (
    <View style={tw`flex flex-1 justify-center items-center bg-red-400`}>
      <StatusBar backgroundColor="#F87171" />
      <Text style={tw`text-xl text-gray-700`}>
        Welcome Screen GetSMS Karyawan
      </Text>
    </View>
  );
};

export default SplashScreen;
