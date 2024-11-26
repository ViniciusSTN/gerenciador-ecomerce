import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className="relative left-1/2 flex max-w-1440px -translate-x-1/2 items-center justify-between px-4 py-2 md:px-8 lg:px-10">
      <Link href="/">
        <Image
          src="/e-commerce-logo-B0AE7EE720-seeklogo.com.png"
          alt="logo"
          height={40}
          width={40}
          className="h-10 w-10"
        />
      </Link>

      <nav className="flex">
        <Link href="/produtos" className="px-4 hover:text-blue-500">
          Produtos
        </Link>

        <Link href="/novo-produto" className="px-4 hover:text-blue-500">
          Novo produto
        </Link>

        <Link href="/carrinhos" className="px-4 hover:text-blue-500">
          Carrinhos
        </Link>

        <Link href="/novo-carrinho" className="px-4 hover:text-blue-500">
          Novo carrinho
        </Link>
      </nav>
    </header>
  )
}
