import Login from '@Components/Login/Login';
import { AppTab } from '@Routes/AppTab';
import PassportScanValidation from '../Screens/Components/Home/PassportScanValidation';
import { AppContext } from '@AppContext';
import FaceCaptureScreen from '../Screens/Components/Home/FaceCaptureScreen';
import FaceScanValidation from '../Screens/Components/Home/FaceScanValidation';
import FinalResultScreen from '../Screens/Components/Home/FinalResultScreen';

enum Route {
  LoginScreen = 'Login',
  HomeScreen = 'Home',
  PassportScanValidation = 'PassportScanValidation',
  FaceCaptureScreen = 'FaceCaptureScreen',
  FaceScanValidation = 'FaceScanValidation',
  FinalResultScreen = 'FinalResultScreen',
}

const Routes =  (appTheme) => [
  {
    name: Route.LoginScreen,
    screen: Login,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    name: Route.HomeScreen,
    screen: AppTab,
    navigationOptions: {
      headerShown: false,
    },
  },
  {
    name: Route.PassportScanValidation,
    screen: PassportScanValidation,
    navigationOptions: {
      headerShown: true, // Show the header with the back button
      headerTitle: '', // Remove the header title
      headerBackTitleVisible: false, // Optionally hide the back title text
      headerStyle: {
        backgroundColor: appTheme.themeColor, // Set your desired header background color here
      },
    },
  },
  {
    name: Route.FaceCaptureScreen,
    screen: FaceCaptureScreen,
    navigationOptions: {
      headerShown: true, // Show the header with the back button
      headerTitle: '', // Remove the header title
      headerBackTitleVisible: false, // Optionally hide the back title text
      headerStyle: {
        backgroundColor: appTheme.themeColor, // Set your desired header background color here
      },
    },
  },
  {
    name: Route.FaceScanValidation,
    screen: FaceScanValidation,
    navigationOptions: {
      headerShown: true, // Show the header with the back button
      headerTitle: '', // Remove the header title
      headerBackTitleVisible: false, // Optionally hide the back title text
      headerStyle: {
        backgroundColor: appTheme.themeColor, // Set your desired header background color here
      },
    },
  },
  {
    name: Route.FinalResultScreen,
    screen: FinalResultScreen,
    navigationOptions: {
      headerShown: true, // Show the header with the back button
      headerTitle: '', // Remove the header title
      headerBackTitleVisible: false, // Optionally hide the back title text
      headerStyle: {
        backgroundColor: appTheme.themeColor, // Set your desired header background color here
      },
    },
  },
];

export { Routes, Route };
