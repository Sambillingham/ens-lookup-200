import {gql, useQuery} from "@apollo/client";
import { useState } from 'react';

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

    const { loading, error, data, startPolling } = useQuery(GET_REG, { 
    variables: {
        limit: 10,
        skip: page * 10,
    }
    });
    startPolling(500)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    console.log(data)
    return (
    <>
    page: {page}
    <div>
        {
            data.registrations.map(({ domain }) => (
            <ul key={domain.name} >
                <li>Name: {domain.name}</li>
            </ul>
            ))
        }
    </div>
    <div>
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