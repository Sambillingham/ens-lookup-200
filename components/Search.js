import React, { useRef, useState, useEffect} from 'react'
import { gql, useLazyQuery} from '@apollo/client'
import EnsCard from '@/components/EnsCard'

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

    const [result, setResult] = useState(null);
    const [getAddr, { loading, data, error }] = useLazyQuery(GET_SINGLE, {
        onCompleted: data => {
            setResult(data.registrations[0])
        }
    })
    
    const search = () => {
        setResult(null)
        getAddr({ variables: { labelName: (value).split('.eth')[0] }})
    }
    
    return (
        <div className={styles.search}>
            <h2>Search</h2>
            <div className={styles.searchCard}>
                <h3>ENS: Domain Name</h3>
                <div className={styles.searchQuery}>
                    <input
                        placeholder="example.eth"
                        ref={searchField}
                        type="text"
                        value={value}
                        className={styles.searchQuery__input} onChange={(e) => setValue( (e.target.value).toLocaleLowerCase()) }
                    />
                    <button 
                        className={styles.searchQuery__button}
                        onClick={() => search()}
                        disabled={value === ''}
                    >
                        Search
                    </button>
                </div>
                <EnsCard 
                    query={{ loading, data, result, error }}
                    searchField={value}
                />
            </div>
        </div>
    )
}

export default Search;