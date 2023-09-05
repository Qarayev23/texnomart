export interface RootProductsProps {
  apiResponse: ProductsProps[],
  totalCount: number,
}

export interface ProductsProps {
  name: string
  brand: string
  img: string
  ram: number
  memory: number
  price: number
  id: number
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

export interface ProductDetailProps {
  name: string
  brand: string
  img: string
  ram: number
  memory: number
  price: number
  id: number
  monthlyPayment: MonthlyPayment
}

export interface MonthlyPayment {
  [key: string]: number
}
