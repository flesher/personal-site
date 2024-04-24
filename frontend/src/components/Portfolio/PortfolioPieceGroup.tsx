import { BlocksContent, BlocksRenderer } from '@strapi/blocks-react-renderer';
import { APIResponseCollection, APIResponse } from '@/types/strapi';
import styles from './portfolio.module.scss';
import viewports from '@/lib/viewports';
import { ArrowUpRight } from 'react-feather';
import StrapiMedia from '@/components/StrapiMedia/StrapiMedia';

type Unpacked<T> = T extends (infer U)[] ? U : T;

interface ImageProps {
    src: string;
    alt?: string;
}

// this could just be APIResponseCollection<"api::portfolio-piece-group.portfolio-piece-group">?
interface PieceGroupProps {
    info?: BlocksContent;
    description?: BlocksContent;
    tech_tags?: Omit<APIResponseCollection<"api::tech-tag.tech-tag">, "meta">;
    portfolio_pieces?: Omit<APIResponseCollection<"api::portfolio-piece.portfolio-piece">, "meta">;
}

const PortfolioPieceGroup: React.FC<PieceGroupProps> = ({
    info,
    description, 
    tech_tags,
    portfolio_pieces
}) => {
    return (
        <section className={styles.portfolioPiece}>
            <div className={styles.infoWrapper}>
                {info &&
                    <div className={styles.companyInfo}>
                         <BlocksRenderer content={info} />
                     </div>       
                }
                {description && 
                    <div className={styles.description}>
                        <BlocksRenderer content={description} />
                    </div>
                }
     
                <div className={styles.technologies}>
                    <ul className={styles.techList}>
                        { tech_tags && Object.values(tech_tags.data).map((t, i) => <li key={i}><span>{ t.attributes.tag }</span></li> )}
                    </ul>
                </div>
            </div>
            <div className={styles.showcase}>
                { portfolio_pieces && Object.values(portfolio_pieces.data).map((p, i) => {
                    return (
                        <PortfolioPiece {...p} key={i} />
                    )
                })}
            </div>
        </section>
    )
}

const PortfolioPiece: React.FC<APIResponse<"api::portfolio-piece.portfolio-piece">["data"]> = (piece) => {    
    return (
        <div className={styles.showcaseItem}>
            <StrapiMedia mediaData={{ ...piece.attributes.poster_image }} className={styles.image} sizes={{
                xsmall: viewports.small,
                small: viewports.medium / 2,
                medium: viewports.large / 3,
                large: viewports.xlarge / 3
            }}/>
            <div className={styles.showcaseItemInfo}>
                <div className={styles.showcaseItemInfoInner}>
                    <h3>{piece.attributes.title}</h3>
                    { piece.attributes.info && 
                        <BlocksRenderer content={piece.attributes.info} />
                    }
                    { piece.attributes.links &&
                        piece.attributes.links.map((link, i) => <CustomLink {...link} key={i} />)
                    }
                </div> 
            </div>
        </div>
    )
}

type CustomLinkType = Unpacked<APIResponse<"api::portfolio-piece.portfolio-piece">["data"]["attributes"]["links"]>
const CustomLink: React.FC<CustomLinkType> = (link) => {
    if (link == undefined) {
        return 
    }

    // workaround for strapi's JSON value type
    const meta = JSON.parse(JSON.stringify(link.meta || {}));

    return (
        <p><a href={link.url} target="_blank">{link.link_text}{ meta.external ? <ArrowUpRight /> : '' }</a></p>
    )
}


const Image: React.FC<ImageProps> = ({src, alt = ''}) => {
    return (
        <img className={styles.image} src={src} alt={alt}></img>
    )
}

export default PortfolioPieceGroup;