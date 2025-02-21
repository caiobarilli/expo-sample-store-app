import { Ionicons, AntDesign, FontAwesome5 } from '@expo/vector-icons'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { getHeaderTitle } from '@react-navigation/elements'
import React from 'react'
import { useSelector } from 'react-redux'

import BottomTabs from './BottomTabs'

import Nav from '@/components/Nav'
import { RootState } from '@/redux/store'
import AboutScreen from '@/screens/About'
import ProfileScreen from '@/screens/Profile'

const Drawer = createDrawerNavigator()

const DrawerNavigation = () => {
  const title = useSelector((state: RootState) => state.ui.screenTitle)

  return (
    <Drawer.Navigator
      drawerContent={(props) => <Nav type="menu" props={props} />}
      screenOptions={{
        drawerPosition: 'left',
        headerTintColor: 'black',
        drawerActiveTintColor: '#ff0062',
        drawerInactiveTintColor: '#000',
        headerLeft: () => null,
      }}
    >
      <Drawer.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{
          title,
          drawerLabel: 'Store',
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="store" size={24} color="black" />
          ),
          header: (props) => (
            <Nav type="header" tabName={title} props={props} />
          ),
        }}
      />
      <Drawer.Screen
        name="Account"
        component={ProfileScreen}
        options={{
          headerTitle: 'Account',
          drawerLabel: 'Account',
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
        name="About"
        component={AboutScreen}
        options={{
          headerTitle: 'About',
          drawerLabel: 'About',
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
  )
}

export default DrawerNavigation
