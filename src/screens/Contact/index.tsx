import { View, Text, StyleSheet } from 'react-native'

export default function ContactScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.text}>Contact Screen</Text>
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
