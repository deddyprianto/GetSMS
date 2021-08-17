/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {stateValueProvider} from '../StateProvider';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
import SmsAndroid from 'react-native-get-sms-android';
import {CONTACT, LOADING} from '../reducer/reduce';
import {ListItem} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
const HomeNav = () => {
  const navigation = useNavigation();
  const [{id, loading}, dispatch] = stateValueProvider();
  const [jumlahsms, setJumlahsms] = useState(0);
  const [listsms, setListsms] = useState([]);

  const filter = {
    box: 'inbox',
    read: 1, // 0 for unread SMS, 1 for SMS already read
    maxCount: 50, // count of SMS to return each time
  };
  useEffect(() => {
    const getData = setTimeout(() => {
      dispatch({type: LOADING, payload: false});
      SmsAndroid.list(
        JSON.stringify(filter),
        fail => {
          console.log('your fail', fail);
        },
        (count, smsList) => {
          setJumlahsms(count);
          const arr = JSON.parse(smsList);
          setListsms(arr);
        },
      );
    }, 2000);
    return () => {
      clearTimeout(getData);
    };
  }, [filter]);

  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <StatusBar backgroundColor="#F87171" />
      {loading ? (
        <Text style={tw`text-gray-500`}>'Loading....'</Text>
      ) : (
        <View style={tw`w-4/5 justify-center items-center h-4/5`}>
          <ScrollView>
            <Text style={tw`text-lg text-gray-500`}>
              Jumlah SMS yg sudah di baca: {jumlahsms}
            </Text>
            {listsms.map(datasms => (
              <TouchableOpacity
                key={datasms._id}
                onPress={() => {
                  dispatch({
                    type: CONTACT,
                    payload: datasms?._id,
                  });
                  navigation.navigate('DetailContact');
                }}>
                <ListItem
                  containerStyle={tw`h-20`}
                  key={datasms._id}
                  bottomDivider>
                  <Icon name="user-circle" size={30} color="#008000" />
                  <ListItem.Content>
                    <ListItem.Title>{datasms.address}</ListItem.Title>
                    <ListItem.Subtitle>{datasms.body}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default HomeNav;
