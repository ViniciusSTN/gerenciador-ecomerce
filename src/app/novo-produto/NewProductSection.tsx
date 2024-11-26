import { EditProduct } from '@/components/EditProduct'

export const NewProductSection = () => {
  return (
    <section>
      <h1 className="mb-10 text-center text-2xl font-semibold">Novo produto</h1>

      <EditProduct editing={false} />
    </section>
  )
}
