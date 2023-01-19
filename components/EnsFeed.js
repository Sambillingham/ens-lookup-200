import {gql, useQuery} from "@apollo/client";
import { useState } from 'react';

import styles from '@/styles/EnsFeed.module.css'
import ReactTimeAgo from 'react-time-ago'

import EnsName from '@/components/EnsName'

const GET_REG = gql`
query GetDomains($limit: Int!, $skip: Int!) {
  registrations(first: $limit, orderBy: registrationDate, skip: $skip,  orderDirection: desc) {
    domain {
      name
      resolvedAddress {
        id
      }
    }
    expiryDate
    registrationDate
    registrant {
      id
    }
  }
}
`;

const GetENS = () => {
    const [page, setPage] = useState(1);

    let { loading, error, data, startPolling } = useQuery(GET_REG, { 
    variables: {
        limit: 4,
        skip: page * 4,
    }
    });
    startPolling(5000)

    if (error) return <p>Error : {error.message}</p>;

    if (loading) return (
    <div className={styles.ensFeed}>
        <h2>Live Data Feed</h2>
        <div className={styles.ensFeedList}>
        {
            [...Array(4)].map((x, i) => (
            <div key={i} className={styles.feedItem}>
                <h4 className={styles.itemTitle}><span className={styles.isLoading}>█████████</span> &middot; <span className={styles.isLoading}>█████████</span></h4>
                <ul className={styles.domainDetails}>
                    <li>Registrant: <span className={styles.isLoading}>███████████</span></li>
                    <li>Assigned Addr: <span className={styles.isLoading}>██████████████████████████████</span></li>
                    <li>Expiry Date: <span className={styles.isLoading}>███████████</span></li>
                </ul>
            </div>
            ))
        }
        </div>
        <div>
            <button className={styles.paginationButton} onClick={() => setPage(prev => prev + 1)}>Prev ►</button>
        </div>
    </div> )

    return (
    <div className={styles.ensFeed}>

        <h2>Data Stream</h2>
        <div className={styles.ensFeedList}>
            
        { 
            data.registrations.map(({ domain, registrant, registrationDate, expiryDate }) => (
            <div key={domain.name} className={styles.feedItem}>
                <h4 className={styles.itemTitle}>&middot; <span><ReactTimeAgo date={registrationDate*1000} locale="en-US"/></span> &middot; <span>{domain.name}</span> &middot;</h4>
                <ul className={styles.domainDetails}>
                    <li>Registrant: <EnsName addr={registrant?.id} /></li>
                    <li>Assigned Addr: {domain.resolvedAddress?.id}</li>
                    <li>Expiry Date: {new Date(expiryDate*1000).toUTCString()}</li>
                </ul>
            </div>
            ))
        }
        </div>
        <div>
            <button className={styles.paginationButton} onClick={() => setPage(prev => prev + 1)}>Prev ►</button>
            { page > 1 && ( <button className={styles.paginationButton} onClick={() => setPage(prev => prev - 1)}>◄ Next</button>) } 
            { page > 1 && (<span className={styles.pagecount} >{page}</span>) } 
        </div>
    </div>
    )
}

const EnsFeed = () => {
    return (
        <GetENS />
    )
}

export default EnsFeed;