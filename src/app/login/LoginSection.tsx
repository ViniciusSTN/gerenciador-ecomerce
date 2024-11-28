'use client'

import { createUserSession, userLogin } from '@/data/login'
import { LoginDataType, LoginErrorsType } from '@/types/login'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const initialData: LoginDataType = {
  username: '',
  password: '',
}

const initialErrors: LoginErrorsType = {
  username: [],
  password: [],
}

export const LoginSection = () => {
  const [loginData, setLoginData] = useState<LoginDataType>(initialData)
  const [loginErrors, setLoginErrors] = useState<LoginErrorsType>(initialErrors)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setLoginErrors((prevState) => ({
      ...prevState,
      [name]: [],
    }))

    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const result = await userLogin(loginData)

    if (result.success) {
      createUserSession(result.data.token)
      toast.success('Logado com sucesso')

      setTimeout(() => {
        window.location.href = '/'
      }, 1500)
    } else {
      toast.warning('Usuário não encontrado')
    }
  }

  return (
    <section>
      <h1 className="mb-10 text-center text-2xl font-semibold">Login</h1>

      <form
        action=""
        className="mx-auto mb-24 flex max-w-96 flex-col gap-5"
        onSubmit={handleFormSubmit}
      >
        <label className="flex flex-col">
          <span className="font-medium">Nome do usuário</span>
          <input
            type="text"
            placeholder="Ex: João"
            className={`rounded-sm border px-2 py-1 ${loginErrors.username.length > 0 ? 'border-red' : 'border-gray-400'}`}
            onChange={handleInputChange}
            name="username"
            value={loginData.username}
          />
          {loginErrors.username.length > 0 &&
            loginErrors.username.map((error, index) => (
              <small key={index}>{error}</small>
            ))}
        </label>

        <label className="flex flex-col">
          <span className="font-medium">Senha</span>
          <input
            type="password"
            placeholder="Ex: Senha123"
            className={`rounded-sm border px-2 py-1 ${loginErrors.password.length > 0 ? 'border-red' : 'border-gray-400'}`}
            onChange={handleInputChange}
            name="password"
            value={loginData.password}
          />
          {loginErrors.password.length > 0 &&
            loginErrors.password.map((error, index) => (
              <small key={index}>{error}</small>
            ))}
        </label>

        <button
          className="rounded-md border bg-blue-950 px-4 py-2 text-lg font-semibold text-white active:border active:border-blue-950 active:outline active:outline-1"
          type="submit"
        >
          Logar
        </button>
      </form>
    </section>
  )
}
