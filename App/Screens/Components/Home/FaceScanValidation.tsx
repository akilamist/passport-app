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
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Route } from '../../../Routes/AppRoutes';
import { useNavigation } from '@react-navigation/native';
import { compareImages } from '../../../AWS/rekognition';
import LottieView from 'lottie-react-native';

const FaceScanValidation = ({ route }) => {
  const { appTheme } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { uploadedImageUri } = route.params;

  const ThirtySeconds = 30 * 1000;

  useEffect(() => {
    setLoading(true);
  
    const validatePassport = async () => {
      //TODO - Add your sample face image URL here
      const targetImageUrls = [
        'https://live.staticflickr.com/8743/16716781314_bac613cf36_z.jpg',
        'https://i.pinimg.com/736x/d8/49/3a/d8493ac925b717b4da02f545f7e99004.jpg',
        'https://media.istockphoto.com/id/502897614/photo/sri-lankan-young-teenager-near-kandy-ceylon.jpg?s=612x612&w=0&k=20&c=c7zyJ6nUf5m3z9Mk5PPtYzkYVA52kwp3gQhajnPuQI4=',
        // Add more URLs as needed
      ];
  
      // Set up a 20-second timeout
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 20000) 
      );
  
      try {
        // Use Promise.race to race between the timeout and the comparison loop
        const isMatch = await Promise.race([
          (async () => {
            for (let targetImageUrl of targetImageUrls) {
              const match = await compareImages(uploadedImageUri, targetImageUrl);
              if (match) {
                return true; // If any match is found, return true
              }
            }
            return false; // No match found after comparing all images
          })(),
          timeoutPromise
        ]);
  
        // Navigate with the result based on whether a match was found
        navigation.navigate(Route.FinalResultScreen, {
          status: isMatch,
        });
      } catch (error) {
        // If the timeout occurs first, catch the error and navigate with a default status
        console.log('Time is up! Navigating to FinalResultScreen.');
        navigation.navigate(Route.FinalResultScreen, {
          status: false,
        });
      }
    };
  
    validatePassport();
  
  }, [navigation, uploadedImageUri]);
  

  return (
    <Layout title="" padding={20}>
      <CustomText xxlarge>Face Scan in Progress</CustomText>
      <CustomText large>
        We’re validating your photo. This will only take a moment.
      </CustomText>
      <View style={{ justifyContent: 'center', marginTop: 100 }}>
        {loading && (
          <LottieView
            source={require('../../../Assets/face-scan.json')} // Path to your Lottie file
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
    alignSelf: 'center',
  },
});

export default FaceScanValidation;
