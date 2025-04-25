export interface CartItem {
  id: number
  title: string
  price: number
  thumbnail: string
  quantity: number
  addedAt: number
}

export interface CartItemInput {
  id: number
  title: string
  price: number
  thumbnail: string
} 