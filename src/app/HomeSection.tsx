'use client'

import { Loader } from '@/components/Loader'
import { getGeralData } from '@/data/geral'
import { GeralDataType } from '@/types/geral'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Link from 'next/link'

export const HomeSection = () => {
  const [data, setData] = useState<GeralDataType>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      const result = await getGeralData()

      if (result.success) {
        setData(result.geralData)
      } else {
        toast.warning('Erro ao buscar dados gerais')
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <section>
      <h1 className="mb-10 text-center text-2xl font-semibold">Visão geral</h1>

      <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-2 lg:grid-cols-3 1.5xl:grid-cols-4">
        <div className="flex flex-col gap-4 rounded-md border border-gray-400 p-10 shadow-lg">
          <p className="text-xl font-medium">Total de produtos</p>

          <div className="flex h-14 items-center justify-center">
            {loading ? (
              <div className="flex items-center justify-center">
                <Loader />
              </div>
            ) : (
              <p className="text-3xl font-semibold">{data?.totalProducts}</p>
            )}
          </div>

          <Link
            href="/produtos"
            className="rounded-md border bg-blue-600 px-4 py-2 text-lg font-semibold text-white active:border active:border-blue-950 active:outline active:outline-1"
          >
            Gerenciar produtos
          </Link>
        </div>

        <div className="flex flex-col gap-4 rounded-lg border border-gray-400 p-10 shadow-lg">
          <p className="text-xl font-medium">Total de categorias</p>

          <div className="flex h-14 items-center justify-center">
            {loading ? (
              <div className="flex items-center justify-center">
                <Loader />
              </div>
            ) : (
              <p className="text-3xl font-semibold">{data?.totalCategories}</p>
            )}
          </div>

          <Link
            href="/produtos"
            className="rounded-md border bg-blue-600 px-4 py-2 text-lg font-semibold text-white active:border active:border-blue-950 active:outline active:outline-1"
          >
            Gerenciar produtos
          </Link>
        </div>

        <div className="flex flex-col gap-4 rounded-lg border border-gray-400 p-10 shadow-lg">
          <p className="text-xl font-medium">Total de pedidos</p>

          <div className="flex h-14 items-center justify-center">
            {loading ? (
              <div className="flex items-center justify-center">
                <Loader />
              </div>
            ) : (
              <p className="text-3xl font-semibold">{data?.totalOrders}</p>
            )}
          </div>

          <Link
            href="/carrinhos"
            className="rounded-md border bg-blue-600 px-4 py-2 text-lg font-semibold text-white active:border active:border-blue-950 active:outline active:outline-1"
          >
            Gerenciar pedidos
          </Link>
        </div>

        <div className="flex flex-col gap-4 rounded-lg border border-gray-400 p-10 shadow-lg">
          <p className="text-xl font-medium">Total de usuários</p>

          <div className="flex h-14 items-center justify-center">
            {loading ? (
              <div className="flex items-center justify-center">
                <Loader />
              </div>
            ) : (
              <p className="text-3xl font-semibold">{data?.totalUsers}</p>
            )}
          </div>

          <Link
            href="/usuarios"
            className="rounded-md border bg-blue-600 px-4 py-2 text-lg font-semibold text-white active:border active:border-blue-950 active:outline active:outline-1"
          >
            Gerenciar usuários
          </Link>
        </div>
      </div>
    </section>
  )
}
