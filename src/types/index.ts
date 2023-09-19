import { SingleValue } from "react-select"

export interface RootProductsProps {
  apiResponse: ProductsProps[],
  totalCount: number,
}

export interface ProductsProps {
  name: string
  brand: string
  img: string
  ram?: number
  memory?: number
  price: number
  id: number
  operationTime?: number
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
  ram?: number
  memory?: number
  price: number
  id: number
  monthlyPayment: MonthlyPayment
  operationTime?: number
}

export interface MonthlyPayment {
  [key: string]: number
}

export interface CheckboxProps {
  item: { name: string, value: string | number },
  filterProducts: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface SideBarProps {
  limit: number, setCurrentPage:
  React.Dispatch<React.SetStateAction<number>>
  openSidebar: boolean
  handleSidebar: () => void
}

export interface PaginationProps {
  changePage: (selected: number) => void
  productCount: number
  currentPage: number
  limit: number
}

export interface ProductsComponentProps {
  products: ProductsProps[]
  productCount: number
  currentPage: number
  limit: number
  value: SingleValue<{ value: string; label: string; }>
  handleOnChange: (newValue: SingleValue<{ value: string; label: string; }>) => void
  handleSidebar?: () => void
  options: { value: string, label: string }[]
}