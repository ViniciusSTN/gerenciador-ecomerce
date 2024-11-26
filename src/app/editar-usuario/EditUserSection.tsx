'use client'

import { EditUser } from '@/components/EditUser'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export const EditUserSection = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const id = searchParams.get('id')

    if (!id) {
      router.push('/usuarios')
    }
  })

  return (
    <section>
      <h1 className="mb-10 text-center text-2xl font-semibold">
        Editar usuário
      </h1>

      <EditUser editing />
    </section>
  )
}
