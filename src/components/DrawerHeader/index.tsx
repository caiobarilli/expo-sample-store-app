import { Entypo } from '@expo/vector-icons'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { PlatformPressable } from '@react-navigation/elements'
import {
  DrawerActions,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native'
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native'

const { width } = Dimensions.get('window')

interface HeaderProps {
  tabName?: string
}

const DrawerHeader: React.FC<HeaderProps> = ({ tabName }) => {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>()

  return (
    <View style={styles.headerContainer}>
      <PlatformPressable
        accessible
        accessibilityRole="button"
        android_ripple={{ borderless: true }}
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        hitSlop={Platform.select({
          ios: undefined,
          default: { top: 16, right: 16, bottom: 16, left: 16 },
        })}
        style={styles.iconContainer}
      >
        <Entypo name="menu" size={42} color="black" />
      </PlatformPressable>

      <View style={styles.wrapperHeaderContent}>
        {!tabName ? (
          <Text>Logo</Text>
        ) : (
          <Text style={styles.headerText}>{tabName}</Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    marginLeft: 10,
    position: 'absolute',
  },
  headerContainer: {
    backgroundColor: '#F7C910',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    minHeight: 80,
    width: '100%',
  },
  wrapperHeaderContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.6,
    height: 58,
    resizeMode: 'contain',
  },
  headerText: {
    color: 'black',
    fontSize: 20,
  },
})

export default DrawerHeader
