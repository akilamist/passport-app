/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import {
  CustomText,
  Layout,
  BottomModalContainer,
  IsAlertModal,
} from '@CommonComponent';
import { ButtonComponent } from '@SubComponents';
import {
  compareAppVersions,
  getVersionName,
  goToNextScreen,
  openLink,
} from '@Utils/Helper';
import { useIsFocused } from '@react-navigation/native';
import { alertData, isIOS, width } from '@Utils/Constant';
import { AppContext } from '@AppContext';
import {
  View,
  Alert,
  Image,
  ScrollView,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Route } from '../../../Routes/AppRoutes';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

const Home = () => {
  const { appTheme } = useContext(AppContext);
  const [isShowModal, setShowModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  let version = getVersionName();
  const alertDetails = alertData.updateVersion;
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    if (isFocused) {
      checkMinimumVersion();
    }
    setImageUri(null);
  }, [isFocused]);

  const showImagePickerOptions = () => {
    Alert.alert(
      'Select Image',
      'Choose an option',
      [
        {
          text: 'Choose from Library',
          onPress: pickImage,
        },
        {
          text: 'Capture Photo',
          onPress: captureImage,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
  };

  const pickImage = async () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (
        !response.didCancel &&
        response.assets &&
        response.assets.length > 0
      ) {
        setImageUri(response.assets[0].uri);
        // setTimeout(async () => {
        //   await uploadPassport();
        // }, 100);
      }
    });
  };

  const captureImage = async () => {
    launchCamera({ mediaType: 'photo' }, response => {
      if (
        !response.didCancel &&
        response.assets &&
        response.assets.length > 0
      ) {
        setImageUri(response.assets[0].uri);
        // setTimeout(async () => {
        //   await uploadPassport();
        // }, 100);
      }
    });
  };

  const uploadPassport = async () => {
    if (imageUri) {
      navigation.navigate(Route.PassportScanValidation, {
        uploadedImageUri: imageUri,
      });
    } else {
      Alert.alert(
        'No Image Selected',
        'Please select or capture an image first.',
      );
    }
  };

  const checkMinimumVersion = async () => {
    try {
      let shouldUpdate = compareAppVersions({
        version,
        minimumVersion: 'v1.0.0', // Wrap whole try block in if condition with apiConfig.serviceConfig and pass minimumVersion from api response
      });
      if (shouldUpdate) {
        setIsUpdate(true);
        return;
      }
      return;
    } catch (e: any) {
      console.log(e);
    }
  };

  const updateApp = async () => {
    try {
      if (isIOS) {
        await openLink('');
      } else {
        await openLink('');
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <Layout title="VANGUARD SECURITY AGENCY" padding={20}>
      <Image
        source={require('../../../Assets/logo.jpeg')}
        style={{ width: 100, height: 100, alignSelf: 'center' }}
        resizeMode="stretch"
      />
      <CustomText style={{ textAlign: 'center' }} xxlarge>
        Scan your passport
      </CustomText>
      <CustomText style={{ textAlign: 'center' }} large>
        Align your passport within the frame and ensure it's well-lit for a
        clear scan
      </CustomText>
      <ScrollView>
        <View style={{ justifyContent: 'center', marginTop: 10 }}>
          <ButtonComponent
            onPress={() => {
              showImagePickerOptions();
            }}
            backColor={appTheme.themeColor}
            title="Scan Passport"
            borderRadius={10}
            style={{ width: 300 }}
            r
          />
          {imageUri && (
            <Image
              source={{ uri: imageUri }}
              style={{
                width: 400,
                height: 300,
                alignSelf: 'center',
                marginTop: 50,
              }}
              resizeMode="stretch"
            />
          )}
          {imageUri && (
            <ButtonComponent
              onPress={() => {
                uploadPassport();
              }}
              backColor={appTheme.themeColor}
              title="Validate My Passport"
              borderRadius={10}
              style={{ width: 300 }}
              r
            />
          )}
        </View>
      </ScrollView>
      <BottomModalContainer
        title="Modal"
        onClose={() => setShowModal(false)}
        show={isShowModal}>
        {/* <CustomText large>Modal</CustomText> */}
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={{ width: 200, height: 200 }}
          />
        )}
      </BottomModalContainer>
      <IsAlertModal
        visible={isUpdate}
        data={alertDetails}
        onClose={() => null}
        rightBtn={{
          title: 'Update',
          onPress: updateApp,
          style: {
            borderColor: appTheme.themeColor,
            backgroundColor: appTheme.themeColor,
            borderRadius: 0,
            marginVertical: 0,
            width: width * 0.8,
            marginHorizontal: width * 0.05,
          },
          textColor: appTheme.tint,
        }}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Optional: 'cover' to cover entire screen
  },
  layout: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: translucent overlay for readability
  },
  scannedImage: {
    width: 400,
    height: 300,
    alignSelf: 'center',
    marginTop: 100,
  },
});

export default Home;
