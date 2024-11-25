import Link from 'next/link'

export default function Home() {
  return (
    <main className="max-w-1440px mx-auto mt-24 min-h-screen-header px-4 py-2 md:px-8 lg:px-10">
      <div className="flex flex-col items-center justify-start gap-6 text-center">
        <h1 className="text-2xl font-semibold">
          Estilo e Conforto a um Clique
        </h1>
        <p className="text-lg font-medium">
          Descubra roupas que combinam com você: qualidade, tendência e preços
          que cabem no seu bolso.
        </p>
        <Link
          href="/produtos"
          className="rounded-md border bg-blue-900 px-4 py-2 text-lg font-semibold text-white active:border active:border-blue-950 active:outline active:outline-1"
        >
          Ver produtos
        </Link>
      </div>
    </main>
  )
}
