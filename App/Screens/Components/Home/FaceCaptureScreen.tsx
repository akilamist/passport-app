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
import { View, Alert, Image,ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Route } from '../../../Routes/AppRoutes';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

const FaceCaptureScreen = ({route}) => {
  const { appTheme } = useContext(AppContext);
  const [isShowModal, setShowModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  let version = getVersionName();
  const alertDetails = alertData.updateVersion;
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const { passNumber } = route?.params;

  useEffect(() => {
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
        setTimeout(async () => {
          await uploadPassport();
        }, 100);
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
        setTimeout(async () => {
          await uploadPassport();
        }, 100);
      }
    });
  };

  const uploadPassport = async () => {
    if (imageUri) {
      navigation.navigate(Route.FaceScanValidation, {
        uploadedImageUri: imageUri,
      });
    } else {
    //   Alert.alert(
    //     'No Image Selected',
    //     'Please select or capture an image first.',
    //   );
    }
  };

  return (
    <Layout title={`SUCCESS`} padding={20}>
      <CustomText large>{`YOUR PASSPORT NUMBER IS -- ${passNumber ? passNumber : 'Loading...' }`}</CustomText>

      <CustomText style={{marginTop:40,textAlign:'center'}} xxlarge>{`Capture Your Face`}</CustomText>
      <CustomText large>{`Align your face within the frame and ensure good lighting for best results`}</CustomText>
      <ScrollView>
      <View style={{ justifyContent: 'center', marginTop: 20 }}>
        <ButtonComponent
          onPress={() => {
            showImagePickerOptions();
          }}
          backColor={appTheme.themeColor}
          title="Scan Face"
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
            title="Validate My Face"
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
     
    </Layout>
  );
};

export default FaceCaptureScreen;
