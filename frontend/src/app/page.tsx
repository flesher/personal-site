'use client';

import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { Instagram, GitHub, Mail, Linkedin } from "react-feather";
import classNames from "classnames";

import DiscoBall from "@/components/DiscoBall/DiscoBall";

function loadImage(src: string, cb: () => void): void {
  const image = new Image();
  image.src = src;
  image.onload = () => {
    cb();
  }
}

export default function Home() {
  const [shouldAnimate, setShouldAnimate] = useState<boolean>(false);
  const matCapPath = '/matcap/face-5.png';

  useEffect(() => {
    loadImage(matCapPath, () => {
      setShouldAnimate(true)
    })
  }, [])

  return (
    <main className={styles.main}>
      <div className={classNames(styles.canvasWrapper, {[styles.showDiscoBall]: shouldAnimate})}>
        <DiscoBall radius={2.25} matCapPath={matCapPath} />
      </div>
      <div className={styles.copyWrapper}>
        <h1 className={styles.heading}>Hi, I'm Matt and I like to make stuff.</h1>
        <p className={styles.copy}>Want to make stuff together? <a href="mailto:matt.flesher@gmail.com">Hit me up!</a></p>
        <ul className={styles.contactLinks}>
          <li><a target="_blank" href="https://www.instagram.com/mattflesher/"><Instagram /></a></li>
          <li><a target="_blank" href="https://github.com/flesher"><GitHub /></a></li>
          <li><a target="_blank" href="https://www.linkedin.com/in/matthewflesher/"><Linkedin /></a></li>
          <li><a target="_blank" href="mailto:matt.flesher@gmail.com"><Mail /></a></li>
        </ul>
      </div>
    </main>
  );
}
