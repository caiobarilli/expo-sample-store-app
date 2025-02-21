import { DrawerNavigationProp } from '@react-navigation/drawer'
import { useNavigation, ParamListBase } from '@react-navigation/native'
import * as SplashScreen from 'expo-splash-screen'
import { Formik } from 'formik'
import { useCallback, useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('E-mail')
    .email('Insira um email válido')
    .required('Por favor, insira um email registrado'),
  password: Yup.string()
    .label('Senha')
    .required('Por favor, insira sua senha')
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
  c_password: Yup.string()
    .label('Confirmar senha')
    .required('Por favor, insira sua senha')
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais'),
})

const ErrorMessage = ({ errorValue }) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorText}>{errorValue}</Text>
  </View>
)
export default function LoginScreen() {
  const [appIsReady, setAppIsReady] = useState(false)
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>()

  useEffect(() => {
    async function prepare() {
      try {
        // await new Promise((resolve) => setTimeout(resolve, 2000))
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }
    prepare()
  }, [])

  function onLoginHandler(values) {
    const { email, password } = values
    alert(`Credentials entered. email: ${email}, password: ${password}`)
  }
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.logoContainer}>
        <Text>Logo</Text>
      </View>
      <Formik
        initialValues={{ email: '', password: '', c_password: '' }}
        onSubmit={(values, actions) => {
          onLoginHandler(values)
        }}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          values,
          errors,
          touched,
          handleSubmit,
          handleBlur,
        }) => (
          <>
            <>
              <TextInput
                style={styles.input}
                numberOfLines={1}
                value={values.email}
                placeholder="E-mail"
                onChangeText={handleChange('email')}
                autoCapitalize="none"
                keyboardType="email-address"
                onBlur={handleBlur('email')}
              />
              <View
                style={{
                  display:
                    touched.password && errors.password ? 'flex' : 'none',
                  marginBottom: touched.password && errors.password ? 0 : 10,
                }}
              >
                <ErrorMessage errorValue={touched.email && errors.email} />
              </View>
            </>

            <>
              <TextInput
                style={styles.input}
                numberOfLines={1}
                value={values.password}
                placeholder="Senha"
                onChangeText={handleChange('password')}
                autoCapitalize="none"
                onBlur={handleBlur('password')}
                secureTextEntry
              />
              <View
                style={{
                  display:
                    touched.password && errors.password ? 'flex' : 'none',
                }}
              >
                <ErrorMessage
                  errorValue={touched.password && errors.password}
                />
              </View>
            </>

            <>
              <TextInput
                style={styles.input}
                numberOfLines={1}
                value={values.c_password}
                placeholder="Confirmar senha"
                onChangeText={handleChange('c_password')}
                autoCapitalize="none"
                onBlur={handleBlur('c_password')}
                secureTextEntry
              />
              <View
                style={{
                  display:
                    touched.c_password && errors.c_password ? 'flex' : 'none',
                }}
              >
                <ErrorMessage
                  errorValue={touched.c_password && errors.c_password}
                />
              </View>
            </>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonLink}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.buttonText}>REGISTRAR</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.registerWrapper}>
              <Text
                style={styles.registerText}
              >{`Já possui uma conta?   `}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.registerLink}>Faça login</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: 'red',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 75,
  },
  logoContainer: {
    marginBottom: 95,
  },
  logo: {
    width: 290,
    height: 80,
  },
  input: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    width: Dimensions.get('window').width - 100,
    height: 56,
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 10,
  },
  forgotWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    width: Dimensions.get('window').width - 100,
  },
  forgotText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#000000',
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: Dimensions.get('window').width - 210,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  buttonLink: {
    width: Dimensions.get('window').width - 210,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    color: '#000000',
  },
  registerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 35,
  },
  registerText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    color: '#000000',
  },
  registerLink: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    color: '#000000',
  },
})
