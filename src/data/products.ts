import {
  CreateProductType,
  EditProductData,
  GetAllProductsType,
} from '@/types/products'
import axios from 'axios'

export const getAllProducts: GetAllProductsType = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE}/products/`

  try {
    const response = await axios.get(url)

    return {
      success: true,
      products: response.data,
    }
  } catch (error: unknown) {
    console.error(error)
    return {
      success: false,
    }
  }
}

export const createProduct: CreateProductType = async (
  product: EditProductData,
) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE}/products/`

  try {
    await axios.post(url, {
      ...product,
    })

    return {
      success: true,
    }
  } catch (error: unknown) {
    console.error(error)
    return {
      success: false,
    }
  }
}
