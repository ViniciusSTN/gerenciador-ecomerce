import { ErrorResponse, SuccessResponse } from './apiResponse'

export type ProductType = {
  id: number
  title: string
  category: string
  description: string
  image: string
  price: number
  rating: {
    count: number
    rate: number
  }
}

export type SuccessResponseWithProduct = SuccessResponse & {
  products: ProductType[]
}

export type GetAllProductsType = () => Promise<
  ErrorResponse | SuccessResponseWithProduct
>

export type EditProductProps = {
  editing: boolean
}

export type EditProductType = (props: EditProductProps) => JSX.Element

export type EditProductData = {
  title: string
  price: number
  description: string
  image: string
  category: string
}

export type EditProductDataErrors = {
  title: string[]
  price: string[]
  description: string[]
  image: string[]
  category: string[]
}

export type CreateProductType = (
  product: EditProductData,
) => Promise<SuccessResponse | ErrorResponse>