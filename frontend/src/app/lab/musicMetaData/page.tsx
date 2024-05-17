'use client';

import styles from "./page.module.scss";
import React, { useState, useRef } from "react";

const BASE_URL = "/one-music-api/20220401/release?"

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
    loading: boolean
}

function artistName(artistCredit: Artist[]) {
    return artistCredit.reduce((acc: string, curr: Artist) => {
        return ((curr.joinphrase || '') + curr.name) + acc;
    }, '')
}

const Results = ({releases, loading}: ResultsProps) => {
    if (loading == true) return <div className={styles.results}>loading...</div>

    return (
        <div className={styles.results}>
            <ul>
                {releases && releases.map((release) => {
                    return (
                        <li><a href="#">{artistName(release['artist-credit'])} - {release.title}</a></li>
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
        const response = await fetch(`/musicbrainz/release?query=${inputRef.current.value}&fmt=json`)
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

            <Results {...resultsData} loading={loading}/>

        </div>
    )
};