'use client';

import React from 'react';
import classnames from "classnames";
import { ArrowUpRight } from 'react-feather';

import styles from './portfolio.module.scss';
// import DiscoBall from "@/components/DiscoBall/DiscoBall";

interface ImageProps {
    src: string;
    alt?: string;
}

interface LinkProps {
    url: string,
    text: string,
    ariaLabel?: string,
    external?: boolean,
}

interface ShowcaseItemInfoProps {
    description: string;
    links?: LinkProps[];
    awards?: string[];
}

interface ShowcaseItemProps {
    img: ImageProps;
    title: string;
    info?: ShowcaseItemInfoProps;
}

interface PieceProps {
    company: string;
    position?: string;
    dates?: string;
    website?: {
        text: string;
        url: string;
    };
    description: string[];
    techTags: string[];
    showcase: {
        layout?: number;
        items: ShowcaseItemProps[];
    }
}

export interface PortfolioProps {
    headline: string;
    intro: string[];
    pieces: PieceProps[]
}

const Portfolio: React.FC<PortfolioProps> = ({headline, intro, pieces}) => {

    return (
        <>
            <header className={styles.coverLetter}>
                {/* <div className={styles.logoWrapper}><DiscoBall /></div> */}
                <h1 className={styles.pageHeading}>{headline}</h1>
                { intro.map((intro, i) => <p key={i}>{intro}</p>) }
            </header>
            { pieces.map((p, i) => <Piece {...p} key={i} />) }
        </>
    )
}

const Piece: React.FC<PieceProps> = ({
    company, 
    position, 
    dates, 
    website, 
    description, 
    techTags,
    showcase
}) => {
    return (
        <section className={styles.portfolioPiece}>
            <div className={styles.infoWrapper}>
                <div className={styles.companyInfo}>
                    <h2>{ company }</h2>
                    { position ? <p>{ position }</p> : '' }
                    { dates ? <p>{ dates }</p> : '' }
                    { website ? <a href={website.url}>{ website.text }</a> : '' }
                </div>

                <div className={styles.description}>
                    { description.map((d, i) => <p key={i}>{d}</p>) }
                </div>
                <div className={styles.technologies}>
                    <ul className={styles.techList}>
                        { techTags.map((t, i) => <li key={i}><span>{t}</span></li> )}
                    </ul>
                </div>
            </div>
            <div className={styles.showcase}>
                { showcase.items.map((item, i) => {

                    return (
                        <div className={styles.showcaseItem} key={i}>
                            <Image {...item.img} />
                            { item.info?         
                                <ShowcaseItemInfo {...item.info} />
                            : ''}
                        </div>  
                    )
                })}
            </div>
        </section>
    )
}

const ShowcaseItemInfo: React.FC<ShowcaseItemInfoProps> = ({description, links = []}) => {
    return (
        <div className={styles.showcaseItemInfo}>
            <div className={styles.showcaseItemInfoInner}>
                <p>{description}</p>
                { links.map((link, i) => <a href={link.url} key={i}>{link.text}{ link.external ? <ArrowUpRight /> : '' }</a>) }
            </div> 
        </div>
    )
}

const Image: React.FC<ImageProps> = ({src, alt = ''}) => {
    return (
        <img className={styles.image} src={src} alt={alt}></img>
    )
}

export default Portfolio;