'use client'

import { useEffect, useState } from 'react'
import { useCookies } from '@/hooks/cookies'
import { deleteUserSession } from '@/data/login'
import Link from 'next/link'
import { toast } from 'react-toastify'

export const Header = () => {
  const [menuActive, setMenuActive] = useState<boolean>(false)
  const [mobile, setMobile] = useState<boolean>(false)
  const [mobileLoading, setMobileLoading] = useState<boolean>(true)
  const [token, setToken] = useState<string | null>(null)

  const currentToken = useCookies('session')

  useEffect(() => {
    if (currentToken) setToken(currentToken)
  }, [currentToken])

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setMobile(width < 1024)
      setMobileLoading(false)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => removeEventListener('resize', handleResize)
  }, [])

  const handleLogOutClick = () => {
    setMenuActive(false)
    deleteUserSession()
    setToken(null)
    toast.success('Deslogado com sucesso')
  }

  return (
    <header className="mx-auto max-w-1440px px-4 py-2 md:px-8 lg:px-10">
      <div className="flex items-center justify-between">
        <Link href="/">
          <h1 className="text-blue-800">
            <span className="text-3xl font-bold">M</span>
            <span className="text-xl font-bold">ultiShop</span>
          </h1>
        </Link>

        <button
          className="flex flex-col items-end gap-1 lg:hidden"
          onClick={() => setMenuActive(true)}
        >
          <div className="h-1 w-7 rounded-lg bg-black"></div>
          <div className="h-1 w-7 rounded-lg bg-black"></div>
          <div className="h-1 w-6 rounded-lg bg-black"></div>
        </button>

        <div
          className={`${menuActive ? 'fixed inset-0 z-40 bg-black opacity-90 lg:hidden' : 'hidden'}`}
        >
          <button
            className="absolute right-10 top-10 border border-white px-4 py-2 text-4xl text-white"
            onClick={() => setMenuActive(false)}
          >
            X
          </button>
        </div>

        {!mobileLoading && (
          <nav
            className={`fixed top-20 z-50 flex flex-col gap-4 text-xl font-semibold text-white lg:static lg:flex-row lg:gap-0 lg:text-base lg:text-black ${!menuActive && mobile && 'hidden'}`}
          >
            <Link
              href="/produtos"
              className="px-3 hover:text-blue-500"
              onClick={() => setMenuActive(false)}
            >
              Produtos
            </Link>

            <Link
              href="/novo-produto"
              className="px-3 hover:text-blue-500"
              onClick={() => setMenuActive(false)}
            >
              Novo produto
            </Link>

            <Link
              href="/carrinhos"
              className="px-3 hover:text-blue-500"
              onClick={() => setMenuActive(false)}
            >
              Carrinhos
            </Link>

            <Link
              href="/novo-carrinho"
              className="px-3 hover:text-blue-500"
              onClick={() => setMenuActive(false)}
            >
              Novo carrinho
            </Link>

            <Link
              href="/usuarios"
              className="px-3 hover:text-blue-500"
              onClick={() => setMenuActive(false)}
            >
              Usuários
            </Link>

            <Link
              href="/novo-usuario"
              className="px-3 hover:text-blue-500"
              onClick={() => setMenuActive(false)}
            >
              Novo usuário
            </Link>

            {token && token.length > 0 ? (
              <button
                type="button"
                className="px-3 text-start hover:text-blue-500"
                onClick={handleLogOutClick}
              >
                Deslogar
              </button>
            ) : (
              <Link
                href="/login"
                className="px-3 hover:text-blue-500"
                onClick={() => setMenuActive(false)}
              >
                Logar
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
