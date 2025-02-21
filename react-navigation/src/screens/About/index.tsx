import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'

import { setScreenTitle } from '@/redux/ui-slice'

export default function AboutScreen() {
  const dispatch = useDispatch()

  useFocusEffect(
    useCallback(() => {
      dispatch(setScreenTitle('About'))
    }, [dispatch]),
  )

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.text}>About Screen</Text>
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
