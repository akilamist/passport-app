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
import { View } from 'react-native';

const PassportScanValidation = () => {
  const { appTheme } = useContext(AppContext);


  useEffect(() => {
    
  }, []);

  return (
    <Layout title="" padding={20}>
      <CustomText xxxlarge>Please Wait... Passport Verification Started ....</CustomText>
      <View style={{justifyContent:'center',marginTop:300}}>
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

export default PassportScanValidation;
