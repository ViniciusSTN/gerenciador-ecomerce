import { GetAllCartsType, RemoveCartType } from '@/types/carts'
import axios from 'axios'

export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }
  return new Date(dateString).toLocaleDateString('pt-BR', options)
}

export const getAllCarts: GetAllCartsType = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE}/carts`

  try {
    const result = await axios.get(url)

    return {
      success: true,
      carts: result.data,
    }
  } catch (error: unknown) {
    console.error(error)
    return {
      success: false,
    }
  }
}

export const removeCart: RemoveCartType = async (id: number) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE}/carts/${id}`

  try {
    await axios.delete(url)

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
