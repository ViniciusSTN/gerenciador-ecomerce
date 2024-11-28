'use client'

import { SpinLoader } from '@/components/SpinLoader'
import { formatDate, getAllCarts, removeCart } from '@/data/carts'
import { useCookies } from '@/hooks/cookies'
import { CartType } from '@/types/carts'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Link from 'next/link'

export const CartsSection = () => {
  const [carts, setCarts] = useState<CartType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const router = useRouter()
  const token = useCookies('session')

  useEffect(() => {
    const fetchCarts = async () => {
      const result = await getAllCarts()

      if (result.success) {
        setCarts(result.carts)
      } else {
        toast.error('Erro ao buscar produtos')
      }

      setLoading(false)
    }

    if (!token || token.length < 0) {
      router.push('/login')
      toast.warning('É preciso logar para acessar essa página')
    } else {
      fetchCarts()
    }
  }, [router, token])

  const handleRemoveCart = async (id: number) => {
    const result = await removeCart(id)

    if (result.success) {
      const previousCarts = [...carts]
      const newCarts = previousCarts.filter((c) => c.id !== id)
      setCarts(newCarts)
      toast.success('Carrinho deletado')
    } else {
      toast.error('Erro ao remover carrinho')
    }
  }

  return (
    <section>
      <h1 className="mb-10 text-center text-2xl font-semibold">
        Carrinhos de compras
      </h1>

      <div className="mb-5">
        <Link
          className="rounded-md border bg-blue-900 px-4 py-2 text-lg font-semibold text-white active:border active:border-blue-950 active:outline active:outline-1"
          href="/novo-carrinho"
        >
          Adicionar
        </Link>
      </div>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center">
          <SpinLoader />
        </div>
      )}

      {!loading && carts.length > 0 && (
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {carts.map((cart, index) => (
            <li
              key={index}
              className="relative rounded-md border border-slate-300 p-4"
            >
              <div className="flex flex-col gap-5">
                <div>
                  <p>Comprado em {formatDate(cart.date)}</p>
                  <p>Usuário {cart.userId}</p>
                </div>

                <div>
                  <p className="font-medium">Produtos</p>
                  {cart.products.length > 0 &&
                    cart.products.map((product, index) => (
                      <div key={index} className="flex">
                        <span>
                          Produto {product.productId} - {product.quantity}{' '}
                          unidades
                        </span>
                      </div>
                    ))}
                </div>

                <div className="flex justify-end gap-2">
                  <Link
                    className="flex w-28 justify-center rounded-md border bg-blue-900 py-2 text-lg font-semibold text-white active:border active:border-blue-950 active:outline active:outline-1"
                    href={`/editar-carrinho?id=${cart.id}`}
                  >
                    Editar
                  </Link>

                  <button
                    className="w-28 rounded-md border bg-blue-900 py-2 text-lg font-semibold text-white active:border active:border-blue-950 active:outline active:outline-1"
                    onClick={() => handleRemoveCart(cart.id)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
