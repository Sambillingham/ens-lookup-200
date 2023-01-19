import Head from 'next/head'
import Image from 'next/image'

import Search from '@/components/Search'
import EnsFeed from '@/components/EnsFeed'
import BackgroundStripes from '@/components/BackgroundStripes'

import styles from '@/styles/Home.module.css'


export default function Home() {
  return (
    <>
      <Head>
        <title>ENS LOOKUP 200</title>
        <meta name="description" content="Premium Grade ENS DATA" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
        <Image
                src="/logo.svg"
                alt="logo Logo"
                width={30}
                height={30}
                priority
              />
          <span>ENS</span> Lookup 200.</h1>
        <Search/>
        <EnsFeed/>
        <BackgroundStripes/>
      </main>
    </>
  )
}
