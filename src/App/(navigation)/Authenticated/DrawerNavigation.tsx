import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Nav from '@/components/Nav';
import { getHeaderTitle } from '@react-navigation/elements';
import BottomTabs from './BottomTabs';
import ProfileScreen from '@/screens/Profile';
import OrdersScreen from '@/screens/Orders';
import AboutScreen from '@/screens/About';
import { RootState } from '@/redux/store';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const title = useSelector((state: RootState) => state.ui.screenTitle);

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
  );
};

export default DrawerNavigation;
