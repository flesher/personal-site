import type { Attribute } from '@strapi/strapi';
import urlBuilder from '@/lib/urlBuilder';
import viewports from '@/lib/viewports';
import { APIResponseData } from '@/types/strapi';

interface SourceT {
    query: string;
    src: string;
    srcRetina: string;
}

interface SizeT {
    [key: string]: number;
}

interface StrapiProps {
    mediaData: { data?: APIResponseData<"plugin::upload.file"> | undefined };
    sizes: { [key: string]: number };
    className: string;
}

const StrapiMedia: React.FC<StrapiProps> = ({mediaData, sizes = {}, ...rest}) => {
    if (!mediaData?.data?.attributes) {
        return;
    }

    const formats = {
        natural:  {
            url: mediaData?.data?.attributes.url,
            width: mediaData?.data?.attributes.width,
            height: mediaData?.data?.attributes.height,
        },
        ...(mediaData.data.attributes.formats || {}) as object 
    };

    const sources = Object.entries(sizes).reduce((
        acc: SourceT[],
        [breakpoint, maxWidth]: any
    ) => {

        if (!viewports[breakpoint]) {
            return acc;
        }

        const query = "(min-width: " + viewports[breakpoint] + "px)";
        const winner = Object.values(formats).sort((a: any, b: any) => {
            return (a.width - maxWidth) - (b.width - maxWidth);

        }).filter((f: any) => {
            return f.width - maxWidth > 0;

        })[0];

        const winnerRetina = Object.values(formats).sort((a: any, b: any) => {
            return (a.width - maxWidth * 2) - (b.width - maxWidth * 2);

        }).filter((f: any) => {
            return f.width - maxWidth * 2 > 0;

        })[0];

        const src = winner ? winner.url : formats.natural.url;
        const srcRetina = winnerRetina ? winnerRetina.url : formats.natural.url;

        acc.push({
            query,
            src: urlBuilder(src),
            srcRetina: urlBuilder(srcRetina)
        });

        return acc;
    }, [])

    return (
        <picture {...rest}>
            {sources.map((source, i) => (
                <source key={i} srcSet={source.src + " 1x, " + source.srcRetina + " 2x"} media={source.query} />
            ))}
            <img 
                src={urlBuilder(mediaData.data.attributes.url)} 
                alt={mediaData.data.attributes.alternativeText || ""} 
            />
        </picture>
    );
}

export default StrapiMedia;