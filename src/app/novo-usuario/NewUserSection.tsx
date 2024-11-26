import { EditUser } from '@/components/EditUser'

export const NewUserSection = () => {
  return (
    <section>
      <h1 className="mb-10 text-center text-2xl font-semibold">Novo usuário</h1>

      <EditUser editing={false} />
    </section>
  )
}
