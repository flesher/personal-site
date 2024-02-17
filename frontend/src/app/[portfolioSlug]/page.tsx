import styles from "./page.module.scss";
import Portfolio from "@/components/Portfolio/Portfolio";
import type { PortfolioProps } from "@/components/Portfolio/Portfolio";
import { kv } from "@vercel/kv";
import { ArrowLeft } from "react-feather";
import type { APIResponseCollection, APIResponse } from "@/types/strapi";

// interface PageProps {
//   slug: string;
//   password: string;
//   data: PortfolioProps;
// }

// interface PageResponse {
//   data: PageProps[];
//   ok: boolean;
// }

interface ParamsProps {
  portfolioSlug: string;
}

async function getData(id: number) {
  const res = await fetch("http://127.0.0.1:1337/api/portfolio-pages/" + id + "?" + new URLSearchParams({
    "populate[0]": "portfolio_piece_groups",
    "populate[1]": "portfolio_piece_groups.tech_tags",
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

export async function generateStaticParams() {
  const res = await fetch('http://127.0.0.1:1337/api/portfolio-pages/', {
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
  const page = await getData(1) as APIResponse<"api::portfolio-page.portfolio-page">;

  if (page) {
    console.log('page', page.data.attributes.portfolio_piece_groups?.data);
    return (
      <main className={styles.main}>
          <nav className={styles.navWrapper}>
            <a href="/"><ArrowLeft /></a>
          </nav>
          
          <Portfolio {...page.data.attributes} />
      </main>
    );
  }

  return false;
}
