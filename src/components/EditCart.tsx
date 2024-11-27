'use client'

import { createCartItem, getCart, updateCartItems } from '@/data/carts'
import { CartDataType, EditCartType } from '@/types/carts'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { SpinLoader } from './SpinLoader'

const initialData: CartDataType = {
  userId: 0,
  date: '',
  products: [],
}

export const EditCart: EditCartType = ({ editing }) => {
  const [cart, setCart] = useState<CartDataType>(initialData)
  const [loading, setLoading] = useState<boolean>(true)

  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const path = usePathname()
  const router = useRouter()

  useEffect(() => {
    const fetchCartData = async () => {
      if (id) {
        const result = await getCart(Number(id))

        if (result.success) {
          setCart(result.cart)
        } else {
          toast.error('Erro ao buscar dados do carrinho')
        }

        setLoading(false)
      }
    }

    if (editing && id) fetchCartData()
    else setLoading(false)
  }, [editing, id])

  const handleAddItem = () => {
    const id = Number(prompt('informe o id do item'))

    if (isNaN(id) || id <= 0) {
      toast.warning('Precisa ser um id válido')
      return
    }

    const quantity = Number(prompt(`Informe a quantidade de itens do id ${id}`))

    if (isNaN(quantity) || quantity <= 0) {
      toast.warning('Precisa ser uma quantidade válida')
      return
    }

    setCart((prevState) => ({
      ...prevState,
      products: [
        ...prevState.products,
        {
          productId: id,
          quantity,
        },
      ],
    }))
  }

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (cart.userId <= 0) {
      toast.warning('Informe um id de usuário válido')
      return
    }

    if (cart.products.length === 0) {
      toast.warning('Adicione ao menos um item')
      return
    }

    const currentDate = new Date()

    const formattedDate = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1,
    ).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`

    if (path === '/novo-carrinho') {
      const result = await createCartItem({ ...cart, date: formattedDate })

      if (result.success) {
        toast.success('Carrinho criado com sucesso')
        setCart(initialData)
      } else {
        toast.error('Erro ao criar carrinho')
      }
    } else if (path === '/editar-carrinho') {
      const result = await updateCartItems(Number(id), {
        ...cart,
        date: formattedDate,
      })

      if (result.success) {
        toast.success('Carrinho editado com sucesso')
        router.push('/carrinhos')
      } else {
        toast.error('Erro ao editar carrinho')
      }
    }
  }

  const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    setCart((prevState) => ({
      ...prevState,
      userId: Number(value),
    }))
  }

  const handleDeleteItem = (index: number) => {
    const newItems = cart.products.filter((_, i) => i !== index)

    setCart((prevState) => ({
      ...prevState,
      products: newItems,
    }))
  }

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <SpinLoader />
        </div>
      ) : (
        <form
          action=""
          className="mx-auto max-w-96"
          onSubmit={handleFormSubmit}
        >
          <div className="flex flex-col gap-5">
            <label className="flex flex-col">
              <span className="font-medium">Id do usuário</span>
              <input
                type="number"
                placeholder="Ex: 1"
                className="rounded-sm border border-gray-400 px-2 py-1"
                name="title"
                value={cart.userId}
                onChange={handleUserIdChange}
              />
            </label>

            {cart.products.length > 0 && (
              <ul>
                {cart.products.map((product, index) => (
                  <li key={index} className="flex justify-between">
                    <span>
                      Produto {product.productId} | {product.quantity} unidades
                    </span>

                    <button
                      className="text-red"
                      type="button"
                      onClick={() => handleDeleteItem(index)}
                    >
                      Deletar
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex justify-end">
              <button
                className="rounded-md border bg-blue-900 px-4 py-2 text-lg font-semibold text-white active:border active:border-blue-950 active:outline active:outline-1"
                type="button"
                onClick={handleAddItem}
              >
                Adicionar item
              </button>
            </div>

            <button
              className="rounded-md border bg-blue-950 px-4 py-2 text-lg font-semibold text-white active:border active:border-blue-950 active:outline active:outline-1"
              type="submit"
            >
              {editing ? 'Editar carrinho' : 'Criar novo carrinho'}
            </button>
          </div>
        </form>
      )}
    </>
  )
}
