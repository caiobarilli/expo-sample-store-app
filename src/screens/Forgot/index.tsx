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
export default function ForgotScreen() {
  const [appIsReady, setAppIsReady] = useState(false)

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
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Resetar senha</Text>
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

            <ErrorMessage errorValue={touched.email && errors.email} />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonLink}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.buttonText}>ENVIAR</Text>
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
  titleContainer: {
    marginBottom: 35,
  },
  titleText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 34,
  },
  input: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    width: Dimensions.get('window').width - 100,
    height: 56,
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    borderWidth: 1,
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
    color: '#ffffff',
  },
})
