import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css' // Assicurati che questo file esista e contenga i tuoi stili globali

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DuelGamble Discord Invite',
  description: 'Join our vibrant Discord community at DuelGamble',
  // Aggiungi qui altri metadati se necessario
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Se avevi un div con una classe specifica, puoi aggiungerlo qui */}
        <div className="tua-classe-specifica">
          {children}
        </div>
      </body>
    </html>
  )
}
