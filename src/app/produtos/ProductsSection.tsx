'use client'

import { getAllProducts } from '@/data/products'
import { ProductType } from '@/types/products'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export const ProductsSection = () => {
  const [products, setProducts] = useState<ProductType[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts()

      if (response.success) {
        console.log(response.products)
        setProducts(response.products)
      }
    }

    fetchProducts()
  }, [])

  return (
    <section className="mb-10">
      <h1 className="mb-5 text-center text-2xl font-semibold">Produtos</h1>

      <div className="mb-5">
        <Link
          className="rounded-md border bg-blue-900 px-4 py-2 text-lg font-semibold text-white active:border active:border-blue-950 active:outline active:outline-1"
          href="/novo-produto"
        >
          Adicionar
        </Link>
      </div>

      {products.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {products.map((product, index) => (
            <div
              key={index}
              className="relative rounded-md border border-slate-300 p-4 pb-20"
            >
              <div className="mb-10 flex flex-col gap-2">
                <h2 className="text-center text-lg font-medium">
                  {product.title}
                </h2>
                <p>Categoria: {product.category}</p>
                <p>Preço: R${product.price}</p>
                <p>Avaliações: {product.rating.count}</p>
                <p>Estrelas: {product.rating.rate}</p>
              </div>

              <div className="relative left-1/2 mb-5 flex w-full max-w-52 -translate-x-1/2 items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt="produto"
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <Link
                className="absolute bottom-4 right-4 rounded-md border bg-blue-900 px-4 py-2 text-lg font-semibold text-white active:border active:border-blue-950 active:outline active:outline-1"
                href={`/editar-produto/${product.id}`}
              >
                Editar
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}