"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

interface Purchase {
  id: string;
  courseName: string;
  amount: number;
  date: string;
  status: "completed" | "pending";
}

export default function WalletPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching wallet data
    // In real app, fetch from backend
    setTimeout(() => {
      setPurchases([
        {
          id: "1",
          courseName: "Web Development Masterclass",
          amount: 49.99,
          date: "2025-12-20",
          status: "completed",
        },
        {
          id: "2",
          courseName: "Data Structures & Algorithms",
          amount: 39.99,
          date: "2025-12-18",
          status: "completed",
        },
        {
          id: "3",
          courseName: "Cloud Computing Basics",
          amount: 29.99,
          date: "2025-12-15",
          status: "pending",
        },
      ]);
      setBalance(250.00);
      setLoading(false);
    }, 500);
  }, []);

  const totalSpent = purchases
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>💰 Wallet</h1>
        <p>Manage your purchases and digital assets</p>
      </header>

      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading wallet...</p>
        </div>
      ) : (
        <>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>💵</div>
              <div className={styles.statContent}>
                <p className={styles.statLabel}>Current Balance</p>
                <p className={styles.statValue}>${balance.toFixed(2)}</p>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>📊</div>
              <div className={styles.statContent}>
                <p className={styles.statLabel}>Total Spent</p>
                <p className={styles.statValue}>${totalSpent.toFixed(2)}</p>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>🛒</div>
              <div className={styles.statContent}>
                <p className={styles.statLabel}>Total Purchases</p>
                <p className={styles.statValue}>{purchases.length}</p>
              </div>
            </div>
          </div>

          <div className={styles.purchasesSection}>
            <div className={styles.sectionHeader}>
              <h2>Recent Purchases</h2>
              <button className={styles.filterButton}>Filter</button>
            </div>

            <div className={styles.purchasesList}>
              {purchases.map((purchase) => (
                <div key={purchase.id} className={styles.purchaseCard}>
                  <div className={styles.purchaseInfo}>
                    <div className={styles.purchaseIcon}>📚</div>
                    <div className={styles.purchaseDetails}>
                      <h3>{purchase.courseName}</h3>
                      <p className={styles.purchaseDate}>
                        {new Date(purchase.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className={styles.purchaseRight}>
                    <p className={styles.purchaseAmount}>
                      ${purchase.amount.toFixed(2)}
                    </p>
                    <span
                      className={`${styles.statusBadge} ${
                        purchase.status === "completed"
                          ? styles.statusCompleted
                          : styles.statusPending
                      }`}
                    >
                      {purchase.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
