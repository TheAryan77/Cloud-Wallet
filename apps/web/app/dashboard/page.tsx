"use client";

import styles from "./page.module.css";

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Dashboard</h1>
        <p>Welcome back to your Cloud Wallet</p>
      </header>

      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>📅 Calendar</h2>
          </div>
          <div className={styles.cardBody}>
            <p>Access your course calendars and never miss a deadline.</p>
            <a href="/dashboard/calendar" className={styles.cardLink}>
              View Calendar →
            </a>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>💰 Wallet</h2>
          </div>
          <div className={styles.cardBody}>
            <p>Manage your purchases and track your digital assets.</p>
            <a href="/dashboard/wallet" className={styles.cardLink}>
              Open Wallet →
            </a>
          </div>
        </div>
      </div>

      <div className={styles.recentActivity}>
        <h2>Recent Activity</h2>
        <div className={styles.activityList}>
          <div className={styles.activityItem}>
            <span className={styles.activityIcon}>✓</span>
            <div className={styles.activityContent}>
              <p className={styles.activityTitle}>Welcome to Cloud Wallet!</p>
              <p className={styles.activityTime}>Just now</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
