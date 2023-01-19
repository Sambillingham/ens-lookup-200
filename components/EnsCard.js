import React from 'react';
import EnsName from '@/components/EnsName'

import styles from '@/styles/Search.module.css'

const EnsCard = ({query, searchField}) => {
    const { loading, data: rawData, result, error } = query;
    const NoResult = rawData?.registrations.length === 0;

    if (error) return (
        <div className={`${styles.searchData} ${styles.searchDataError}`}>
            <p>...Error Fetching Data</p>
            <p>{error}</p>
        </div>
    )

    if (loading) return (
        <div className={styles.searchData}>
            <p>...Fetching Data From The Graph</p>
        </div>
    )

    if (NoResult)  return (
        <div className={`${styles.searchData} ${styles.searchDataWarning}`}>
            <p>No data found For ENS Domain: {searchField}.eth</p>
        </div>
    )

    if (!result || searchField == '') return (null)

    return (
        <>
        <h3>Data Card</h3>
            <div className={styles.searchData}>
            <ul className={styles.searchResult}>
                <li>
                    <h5>Name:</h5>
                    <span>{result.domain.name}</span>
                </li>
                <li>
                    <h5>Registration Date:</h5>
                    <span>{new Date(result.expiryDate*1000).toUTCString()}</span>
                </li>
                <li>
                    <h5>Registrant:</h5>
                    <EnsName addr={result.registrant?.id}/></li>
                <li>
                    <h5>Assigned Address:</h5>
                    {result.domain.resolvedAddress?.id}
                </li>
                <li>
                    <h5>Expiry Date:</h5>
                    {new Date(result.expiryDate*1000).toUTCString()}
                </li>
            </ul>
        </div>
        </>
    )
}

export default EnsCard;