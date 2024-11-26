import { ErrorResponse, SuccessResponse } from './apiResponse'

export type ProductCartType = {
  productId: number
  quantity: number
}

export type CartType = {
  id: number
  userId: number
  date: string
  products: ProductCartType[]
}

export type SuccessResponseWithAllCartsType = SuccessResponse & {
  carts: CartType[]
}

export type GetAllCartsType = () => Promise<
  ErrorResponse | SuccessResponseWithAllCartsType
>

export type RemoveCartType = (
  id: number,
) => Promise<ErrorResponse | SuccessResponse>
