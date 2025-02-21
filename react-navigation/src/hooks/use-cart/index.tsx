import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useContext, useEffect, useState } from 'react'

import {
  CartContextProps,
  CartProductProps,
  CartProviderProps,
} from '@/lib/types/cart'

const CART_KEY = 'CartProducts'

const CartContext = createContext<CartContextProps>({} as CartContextProps)

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartProductProps[]>([])

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const storedCartItemsJson = await AsyncStorage.getItem(CART_KEY)
        if (storedCartItemsJson) {
          setCartItems(JSON.parse(storedCartItemsJson))
        }
      } catch (error) {
        console.error('Failed to load cart items from AsyncStorage:', error)
      }
    }

    loadCartItems()
  }, [])

  const addToCart = async (item: CartProductProps) => {
    const onCart = isInCart(item.id)
    if (onCart) return

    const newCartItems = [...cartItems, item]
    setCartItems(newCartItems)
    try {
      await AsyncStorage.setItem(CART_KEY, JSON.stringify(newCartItems))
    } catch (error) {
      console.error('Failed to save cart items to AsyncStorage:', error)
    }
  }

  const removeFromCart = async (id: number) => {
    const newCartItems = cartItems.filter((item) => item.id !== id)
    setCartItems(newCartItems)
    try {
      await AsyncStorage.setItem(CART_KEY, JSON.stringify(newCartItems))
    } catch (error) {
      console.error('Failed to save cart items to AsyncStorage:', error)
    }
  }

  const isInCart = (id: number) => cartItems.some((item) => item.id === id)

  const getItemQuantity = (id: number) => {
    const item = cartItems.find((item) => item.id === id)
    return item ? item.quantity : 0
  }

  const updateProductQuantity = async (id: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id)
      return
    }

    const cartItem = cartItems.find((item) => item.id === id)

    if (cartItem && quantity > cartItem.quantity) {
      return
    }

    if (cartItem) {
      const updatedItem = {
        ...cartItem,
        quantity,
      }

      const newCartItems = cartItems.map((item) =>
        item.id === id ? updatedItem : item,
      )

      setCartItems(newCartItems)
      try {
        await AsyncStorage.setItem(CART_KEY, JSON.stringify(newCartItems))
      } catch (error) {
        console.error('Failed to save cart items to AsyncStorage:', error)
      }
    }
  }

  const calculateSubtotal = (products: CartProductProps[]) =>
    products.reduce((acc, product) => {
      const total = acc + product.price * product.quantity
      return Number(total.toFixed(2))
    }, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        isInCart,
        getItemQuantity,
        updateProductQuantity,
        calculateSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

const useCart = () => useContext(CartContext)

export { CartContext, useCart }
