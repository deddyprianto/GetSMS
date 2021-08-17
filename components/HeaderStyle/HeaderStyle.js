/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
const Header = ({title}) => {
  return (
    <View style={tw`h-36 bg-red-400 rounded-b-3xl relative`}>
      <View
        style={[
          tw`w-3/4 h-12 rounded-lg shadow-lg bg-white flex-row justify-center items-center absolute`,
          {left: '15%', bottom: '-15%'},
        ]}>
        <Text style={tw`text-sm text-gray-600 font-bold`}>
          {title === 'Home' ? 'Data' : 'Halaman Detail SMS'}
        </Text>
        <Icon name="check" size={10} color="#008000" />
      </View>
    </View>
  );
};

export default Header;
