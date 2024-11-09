import Login from '@Components/Login/Login';
import { AppTab } from '@Routes/AppTab';
import PassportScanValidation from '../Screens/Components/Home/PassportScanValidation';

enum Route {
  LoginScreen = 'Login',
  HomeScreen = 'Home',
  PassportScanValidation = 'PassportScanValidation',
}

const Routes = [
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
    },
  },
];

export { Routes, Route };
