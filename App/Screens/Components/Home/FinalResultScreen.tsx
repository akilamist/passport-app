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
import {
  View,
  ActivityIndicator,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { Route } from '../../../Routes/AppRoutes';
import { useNavigation } from '@react-navigation/native';
import { BleManager } from 'react-native-ble-plx'; //Arduino bluetooth package

const FinalResultScreen = ({ route }) => {
  const { appTheme } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { status } = route.params;
  const [verification, setVerification] = useState(false);

  const manager = new BleManager();

  // useEffect(() => {
  //   setLoading(true);
  //   console.log('route?.params?.status', route?.params?.status);
  //   console.log('status: ', status);

  //   status == true ? setVerification('PASSED') : setVerification('FAILED');
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  // }, []);

  useEffect(() => {
    setLoading(true);
    const result = status ? 'PASSED' : 'FAILED';
    setVerification(result);

    // Request Bluetooth permissions on Android
    const requestBluetoothPermissions = async () => {
      if (Platform.OS === 'android' && Platform.Version >= 23) {
        try {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ]);

          if (
            granted['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
            granted['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED &&
            granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
          ) {
            console.log('Bluetooth permissions granted');
            return true;
          } else {
            console.log('Bluetooth permissions denied');
            Alert.alert('Permissions Required', 'Bluetooth permissions are required to connect to Arduino.');
            return false;
          }
        } catch (err) {
          console.warn(err);
          return false;
        }
      }
      return true;
    };

    // Function to connect to Arduino and send the verification status
    const connectToArduino = async () => {
      console.log('connectToArduino: STARTED...');
      try {
        const device = await manager.startDeviceScan(
          null,
          null,
          (error, device) => {
            if (error) {
              console.log('Error in Bluetooth scan:', error);
              return;
            }
            if (device && device.name === 'Your_Arduino_Device_Name') { //TODO - Add Arduino Device name here
              manager.stopDeviceScan();
              device
                .connect()
                .then(connectedDevice => connectedDevice.discoverAllServicesAndCharacteristics())
                .then(connectedDevice => {
                  const command = result === 'PASSED' ? 'GREEN' : 'RED';
                  sendCommandToArduino(connectedDevice, command);
                });
            }else{
              console.log('connectToArduino: DEVICE NAME NOT FOUND...');
            }
          },
        );
      } catch (error) {
        console.log('Bluetooth connection error:', error);
      }
    };

    // Function to send a command to the Arduino
    const sendCommandToArduino = async (device, command) => {
      try {
        const serviceUUID = 'YOUR_SERVICE_UUID'; //TODO - Add Arduino service UUID here
        const characteristicUUID = 'YOUR_CHARACTERISTIC_UUID'; //TODO - Add Arduino Characteristics UUID here
        const data = command === 'GREEN' ? '1' : '0'; // 1 for green, 0 for red light

        await device.writeCharacteristicWithResponseForService(
          serviceUUID,
          characteristicUUID,
          Buffer.from(data).toString('base64'),
        );
      } catch (error) {
        console.log('Error sending command to Arduino:', error);
      }
    };

    // Initialize the connection
    const initializeConnection = async () => {
      const permissionsGranted = await requestBluetoothPermissions();
      if (permissionsGranted) {
        connectToArduino();
      }
    };

    initializeConnection();

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
