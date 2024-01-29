import styles from "./page.module.scss";
import Portfolio from "@/components/Portfolio/Portfolio";
import type { PortfolioProps } from "@/components/Portfolio/Portfolio";
import { kv } from "@vercel/kv";

interface PageProps {
  slug: string;
  password: string;
  data: PortfolioProps;
}

interface PageResponse {
  pages: PageProps[];
}

interface ParamsProps {
  portfolioSlug: string;
}

export async function generateStaticParams() {
  const res: PageResponse | null = await kv.get('pages');

  if (res) {
    const pages = res.pages;
 
    return pages.map((page) => ({
      portfolioSlug: page.slug,
    }))
  }

  return [];
}

async function getPost(params: ParamsProps ) {
  const res: PageResponse | null = await kv.get('pages');

  if (res) {
    const pages = res.pages;
    return pages.find((p: PageProps) => (p.slug == params.portfolioSlug));
  }

  return null;
}
 
export default async function Page({ params }: { params: ParamsProps }) {
  const page = await getPost(params);
  if (page) {
    return (
      <main className={styles.main}>
          <Portfolio {...page.data} />
      </main>
    );
  }

  return false;
}
