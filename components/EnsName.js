
import { useEnsName } from 'wagmi'

import styles from '@/styles/EnsName.module.css'

const loadingString = () => {
    const options = ['█████████', '███████████', '██████', '███████████']
    const r = parseInt( Math.random() *10000 ) % options.length;
    return options[r]
}

const EnsName = ({addr}) => {
    const { data, isError, isLoading } = useEnsName({
        address: addr,
        chainId: 1,
        cacheTime: 60_000,
      })

    if(isLoading) return ( <span className={styles.isLoading}>{loadingString()}</span> )
    if(isError) return ( <span>{addr}</span> )

    return (
        <span>{data || addr}</span>
    )
}

export default EnsName;