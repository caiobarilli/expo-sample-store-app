import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'

import { CogIcon } from '@/lib/utils/icons'
import CartScreen from '@/screens/Cart'
import ChatScreen from '@/screens/Chat'
import ConfigScreen from '@/screens/Config'
import HomeScreen from '@/screens/Home'
import OrdersScreen from '@/screens/Orders'

const Tab = createBottomTabNavigator()

const BottomTabs = () => (
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

export default BottomTabs
