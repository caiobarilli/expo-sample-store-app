import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'

import { clearScreenTitle } from '@/redux/ui-slice'
import Loading from '@/components/Loading'

export default function HomeScreen() {
  const [appIsReady, setAppIsReady] = useState(false)
  const dispatch = useDispatch()

  useFocusEffect(
    useCallback(() => {
      dispatch(clearScreenTitle())
    }, [dispatch]),
  )

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000))
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }
    prepare()
  }, [])

  if (!appIsReady) {
    return <Loading backgroundColor />
  }

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.text}>Home Screen</Text>
    </View>
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
