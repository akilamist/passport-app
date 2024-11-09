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
      // Predefined passport image URL
      const targetImageBytes = 'https://live.staticflickr.com/8743/16716781314_bac613cf36_z.jpg';
  
      // Set up a 20-second timeout
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 10000) 
      );
  
      try {
        // Use Promise.race to race between compareImages and the timeout
        const isMatch = await Promise.race([
          compareImages(uploadedImageUri, targetImageBytes),
          timeoutPromise
        ]);
  
        // If compareImages resolves before the timeout, navigate with the result
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
