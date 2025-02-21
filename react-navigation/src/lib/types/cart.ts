export interface CartContextProps {
  cartItems: CartProductProps[]
  addToCart: (item: CartProductProps) => void
  removeFromCart: (id: number) => void
  isInCart: (id: number) => boolean
  calculateSubtotal: (products: CartProductProps[]) => number
  getItemQuantity: (id: number) => number
  updateProductQuantity: (id: number, quantity: number) => void
}

export interface CartProductProps {
  id: number
  title: string
  price: number
  image: string
  quantity: number
}

export interface CartProviderProps {
  children: React.ReactNode
}
