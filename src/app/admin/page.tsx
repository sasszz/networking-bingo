"use client";

import Link from "next/link";

import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 items-center justify-center h-screen">
      <h2>Admin Page</h2>
      <div className="flex flex-col gap-4">
        <Link href="/admin/create-game" className={styles.button}>
          <button>Create New Game</button>
        </Link>
        <Link href="/admin" className={styles.button}>
          <button>View Past Games</button>
        </Link>
        <Link href="/admin/live-games" className={styles.button}>
          <button>View Live Games</button>
        </Link>
      </div>
    </div>
  );
}
