export interface ProductsProps {
  name: string
  brand: string
  img: string
  ram: number
  memory: number
  price: number
  id: number
}

export interface RootCartProps {
  cart: CartProps[]
}

export interface CartProps {
  brand: string,
  count: number,
  id: number,
  img: string,
  memory: number,
  name: string,
  price: number,
  ram: number,
}