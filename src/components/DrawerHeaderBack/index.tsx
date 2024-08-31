import { AntDesign } from '@expo/vector-icons'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

interface HeaderProps {
  drawerTitle?: string
}

const DrawerHeaderBack: React.FC<HeaderProps> = ({ drawerTitle }) => {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>()

  return (
    <View style={styles.backContainer}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <AntDesign name="left" size={42} color="black" />

        {drawerTitle !== '' && (
          <Text style={styles.backText}>{drawerTitle}</Text>
        )}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  backContainer: {
    backgroundColor: '#F7C910',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    width: '100%',
    minHeight: 80,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: 18,
    marginLeft: 10,
  },
})

export default DrawerHeaderBack
