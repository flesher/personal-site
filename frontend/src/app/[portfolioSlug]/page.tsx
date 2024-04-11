import styles from "./page.module.scss";
import Portfolio from "@/components/Portfolio/Portfolio";
import type { PortfolioProps } from "@/components/Portfolio/Portfolio";
import { kv } from "@vercel/kv";
import { ArrowLeft } from "react-feather";
import type { APIResponseCollection, APIResponse } from "@/types/strapi";

interface ParamsProps {
  portfolioSlug: string;
}

async function getPages() {
  const res = await fetch(process.env["STRAPI_API"] + "/portfolio-pages?" + new URLSearchParams({
    "populate[0]": "portfolio_piece_groups",
    "populate[1]": "portfolio_piece_groups.tech_tags",
    "populate[2]": "portfolio_piece_groups.portfolio_pieces",
    "populate[3]": "portfolio_piece_groups.portfolio_pieces.poster_image",
    "populate[4]": "portfolio_piece_groups.portfolio_pieces.info",
    "populate[5]": "portfolio_piece_groups.portfolio_pieces.links",
    "populate[6]": "portfolio_piece_groups.portfolio_pieces.links.meta",
    "populate[7]": "portfolio_piece_groups.portfolio_pieces.title"
  }), {
    method: 'GET',
    headers: {
        'Authorization': 'bearer ' + process.env["CMS_TOKEN"]
    }
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getData(id: number) {
  const res = await fetch(process.env["STRAPI_API"] + "/portfolio-pages/" + id + "?" + new URLSearchParams({
    "populate[0]": "portfolio_piece_groups",
    "populate[1]": "portfolio_piece_groups.tech_tags",
    "populate[2]": "portfolio_piece_groups.portfolio_pieces",
    "populate[3]": "portfolio_piece_groups.portfolio_pieces.poster_image",
    "populate[4]": "portfolio_piece_groups.portfolio_pieces.info",
    "populate[5]": "portfolio_piece_groups.portfolio_pieces.links",
    "populate[6]": "portfolio_piece_groups.portfolio_pieces.links.meta",
    "populate[7]": "portfolio_piece_groups.portfolio_pieces.title"
  }), {
    method: 'GET',
    headers: {
        'Authorization': 'bearer ' + process.env["CMS_TOKEN"]
    }
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}


// maps slug to url
export async function generateStaticParams() {
  const res = await fetch(process.env["STRAPI_API"] + '/portfolio-pages/', {
      method: 'GET',
      headers: {
          'Authorization': 'bearer ' + process.env["CMS_TOKEN"]
      }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await res.json() as APIResponseCollection<"api::portfolio-page.portfolio-page">;

  if (data) {
    const slugMapping = data.data.map((page: any) => {
      return {
        portfolioSlug: page.attributes.slug
      }
    });

    return slugMapping;
  }
 
  return [];
}
 
export default async function Page({ params }: { params: ParamsProps }) {
  const pages = await getPages();
  const page = pages.data.find((p: any) => p.attributes.slug == params.portfolioSlug);

  if (page) {
    return (
      <main className={styles.main}>
          <nav className={styles.navWrapper}>
            <a href="/"><ArrowLeft /></a>
          </nav>
          
          <Portfolio {...page.attributes} />
      </main>
    );
  }

  return false;
}
