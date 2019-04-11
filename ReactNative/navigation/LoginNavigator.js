import { createStackNavigator } from 'react-navigation'
import LoginScreen from '../screens/LoginScreen'

export default LoginNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      title: "Login",
      header: null,
    },
  }
})