import { EditCart } from '@/components/EditCart'

export const NewCartSection = () => {
  return (
    <section>
      <h1 className="mb-10 text-center text-2xl font-semibold">
        Novo Carrinho
      </h1>

      <EditCart editing={false} />
    </section>
  )
}
