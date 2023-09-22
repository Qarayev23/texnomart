import { SingleValue } from "react-select"

export interface FilterItemsProps {
  brand: string
  memory?: string
  ram?: string
  operationTime?: string
  screenPermission: string
  screenSize: string
  [key: string]: any
}

export type ProductsProps = {
  category: string
  name: string
  brand: string
  img: string
  price: number
  id: number
  memory?: string
  ram?: string
  operationTime?: string
  filterItems: FilterItemsProps
}

export interface RootProductsProps {
  apiResponse: ProductsProps[]
  totalCount: number
}

export interface GetFilterItemsProps {
  filterItems: Array<[string, string[]]>
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
  item: string | number
  name: string
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

export interface InfoProps {
  title: string
  description: string
  img: string
}