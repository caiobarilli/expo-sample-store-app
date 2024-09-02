import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons'
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
import React from 'react'
import {
  Alert,
  View,
  Text,
  StyleSheet,
  Platform,
  Linking,
  Dimensions,
} from 'react-native'

import { useAuth } from '@/hooks/use-auth'

const { width } = Dimensions.get('window')

interface HeaderProps {
  props?: any
}

const DrawerMenu: React.FC<HeaderProps> = ({ props }) => {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>()
  const { logout } = useAuth()

  const sendWhatsAppMessage = () => {
    const phoneNumber = '+5511988888888'
    const message = 'Olá, vim pelo App...'
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url)
        } else {
          Alert.alert(
            'WhatsApp não está instalado',
            'Você precisa ter o WhatsApp instalado para enviar a mensagem.',
          )
        }
      })
      .catch((err) => {
        console.error('Erro ao tentar abrir o WhatsApp', err)
      })
  }

  return (
    <View style={styles.drawerContainer}>
      <View style={styles.logoDrawerContainer}>

        <Text>Logo</Text>

        <PlatformPressable
          accessible
          accessibilityRole="button"
          android_ripple={{ borderless: true }}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          hitSlop={Platform.select({
            ios: undefined,
            default: { top: 16, right: 16, bottom: 16, left: 16 },
          })}
          style={styles.iconContainerDrawer}
        >
          <AntDesign name="closecircleo" size={24} color="black" />
        </PlatformPressable>
      </View>

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          labelStyle={styles.drawerItemLabel}
          label="WhatsApp"
          icon={() => <FontAwesome name="whatsapp" size={28} color="#000" />}
          onPress={() => sendWhatsAppMessage()}
        />
        <DrawerItem
          labelStyle={styles.drawerItemLabel}
          label="Youtube"
          icon={() => <AntDesign name="youtube" size={28} color="#000" />}
          onPress={() =>
            Linking.openURL('https://www.youtube.com/')
          }
        />
        <DrawerItem
          labelStyle={styles.drawerItemLabel}
          style={styles.drawerItemLogout}
          label="Sair"
          icon={() => <AntDesign name="logout" size={28} color="#000" />}
          onPress={() => logout()}
        />
      </DrawerContentScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  logoDrawerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  logoDrawer: {
    width: width * 0.4,
    height: width * 0.11,
    marginRight: 10,
  },
  iconContainerDrawer: {
    marginLeft: 10,
  },
  drawerItemLabel: {
    color: '#000000',
  },
  drawerItemLogout: {
    marginTop: 100,
  },
})

export default DrawerMenu
