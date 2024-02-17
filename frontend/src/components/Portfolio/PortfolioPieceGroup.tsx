import { BlocksContent, BlocksRenderer } from '@strapi/blocks-react-renderer';
import { APIResponseCollection } from '@/types/strapi';
import styles from './portfolio.module.scss';

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
    title: string;
    description: string;
    links?: LinkProps[];
    awards?: string[];
}

interface ShowcaseItemProps {
    img: ImageProps;
    title: string;
    info?: ShowcaseItemInfoProps;
}

interface PieceGroupProps {
    info?: BlocksContent;
    description?: BlocksContent;
    tech_tags?: Omit<APIResponseCollection<"api::tech-tag.tech-tag">, "meta">;
    showcase?: {
        layout?: number;
        items: ShowcaseItemProps[];
    }
}

const PortfolioPieceGroup: React.FC<PieceGroupProps> = ({
    info,
    description, 
    tech_tags,
    showcase
}) => {
    console.log(info, description, tech_tags);
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
                        { tech_tags && Object.values(tech_tags.data).map((t, i) => <li key={i}><span>{t.attributes.tag}</span></li> )}
                    </ul>
                </div>
            </div>
            <div className={styles.showcase}>
                { showcase && showcase.items.map((item, i) => {

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

const ShowcaseItemInfo: React.FC<ShowcaseItemInfoProps> = ({title, description, links = []}) => {
    return (
        <div className={styles.showcaseItemInfo}>
            <div className={styles.showcaseItemInfoInner}>
                <h3>{title}</h3>
                <p>{description}</p>
                { links.map((link, i) => <p key={i}><a href={link.url} target="_blank">{link.text}{ link.external ? <ArrowUpRight /> : '' }</a></p>) }
            </div> 
        </div>
    )
}

const Image: React.FC<ImageProps> = ({src, alt = ''}) => {
    return (
        <img className={styles.image} src={src} alt={alt}></img>
    )
}

export default PortfolioPieceGroup;