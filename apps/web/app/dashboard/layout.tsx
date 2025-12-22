"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import styles from "./dashboard.module.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
    }
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <Link href="/">
            <span className={styles.logoIcon}>☁️</span>
            <span>Cloud Wallet</span>
            </Link>
            
          </div>
        </div>

        <nav className={styles.nav}>
          <Link
            href="/dashboard"
            className={`${styles.navItem} ${pathname === "/dashboard" ? styles.navItemActive : ""}`}
          >
            <span className={styles.navIcon}>📊</span>
            <span>Dashboard</span>
          </Link>
          <Link
            href="/dashboard/calendar"
            className={`${styles.navItem} ${pathname === "/dashboard/calendar" ? styles.navItemActive : ""}`}
          >
            <span className={styles.navIcon}>📅</span>
            <span>Calendar</span>
          </Link>
          <Link
            href="/dashboard/wallet"
            className={`${styles.navItem} ${pathname === "/dashboard/wallet" ? styles.navItemActive : ""}`}
          >
            <span className={styles.navIcon}>💰</span>
            <span>Wallet</span>
          </Link>
        </nav>

        <button onClick={handleSignOut} className={styles.signOutButton}>
          <span>🚪</span>
          <span>Sign Out</span>
        </button>
      </aside>

      <main className={styles.main}>
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
}
