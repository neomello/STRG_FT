import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Stronger Fitness - Centro de Treinamento de Alta Performance',
  description: 'O MAIOR Centro de Treinamento de Alta Performance do Estado de Goiás!',
  keywords: ['academia', 'treinamento', 'alta performance', 'Goiás', 'fitness'],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Stronger Fitness - Centro de Treinamento de Alta Performance',
    description: 'O MAIOR Centro de Treinamento de Alta Performance do Estado de Goiás!',
    url: 'https://seusite.com.br',
    siteName: 'Stronger Fitness',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Stronger Fitness - Centro de Treinamento de Alta Performance',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-black">
        {children}
      </body>
    </html>
  )
} 