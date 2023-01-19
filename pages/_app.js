import {ApolloProvider} from '@apollo/client';
import client from '@/apollo-client';
import { Inter } from '@next/font/google'

import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
    </>
  )
}
