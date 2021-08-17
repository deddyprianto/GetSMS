/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useLayoutEffect} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderStyle from './HeaderStyle/HeaderStyle';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeNav from './HomeNav';
import HasilkanPDF from './HasilkanPDF';

const Home = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      header: ({route}) => {
        return <HeaderStyle title={route.name} />;
      },
    });
  }, [navigation]);
  const Tab = createMaterialBottomTabNavigator();
  // style={{marginTop: 20}} #F87171
  return (
    <Tab.Navigator barStyle={{backgroundColor: '#F87171'}}>
      <Tab.Screen
        name="HomeNav"
        component={HomeNav}
        options={{
          tabBarLabel: 'Rumah',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color="white" size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="HasilkanPDF"
        component={HasilkanPDF}
        options={{
          tabBarLabel: 'Hasilkan File PDF',
          tabBarIcon: ({color, size}) => (
            <Icon name="file-pdf-o" color="white" size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
