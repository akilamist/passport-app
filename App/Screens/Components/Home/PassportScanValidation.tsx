/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import {
  CustomText,
  Layout,
  BottomModalContainer,
  IsAlertModal,
} from '@CommonComponent';
import { ButtonComponent } from '@SubComponents';
import { compareAppVersions, getVersionName, openLink } from '@Utils/Helper';
import { useIsFocused } from '@react-navigation/native';
import { alertData, isIOS, width } from '@Utils/Constant';
import { AppContext } from '@AppContext';
import { View ,ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { Route } from '../../../Routes/AppRoutes';
import { useNavigation } from '@react-navigation/native';
import { compareImages } from '../../../AWS/rekognition';
import { extractTextFromImage } from '../../../AWS/passport';
import LottieView from 'lottie-react-native';

const PassportScanValidation = ({route}) => {
  const { appTheme } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { uploadedImageUri } = route.params;

  useEffect(() => {
    setLoading(true)
    const validatePassport = async () => {
      // Fetch predefined passport image from Firebase and convert it to bytes
      const targetImageBytes =
        'https://news.lk/media/k2/items/cache/ea7eb8e6c99a957237dae874ee82c041_XL.jpg'; /* Load predefined image from Firebase and convert */
      const userselectedImage = await extractTextFromImage(uploadedImageUri);
      const defaultDBImage = await extractTextFromImage(targetImageBytes);
      console.log('USER PASSPORT TEXT -> : ', userselectedImage);
      console.log('DEFAULT PASSPORT TEXT -> : ', defaultDBImage);

      const matches = userselectedImage.match(/N\d+/g);

      // Get the last match, which should be the passport number
      const passportNumber = matches ? matches[matches.length - 1] : null;

      if (passportNumber) {
        console.log("Passport Number:", passportNumber);
        //TODO check passport number from DB - Future implementation
        if(passportNumber == 'N8061371'){
          navigation.navigate(Route.FaceCaptureScreen, {
            passNumber: passportNumber,
          });
        }else{
          Alert.alert(
            'Passport Not Found',
            'Please re-upload a clear picture of your passport...',
            [
              {
                text: 'OK',
                onPress: () => navigation.navigate(Route.HomeScreen), 
              },
            ],
            { cancelable: false }
          );
        }
      } else {
        console.log('Passport number not found');
        Alert.alert(
          'Passport Not Found',
          'Please re-upload a clear picture of your passport...',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate(Route.HomeScreen), 
            },
          ],
          { cancelable: false }
        );
      }
    };
    validatePassport();
  }, []);

  return (
    <Layout title="" padding={20}>
      <CustomText xxlarge>Passport Verification in Progress</CustomText>
      <CustomText large>Hold tight! We’re verifying your passport information. This may take a few seconds.</CustomText>
      <View style={{justifyContent:'center',marginTop:100}}>

      {/* {loading &&  <ActivityIndicator size="100" color="#0000ff" style={styles.loader} />} */}
      {loading && (
          <LottieView
            source={require('../../../Assets/passport-animation.json')} // Path to your Lottie file
            autoPlay
            loop
            style={styles.lottie}
          />
        )}
      
        {/* <ButtonComponent
          onPress={() => {
            // setShowModal(true);
          }}
          backColor={appTheme.themeColor}
          title="Scan Passport"
          borderRadius={10}
          style={{width:300}}
        /> */}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    marginVertical: 20,
  },
  lottie: {
    width: 300, // Adjust size as needed
    height: 300,
    alignSelf:'center'
  },
});

export default PassportScanValidation;
