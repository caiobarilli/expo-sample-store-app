import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import Nav from '@/components/Nav'
import ForgotScreen from '@/screens/Forgot'
import LoginScreen from '@/screens/Login'
import RegisterScreen from '@/screens/Register'

export default function Auth() {
  const Stack = createNativeStackNavigator()
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ header: () => null }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              header: () => <Nav type="back-no-title" />,
            }}
          />
          <Stack.Screen
            name="Forgot"
            component={ForgotScreen}
            options={{
              header: () => <Nav type="back-no-title" />,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
