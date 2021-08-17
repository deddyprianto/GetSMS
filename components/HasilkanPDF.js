/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  TouchableOpacity,
  Button,
} from 'react-native';
import RNFS from 'react-native-fs';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import SmsAndroid from 'react-native-get-sms-android';
import tw from 'tailwind-react-native-classnames';
const HasilkanPDF = () => {
  const [jumlahsms, setJumlahsms] = useState(0);
  const [listsms, setListsms] = useState([]);

  const filter = {
    box: 'inbox',
    read: 1, // 0 for unread SMS, 1 for SMS already read
    maxCount: 50, // count of SMS to return each time
  };
  useEffect(() => {
    const getData = setTimeout(() => {
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

  const generatePDF = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Izin kan membaca Document Dir Hp Anda',
        message: 'Butuh akses membaca  ke memori perangkat anda',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    const granted2 = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Izin kan membaca Document Dir Hp Anda',
        message: 'butuh akses untuk menulis ke memori perangkat anda',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    const date = new Date();
    const dateSekarang = date.toISOString().slice(0, 10).replace(/-/g, '-');

    let options = {
      html: `<html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <style>
                body {
                    font-family: calibri;
                }
                table,
                tr,
                td {
                    border: 1px solid #30BCC9;
                    border-collapse: collapse;
                }
        
                .page_break {
                    page-break-before: always;
                }
        
                .badge {
                    display: inline-block;
                    padding: 0.25em 0.4em;
                    font-size: 72%;
                    font-weight: 300;
                    line-height: 1;
                    text-align: center;
                    white-space: nowrap;
                    vertical-align: baseline;
                    border-radius: 0.25rem;
                    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
                }
        
                .badge-pill {
                    padding-right: 0.6em;
                    padding-left: 0.6em;
                    border-radius: 10rem;
                }
        
                .badge-info {
                    color: #fff;
                    background-color: #30BCC9;
                }
        
                .white {
                    border-color: #fff !important;
                }
            </style>
        </head>  
        <body>
            <div style="width: 100%; text-align: center;">
                <h1 style="background-color: #30BCC9; color: #fff; padding: 20px;">LIST DATA SMS</h1>
                <h5 style="color: #30BCC9;">Jumlah SMS ${jumlahsms}</h5>
                <hr style="border-top: 2px solid #30BCC9;">
            </div>
            <h2 style="font-weight: bold;">List SMS Karyawan <sup class="badge badge-pill badge-info"
                    style="font-weight: 300 !important;">Tanggal ${dateSekarang}</sup></h2>
            <table cellpadding="5" style="width: 100%">
                <thead>
                    <tr style="text-align: center; background-color: #30BCC9; color: #fff;">
                      
                        <td class="white">Pengirim</td>
                        <td class="white">Isi Pesan</td>
                        <td class="white">Tanggal SMS</td>
                        <td class="white">Tanggal Pengiriman</td>
                    </tr>
                </thead>
                <tbody>
                ${listsms.map(data => {
                  const dateKnow = new Date(data.date);
                  const d = dateKnow
                    .toISOString()
                    .slice(0, 10)
                    .replace(/-/g, '-');
                  const dateSent = new Date(data.date_sent);
                  const dSent = dateSent
                    .toISOString()
                    .slice(0, 10)
                    .replace(/-/g, '-');
                  return `<tr style="text-align: center">
                    <td>${data.address}</td>
                    <td>${data.body}</td>
                    <td>${d}</td>
                    <td>${dSent}</td>
                    </tr>`;
                })}
                </tbody>
            </table>
            <div style="text-align: right; margin-top: 25px; margin-right: 50px;">Medan, ${dateSekarang}</div>
            <div style="text-align: right; margin-top: 60px; margin-right: 50px;">Hormat Admin</div>
        </body>
        </html>`,
      fileName: 'getsms',
    };

    let dataFile = await RNHTMLtoPDF.convert(options);
    const sourceFilePath = dataFile.filePath;
    //  /data/user/0/com.absensipdf/cache/absensi5730333662424998520.pdf
    const fileName = 'getsms.pdf';
    let destinationFilePath = RNFS.DownloadDirectoryPath;
    // /storage/emulated/0/Download
    // error yg terjadi ketika file tidak mempunyai nama dan extensi file nya
    // Error: EISDIR: illegal operation on a directory, read '/storage/emulated/0/Download'
    destinationFilePath = `${destinationFilePath}/${fileName}`;
    if (
      granted === PermissionsAndroid.RESULTS.GRANTED &&
      granted2 === PermissionsAndroid.RESULTS.GRANTED
    ) {
      await RNFS.moveFile(sourceFilePath, destinationFilePath);
      alert('file PDF tersimpan di Folder Download ');
    } else {
      alert('Accses ke telepon Di tolak');
    }
  };

  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text style={{marginBottom: 20, color: 'gray'}}>
        Tekan Tombol Di Bawah untuk menghasilkan FIle PDF
      </Text>
      <Button title="Hasilkan File PDF" onPress={generatePDF} />
    </View>
  );
};

export default HasilkanPDF;
