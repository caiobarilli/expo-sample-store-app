import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import DrawerNavigation from './DrawerNavigation';
import Loading from '@/components/Loading';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';

export default function Authenticated() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          ...AntDesign.font,
          ...Entypo.font,
          ...Ionicons.font,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return <Loading />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <DrawerNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
