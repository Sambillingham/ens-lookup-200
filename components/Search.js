import React, { useRef, useState, useEffect} from 'react';
import { gql, useLazyQuery} from '@apollo/client';
import styles from '@/styles/Search.module.css'


const Search = () => {
    const searchField = useRef(null);
    const [value, setValue] = useState('');
    
    useEffect(() => {
        searchField.current.focus();
    }, [])

    const GET_SINGLE = gql`
        query LookUp($labelName: String!) {
            registrations(where: {labelName: $labelName }) {
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

    const [domain, setDomain] = useState(null);
    const [getAddr, { loading, data, error }] = useLazyQuery(GET_SINGLE, {
        onCompleted: data => setDomain(data.registrations[0])
    })
    
    if (loading) return <p>Loading ...</p>;

    return (
        <div className={styles.search}>
            <h2>// Search</h2>
            <div className={styles.searchCard}>
                <h3>ENS: Domain Name</h3>
                <div className={styles.searchQuery}>
                    <input
                        placeholder="example.eth"
                        ref={searchField}
                        type="text"
                        value={value}
                        className={styles.searchQuery__input} onChange={(e) => setValue(e.target.value) }
                    />
                    <button className={styles.searchQuery__button} onClick={() => getAddr({ variables: { labelName: (value).split('.eth')[0] }})} >Search</button>
                </div>
                
                <h3>Data Card</h3>
                <div className={styles.searchData}>
                    { domain && (
                    <ul>
                        <li>Registrant: {domain.registrant?.id}</li>
                        <li>Assigned Addr: {domain.domain.resolvedAddress?.id}</li>
                        <li>Registration: {domain.registrationDate}</li>
                        <li>Expiry: {domain.expiryDate}</li>
                    </ul>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Search;