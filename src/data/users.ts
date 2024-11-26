import { CreateUserType, GetAllUsersType, RemoveUserType } from '@/types/users'
import axios from 'axios'

export const getAllUsers: GetAllUsersType = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE}/users/`

  try {
    const response = await axios.get(url)

    return {
      success: true,
      users: response.data,
    }
  } catch (error: unknown) {
    console.error(error)
    return {
      success: false,
    }
  }
}

export const removeUser: RemoveUserType = async (id) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE}/users/${id}`

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

export const createUser: CreateUserType = async (user) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE}/users/`

  try {
    const userData = {
      email: user.email,
      username: user.username,
      password: user.password,
      name: {
        firstname: user.firstname,
        lastname: user.lastname,
      },
      address: {
        city: user.city,
        street: user.street,
        number: user.number,
        zipcode: user.zipcode,
        geolocation: {
          lat: user.lat,
          long: user.long,
        },
      },
      phone: user.phone,
    }

    await axios.post(url, userData)

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
