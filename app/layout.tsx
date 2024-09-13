import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css' // Assicurati che questo file esista e contenga i tuoi stili globali

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
<<<<<<< HEAD
  title: 'DuelGamble Discord Community',
  description: 'Join the DuelGamble Discord community',
};
=======
  title: 'DuelGamble Discord Invite',
  description: 'Join our vibrant Discord community at DuelGamble',
  // Aggiungi qui altri metadati se necessario
}
>>>>>>> d7cf4c371a237451c34a59705e94c9c0ed5c07f6

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
