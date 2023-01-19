import {ApolloProvider} from '@apollo/client';
import client from '@/apollo-client';
import { Inter } from '@next/font/google'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

import { WagmiConfig, createClient, configureChains, mainnet } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'

import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

const { provider, webSocketProvider } = configureChains(
  [mainnet],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API })],
)
 
const wagmiClient = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
  })

TimeAgo.addDefaultLocale(en)

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
    <ApolloProvider client={client}>
    <WagmiConfig client={wagmiClient}>
      <Component {...pageProps} />
    </WagmiConfig>
    </ApolloProvider>
    </>
  )
}
