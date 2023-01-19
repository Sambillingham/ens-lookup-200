import Head from 'next/head'

import Search from '@/components/Search'
import EnsFeed from '@/components/EnsFeed'
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
        <Search/>
        <EnsFeed/>
      </main>
    </>
  )
}
