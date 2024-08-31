import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { getHeaderTitle } from '@react-navigation/elements'
import { NavigationContainer } from '@react-navigation/native'
import * as Font from 'expo-font'
import { useEffect, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'

import Nav from '@/components/Nav'
import { CogIcon } from '@/lib/utils/icons'
import { RootState } from '@/redux/store'
import AboutScreen from '@/screens/About'
import CartScreen from '@/screens/Cart'
import ChatScreen from '@/screens/Chat'
import ConfigScreen from '@/screens/Config'
import HomeScreen from '@/screens/Home'
import OrdersScreen from '@/screens/Orders'
import ProfileScreen from '@/screens/Profile'

const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ff0062',
        tabBarInactiveTintColor: '#707477',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="pluscircle" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="cart" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="chat" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Config"
        component={ConfigScreen}
        options={{
          tabBarIcon: ({ color }) => <CogIcon color={color} size={28} />,
        }}
      />
    </Tab.Navigator>
  )
}

export default function Authenticated() {
  const [appIsReady, setAppIsReady] = useState(false)
  const title = useSelector((state: RootState) => state.ui.screenTitle)

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(AntDesign.font)
        await Font.loadAsync(Entypo.font)
        await Font.loadAsync(Ionicons.font)
        // await new Promise((resolve) => setTimeout(resolve, 2000))
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  if (!appIsReady) {
    return null
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <Nav type="menu" props={props} />}
          screenOptions={{
            drawerPosition: 'left',
            headerTintColor: 'black',
            drawerActiveTintColor: '#ff0062',
            drawerInactiveTintColor: '#707477',
            headerLeft: () => null,
          }}
        >
          <Drawer.Screen
            name="BottomTabs"
            component={BottomTabs}
            options={{
              title,
              drawerLabel: 'Inicio',
              drawerIcon: ({ color }) => (
                <Ionicons name="home" size={28} color={color} />
              ),

              header: (props) => (
                <Nav type="header" tabName={title} props={props} />
              ),
            }}
          />
          <Drawer.Screen
            name="Minha Conta"
            component={ProfileScreen}
            options={{
              headerTitle: 'Minha Conta',
              drawerLabel: 'Minha Conta',
              drawerIcon: ({ color }) => (
                <Ionicons name="person" size={28} color={color} />
              ),
              header: ({ route, options }) => (
                <Nav
                  type="back"
                  drawerTitle={getHeaderTitle(options, route.name)}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Meus Pedidos"
            component={OrdersScreen}
            options={{
              headerTitle: 'Meus Pedidos',
              drawerLabel: 'Meus Pedidos',
              drawerIcon: ({ color }) => (
                <AntDesign name="profile" size={28} color={color} />
              ),
              header: ({ route, options }) => (
                <Nav
                  type="back"
                  drawerTitle={getHeaderTitle(options, route.name)}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Sobre"
            component={AboutScreen}
            options={{
              headerTitle: 'Sobre',
              drawerLabel: 'Sobre',
              drawerIcon: ({ color }) => (
                <AntDesign name="contacts" size={28} color={color} />
              ),
              header: ({ route, options }) => (
                <Nav
                  type="back"
                  drawerTitle={getHeaderTitle(options, route.name)}
                />
              ),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
