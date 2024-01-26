import Image from "next/image";
import styles from "./page.module.css";

import Portfolio from "@/components/Portfolio/Portfolio";

import data from "./data";

export default function Home() {
  return (
    <main className={styles.main}>
        <Portfolio {...data} />
    </main>
  );
}
