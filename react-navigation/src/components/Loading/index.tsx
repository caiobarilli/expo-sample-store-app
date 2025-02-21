import React from 'react'
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native'

interface LoadingProps {
  backgroundColor?: boolean
}

const Loading: React.FC<LoadingProps> = ({ backgroundColor = true }) => {
  const { height, width } = Dimensions.get('window') // Obtendo as dimensões da tela

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor ? '#fff' : '#f2f2f2',
          width,
          height,
        },
      ]}
    >
      <ActivityIndicator size="large" color="#000" />
      <Text style={styles.text}>Carregando...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: '#000',
  },
})

export default Loading
