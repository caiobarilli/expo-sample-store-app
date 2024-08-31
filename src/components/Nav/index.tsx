import { AntDesign, Entypo } from '@expo/vector-icons'
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  DrawerNavigationProp,
} from '@react-navigation/drawer'
import { PlatformPressable } from '@react-navigation/elements'
import {
  DrawerActions,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native'

import { useAuth } from '@/hooks/use-auth'

interface HeaderProps {
  type?: 'menu' | 'header' | 'back'
  stack?: boolean
  tabName?: string
  drawerTitle?: string
  props?: any
}

const Nav: React.FC<HeaderProps> = ({
  type,
  stack,
  tabName,
  drawerTitle,
  props,
}) => {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>()
  const { logout } = useAuth()

  if (type === 'menu') {
    return (
      <View style={styles.drawerContainer}>
        <View style={styles.logoContainer}>
          <PlatformPressable
            accessible
            accessibilityRole="button"
            android_ripple={{ borderless: true }}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            hitSlop={Platform.select({
              ios: undefined,
              default: { top: 16, right: 16, bottom: 16, left: 16 },
            })}
          >
            <Entypo name="menu" size={42} color="black" />
          </PlatformPressable>
        </View>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem
            labelStyle={{ color: '#FFFFFF' }}
            style={{ marginTop: 100 }}
            label="Sair"
            icon={() => <AntDesign name="logout" size={28} color="#FFFFFF" />}
            onPress={() => logout()}
          />
        </DrawerContentScrollView>
      </View>
    )
  }

  if (type === 'header') {
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
        >
          <Entypo name="menu" size={42} color="black" />

          {!tabName ? (
            <Text>Logo</Text>
          ) : (
            <Text style={{ color: 'black', fontSize: 20 }}>{tabName}</Text>
          )}
        </PlatformPressable>
      </View>
    )
  }

  if (stack) {
    return (
      <View style={styles.backContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={42} color="black" />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.backContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign name="left" size={42} color="black" />
        <Text>{drawerTitle}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  drawerHeaderWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 10,
    marginVertical: 10,
  },
  logo: {
    width: 210,
    height: 58,
  },
  headerContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  backContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
})

export default Nav
