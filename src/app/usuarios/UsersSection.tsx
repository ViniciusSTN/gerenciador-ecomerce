'use client'

import { SpinLoader } from '@/components/SpinLoader'
import { getAllUsers, removeUser } from '@/data/users'
import { UserTypeWithId } from '@/types/users'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const UsersSection = () => {
  const [users, setUsers] = useState<UserTypeWithId[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllUsers()

      if (response.success) {
        setUsers(response.users)
      } else {
        toast.error('Erro ao buscar dados de usuários')
      }

      setLoading(false)
    }

    fetchProducts()
  }, [])

  const handleRemoveUser = async (id: number) => {
    const result = await removeUser(id)

    if (result.success) {
      const previousUsers = [...users]
      const newUsers = previousUsers.filter((p) => p.id !== id)
      setUsers(newUsers)
      toast.success('Usuário deletado')
    } else {
      toast.error('Erro ao remover usuário')
    }
  }

  return (
    <section>
      <h1 className="mb-5 text-center text-2xl font-semibold">Usuários</h1>

      <div className="mb-5">
        <Link
          className="rounded-md border bg-blue-900 px-4 py-2 text-lg font-semibold text-white active:border active:border-blue-950 active:outline active:outline-1"
          href="/novo-usuario"
        >
          Adicionar
        </Link>
      </div>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center">
          <SpinLoader />
        </div>
      )}

      {!loading && users.length > 0 && (
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {users.map((user, index) => (
            <li
              key={index}
              className="relative rounded-md border border-slate-300 p-4 pb-20"
            >
              <h2 className="mb-2 text-center text-lg font-medium">
                {user.username}
              </h2>

              <div className="mb-3 flex flex-col gap-2">
                <p>
                  Nome: {user.name.firstname} {user.name.lastname}
                </p>
                <p>E-mail: {user.email}</p>
                <p>Contato: {user.phone}</p>
              </div>

              <div className="mb-3 flex flex-col gap-2">
                <p className="font-medium">Endereço</p>
                <p>Rua: {user.address.street}</p>
                <p>Número: {user.address.number}</p>
                <p>Cidade: {user.address.city}</p>
                <p>Cep: {user.address.zipcode}</p>
              </div>

              <div className="flex flex-col gap-2">
                <p className="font-medium">Geolocalização</p>
                <p>Latitude: {user.address.geolocation.lat}</p>
                <p>Longitude: {user.address.geolocation.long}</p>
              </div>

              <div className="absolute bottom-4 right-4 flex gap-2">
                <Link
                  className="flex w-28 justify-center rounded-md border bg-blue-900 py-2 text-lg font-semibold text-white active:border active:border-blue-950 active:outline active:outline-1"
                  href={`/editar-usuario?id=${user.id}`}
                >
                  Editar
                </Link>

                <button
                  className="w-28 rounded-md border bg-blue-900 py-2 text-lg font-semibold text-white active:border active:border-blue-950 active:outline active:outline-1"
                  onClick={() => handleRemoveUser(user.id)}
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
