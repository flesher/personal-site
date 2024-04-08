'use client';

import React from 'react';
import { Instagram, GitHub, Mail, Linkedin } from "react-feather";
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';
import { APIResponseCollection } from '@/types/strapi';

import styles from './portfolio.module.scss';
import PortfolioPieceGroup from './PortfolioPieceGroup';

export interface PortfolioProps {
    coverLetter?: BlocksContent;
    portfolio_piece_groups?: Omit<APIResponseCollection<"api::portfolio-piece-group.portfolio-piece-group"> , "meta">;
}

const Portfolio: React.FC<PortfolioProps> = ({coverLetter, portfolio_piece_groups}: PortfolioProps) => {
    return (
        <>
            { coverLetter && 
                <header className={styles.coverLetter}>
                    <BlocksRenderer content={coverLetter} />               
                </header>          
            }

           { portfolio_piece_groups?.data && Object.values(portfolio_piece_groups.data).map((g, i) => <PortfolioPieceGroup {...g.attributes} key={i} /> ) }
 
            <footer>
                <ul className={styles.contactLinks}>
                    <li><a target="_blank" href="https://www.instagram.com/mattflesher/"><Instagram /></a></li>
                    <li><a target="_blank" href="https://github.com/flesher"><GitHub /></a></li>
                    <li><a target="_blank" href="https://www.linkedin.com/in/matthewflesher/"><Linkedin /></a></li>
                    <li><a target="_blank" href="mailto:matt.flesher@gmail.com"><Mail /></a></li>
                </ul>
            </footer>
        </>
    )
}

export default Portfolio;

