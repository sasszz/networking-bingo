"use client";

import Link from "next/link";

import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 items-center justify-center h-screen">
      <h2>Networking Bingo</h2>
      <div className="flex flex-row gap-4">
        <Link href="/admin" className={styles.button}>
          <button>Admin</button>
        </Link>
        <Link href="/player/code" className={styles.button}>
          <button>Player</button>
        </Link>
      </div>
    </div>
  );
}
