import Image from "next/image";
import styles from "./page.module.css";

import DiscoBall from "@/components/DiscoBall/DiscoBall";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.canvasWrapper}>
        <DiscoBall radius={2.25} />
      </div>
      <div className={styles.copyWrapper}>
        <h1 className={styles.heading}>Hi, I'm Matt and I like to make stuff.</h1>
        <p className={styles.copy}>For the last 9 years, I was making stuff for <a href="https://apple.com">Apple</a> but recently left to focus on making some other <a href="#">stuff</a>.</p>
        <p className={styles.copy}>Want to make stuff together? <a href="#">Get in touch!</a></p>
      </div>
    </main>
  );
}
