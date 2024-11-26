'use client'

import { EditProduct } from '@/components/EditProduct'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export const EditProductSection = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const id = searchParams.get('id')

    if (!id) {
      router.push('/produtos')
    }
  })

  return (
    <section>
      <h1 className="mb-10 text-center text-2xl font-semibold">Novo produto</h1>

      <EditProduct editing />
    </section>
  )
}
