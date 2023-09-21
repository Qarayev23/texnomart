import { SingleValue } from "react-select"

export interface RootProductsProps {
  apiResponse: ProductsProps[]
  totalCount: number
}

export type ProductsProps = {
  category: string
  name: string
  brand: string
  img: string
  ram?: number
  memory?: number
  price: number
  id: number
  operationTime?: number
}

export interface CartProps extends ProductsProps {
  count: number
}

export interface ProductDetailProps extends ProductsProps {
  monthlyPayment: MonthlyPayment
}

export interface MonthlyPayment {
  [key: string]: number
}

export interface CheckboxProps {
  item: { name: string, value: string | number },
  filterProducts: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export type SideBarProps = {
  isOpen: boolean
  handleOpen: () => void
}

export interface FilterBarProps extends SideBarProps {
  limit: number, setCurrentPage:
  React.Dispatch<React.SetStateAction<number>>
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
  handleOpen?: () => void
  options: { value: string, label: string }[]
}