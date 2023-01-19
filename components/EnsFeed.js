import {gql, useQuery} from "@apollo/client";
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton'

import styles from '@/styles/EnsFeed.module.css'
import 'react-loading-skeleton/dist/skeleton.css'

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

function GetENS() {
    const [page, setPage] = useState(0);

    let { loading, error, data, startPolling } = useQuery(GET_REG, { 
    variables: {
        limit: 10,
        skip: page * 10,
    }
    });
    startPolling(5000)

    if (error) return <p>Error : {error.message}</p>;

    console.log(data)

    if (loading) return (    <div>
        <h2>Live Data Feed</h2>
        {
            [...Array(5)].map((x, i) => (
            <ul key={i} className={styles.feedItem}>
                <Skeleton count={5} />
            </ul>
            ))
        }
    </div> )

    return (
    <>
    <div>
        <h2>Live Data Feed</h2>
        
        {
            data.registrations.map(({ domain }) => (
            <ul key={domain.name} className={styles.feedItem}>
                <li>Name: {domain.name}</li>
                <li>Registrant: {data.registrations[0].registrant?.id} </li>
                <li>Assigned Addr: {data.registrations[0].domain.resolvedAddress?.id}</li>
                <li>Registration: {data.registrations[0].registrationDate}</li>
                <li>Expiry: {data.registrations[0].expiryDate}</li>
            </ul>
            ))
        }

    </div>
    <div>
        page: {page}
        <button onClick={() => setPage(prev => prev - 1)}>Prev</button>
        <button onClick={() => setPage(prev => prev + 1)}>Next</button>
    </div>
    </>
    )
}

const EnsFeed = () => {
    return (
        <GetENS />
    )
}

export default EnsFeed;