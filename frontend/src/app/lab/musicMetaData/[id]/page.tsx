"use client";

import { useState, useEffect } from "react";

import Loader from "@/components/shared/Loader/loader";
import { createItemURL } from '../api';

interface ParamsProps {
    params: {
        id: string;
    }
}

interface ItemProps {
    id: string;
}

export default function({ params }: ParamsProps) {
    const [itemData, setItemData] = useState<ItemProps | null>(null);
    const url = createItemURL('release', params.id);

    useEffect(() => {
        fetch(url, { "headers": {"Accept": "application/json"}})
        .then(res => {
            console.log(res);
            return res.json();
        }).then((data) => {
            console.log('test');
            console.log(data);
            setItemData(data);
            return;
        })
    }, [])

    return (
        <>
            { itemData ? <div>{params.id}</div> : <Loader /> }
        </> 
    );
} 