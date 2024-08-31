import { useFocusEffect } from '@react-navigation/native'
import Constants from 'expo-constants'
import { useCallback } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useDispatch } from 'react-redux'

import { setScreenTitle } from '@/redux/ui-slice'

export default function ConfigScreen() {
  const dispatch = useDispatch()

  useFocusEffect(
    useCallback(() => {
      dispatch(setScreenTitle('Config'))
    }, [dispatch]),
  )
  return (
    <ScrollView>
      <View style={styles.screenContainer}>
        <Text>Chave de API: {Constants?.expoConfig?.extra?.apiKey}</Text>
        <Text>
          Plataforma: {Constants.platform.android ? 'Android' : 'iOS'}
        </Text>
        <Text>Dispositivo: {Constants.deviceName}</Text>
        <Text>sessionId: {Constants.sessionId}</Text>
        <Text>statusBarHeight: {Constants.statusBarHeight}</Text>
        <Text>systemFonts: {Constants.systemFonts}</Text>
        <Text>platform: {JSON.stringify(Constants.platform)}</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
})
