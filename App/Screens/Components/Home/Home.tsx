/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import {
  CustomText,
  Layout,
  BottomModalContainer,
  IsAlertModal,
} from '@CommonComponent';
import { ButtonComponent } from '@SubComponents';
import { compareAppVersions, getVersionName, goToNextScreen, openLink } from '@Utils/Helper';
import { useIsFocused } from '@react-navigation/native';
import { alertData, isIOS, width } from '@Utils/Constant';
import { AppContext } from '@AppContext';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Route } from '../../../Routes/AppRoutes';

const Home = () => {
  const { appTheme } = useContext(AppContext);
  const [isShowModal, setShowModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  let version = getVersionName();
  const alertDetails = alertData.updateVersion;
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    if (isFocused) {
      checkMinimumVersion();
    }
  }, [isFocused]);

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
    <Layout title="MY PASSPORT SCAN" padding={20}>
      <CustomText large>Click Scan to Get Started</CustomText>
      <View style={{justifyContent:'center',marginTop:300}}>
        <ButtonComponent
          onPress={() => {
            navigation.navigate(Route.PassportScanValidation)
          }}
          backColor={appTheme.themeColor}
          title="Scan Passport"
          borderRadius={10}
          style={{width:300}}r
        />
      </View>
      <BottomModalContainer
        title="Modal"
        onClose={() => setShowModal(false)}
        show={isShowModal}>
        <CustomText large>Modal</CustomText>
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

export default Home;
