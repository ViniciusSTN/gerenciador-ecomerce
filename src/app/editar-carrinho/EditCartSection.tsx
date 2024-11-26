'use client'

import { EditCart } from '@/components/EditCart'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export const EditCartSection = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const id = searchParams.get('id')

    if (!id) {
      router.push('/carrinhos')
    }
  })

  return (
    <section>
      <h1 className="mb-10 text-center text-2xl font-semibold">
        Editar Carrinho
      </h1>

      <EditCart editing />
    </section>
  )
}
