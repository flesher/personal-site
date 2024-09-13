'use client';

import styles from "./page.module.scss";
import React, { useState, useRef } from "react";
import Link from 'next/link'

import Loader from '@/components/shared/Loader/loader';
import { createSearchURL } from './api';

type Artist = {
    name: string;
    joinphrase: string;
    artist: {
        id: string,
        name: string
    }
}

type Release = {
    'artist-credit': Artist[]
}

interface ResultsProps {
    releases?: any[]
}

function artistName(artistCredit: Artist[]) {
    return artistCredit.reduce((acc: string, curr: Artist) => {
        return ((curr.joinphrase || '') + curr.name) + acc;
    }, '')
}

const Results = ({ releases }: ResultsProps) => {

    return (
        <div className={styles.results}>
            <ul>
                {releases && releases.map((release, i) => {
                    console.log(release);
                    return (
                        <li key={i}>
                            <Link href={{
                                pathname: '/lab/musicMetaData/' + release.id
                            }}>
                                {artistName(release['artist-credit'])} - {release.title}</Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default function Page() {
    const [resultsData, setResultsData] = useState<ResultsProps>({});
    const [loading, setLoading] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    async function search(e: any) {
        e.preventDefault();

        if (inputRef == null || inputRef.current == null ) {
            return;
        }
        
        setLoading(true);
        const url = createSearchURL('release', inputRef.current.value)
        const response = await fetch(url);
        const data = await response.json();
        data.releases.forEach((rel: any) => console.log(rel['artist-credit']));

        setResultsData(data);
        setLoading(false);
    }

    return (
        <div className={styles.wrapper}>
            <form className={styles.form}>
                <input type="search" ref={inputRef} placeholder="Search query" />
                <button onClick={search}>Search</button>
            </form>

            { loading ? <Loader /> : <Results {...resultsData} /> }
        </div>
    )
};