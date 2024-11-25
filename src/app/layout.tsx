import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import RecoilContextProvider from '@/lib/recoilContextProvider'
import { ToastContainer } from 'react-toastify'
import './globals.css'
import 'react-toastify/ReactToastify.min.css'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gerenciador Ecomerce',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link
          rel="icon"
          href="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/logo-2.svg?alt=media&token=e631c314-ed21-4534-af6c-53ef41630d9b"
        />
      </head>
      <body className={montserrat.className}>
        <RecoilContextProvider>
          <ToastContainer />
          {children}
        </RecoilContextProvider>
      </body>
    </html>
  )
}
