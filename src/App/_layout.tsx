import 'react-native-gesture-handler'
import 'react-native-reanimated'

import { registerRootComponent } from 'expo'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react'

import Auth from '@/App/(navigation)/Auth'
import Authenticated from '@/App/(navigation)/Authenticated'
import AuthContextProvider, { useAuth } from '@/hooks/use-auth'
import ReduxProvider from '@/redux/provider'

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ReduxProvider>
    <AuthContextProvider>{children}</AuthContextProvider>
  </ReduxProvider>
)

function Navigation() {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? <Authenticated /> : <Auth />
}

function App() {
  const [appIsReady, setAppIsReady] = useState(false)

  const [loaded, error] = useFonts({
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
  })

  useEffect(() => {
    async function prepare() {
      try {
        if (loaded || error) {
          SplashScreen.hideAsync()
        }
        await new Promise((resolve) => setTimeout(resolve, 2000))
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [loaded, error])

  if (!appIsReady && !loaded && !error) {
    return null
  }

  return (
    <Providers>
      <Navigation />
    </Providers>
  )
}

registerRootComponent(App)
