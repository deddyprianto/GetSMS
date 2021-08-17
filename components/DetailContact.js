/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, StatusBar} from 'react-native';
import HeaderStyle from './HeaderStyle/HeaderStyle';
import tw from 'tailwind-react-native-classnames';
import {stateValueProvider} from '../StateProvider';
import SmsAndroid from 'react-native-get-sms-android';
import {Card} from 'react-native-elements';

const DetailContact = () => {
  const [{id}, dispatch] = stateValueProvider();
  const navigation = useNavigation();
  const [datadetail, setDataDetail] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      header: ({route}) => {
        return <HeaderStyle title={route.name} />;
      },
    });
  }, [navigation]);
  const filter = {
    _id: id,
  };
  useEffect(() => {
    SmsAndroid.list(
      JSON.stringify(filter),
      fail => {
        console.log('your fail', fail);
      },
      (count, smsList) => {
        const arr = JSON.parse(smsList);
        setDataDetail(arr);
      },
    );
  }, []);
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <StatusBar backgroundColor="#F87171" />
      <Text style={tw`text-2xl text-gray-400`}>
        Badan Detail Keseluruhan SMS
      </Text>
      <Card containerStyle={tw`w-4/5`}>
        <Card.Title>Detail SMS</Card.Title>
        <Card.Divider />
        {datadetail.map(data => {
          // untuk tanggal hari ini
          const date = new Date(data.date);
          const d = date.toISOString().slice(0, 10).replace(/-/g, '-');
          // untuk tanggal pengiriman
          const dateSent = new Date(data.date_sent);
          const dSent = dateSent.toISOString().slice(0, 10).replace(/-/g, '-');
          return (
            <View key={data._id}>
              <Text>Pengirim: {data.address}</Text>
              <Text>Isi Pesan: {data.body}</Text>
              <Text>Tanggal: {d}</Text>
              <Text>Tanggal kirim: {dSent}</Text>
            </View>
          );
        })}
      </Card>
    </View>
  );
};

export default DetailContact;
