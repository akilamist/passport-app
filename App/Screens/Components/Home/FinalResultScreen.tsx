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

const FinalResultScreen = ({ route }) => {
  const { appTheme } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { status } = route.params;
  const [verification, setVerification] = useState(false);

  useEffect(() => {
    setLoading(true);
    console.log('route?.params?.status', route?.params?.status);
    console.log('status: ', status);
    // setTimeout(() => {
    //   navigation.navigate(Route.FinalResultScreen);
    // }, 3000);
    status == true ? setVerification('PASSED') : setVerification('FAILED');
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Layout title="" padding={20}>
      <CustomText xxlarge>FINAL SCREEN - CONNECT ARDUINO HERE</CustomText>
      <View style={{ justifyContent: 'center', marginTop: 300 }}>
        {loading ? (
          <CustomText xxlarge>Loading...</CustomText>
        ) : (
          <CustomText xxlarge>STATUS - {verification}</CustomText>
        )}

        <ButtonComponent
          onPress={() => {
            navigation.navigate(Route.HomeScreen);
          }}
          backColor={appTheme.themeColor}
          title="DONE"
          borderRadius={10}
          style={{ width: 300, marginTop: 20 }}
          r
        />
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
});

export default FinalResultScreen;
