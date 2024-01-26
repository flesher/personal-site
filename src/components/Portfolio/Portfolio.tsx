'use client';

import React from 'react';
import classnames from "classnames";

import styles from './portfolio.module.css';
import typography from '@/app/typography.module.css'
import DiscoBall from "@/components/DiscoBall/DiscoBall";

interface ImageProps {
    src: string;
}

interface ShowCaseItemProps {
    img: ImageProps,
    title: string;
    description?: string;
    links?: string[];
    awards?: string[];
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
        items: ShowCaseItemProps[];
    }
}

interface PortfolioProps {
    headline: string;
    intro: string[];
    pieces: PieceProps[]
}

const Portfolio: React.FC<PortfolioProps> = ({headline, intro, pieces}) => {

    return (
        <>
            <header className={styles.coverLetter}>
                {/* <div className={styles.logoWrapper}><DiscoBall /></div> */}
                <h1 className={typography.pageHeading}>{headline}</h1>
                { intro.map((i) => <p className={typography.copyIntro}>{i}</p>) }
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
                    <h2 className={typography.sectionHeading}>{ company }</h2>
                    { position ? <p className={typography.copyLabel}>{ position }</p> : '' }
                    { dates ? <p className={typography.copyLabel}>{ dates }</p> : '' }
                    { website ? <a className={typography.copyLabel} href={website.url}>{ website.text }</a> : '' }
                </div>

                <div className={styles.description}>
                    { description.map((d, i) => <p className={typography.copyParagraph} key={i}>{d}</p>) }
                </div>
                <div className={styles.technologies}>
                    <ul className={styles.techList}>
                        { techTags.map((t, i) => <li key={i}><span className={classnames(styles.techListItem, typography.copyLabel)}>{t}</span></li> )}
                    </ul>
                </div>
            </div>
            <div className={styles.showcase}>
                { showcase.items.map((item, i) => {
                    return (
                        <div className={styles.showcaseItem} key={i}>
                            <div className={styles.image}></div>
                            <p className={classnames(styles.imageCaption, typography.copyLabel)}>{item.title}</p>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

const Image: React.FC<ImageProps> = ({src}) => {
    return (
        <figure></figure>
    )
}

export default Portfolio;