"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user has a token
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.navContent}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>☁️</span>
            <span>Cloud Wallet</span>
          </div>
          {isAuthenticated ? (
            <Link href="/dashboard" className={styles.navButton}>
              Dashboard
            </Link>
          ) : (
            <Link href="/signin" className={styles.navButton}>
              Sign In
            </Link>
          )}
        </div>
      </nav>

      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.title}>
            Your Digital Life,
            <br />
            <span className={styles.highlight}>Organized & Secure</span>
          </h1>
          <p className={styles.subtitle}>
            Manage your courses, track your calendar, and keep your digital wallet 
            all in one beautiful, intuitive platform.
          </p>
          <div className={styles.ctaButtons}>
            {isAuthenticated ? (
              <Link href="/dashboard" className={styles.primaryButton}>
                Go to Dashboard
              </Link>
            ) : (
              <Link href="/signup" className={styles.primaryButton}>
                Get Started
              </Link>
            )}
            <a href="#features" className={styles.secondaryButton}>
              Learn More
            </a>
          </div>
        </div>

        
      </main>

      <footer className={styles.footer}>
        <p>© 2025 Cloud Wallet. All rights reserved.</p>
      </footer>
    </div>
  );
}
