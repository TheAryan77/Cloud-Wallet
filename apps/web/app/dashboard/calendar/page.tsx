"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

interface Course {
  id: string;
  title: string;
  calendarNotionId: string | null;
}

export default function CalendarPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [calendarId, setCalendarId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch user's purchased courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/course/", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to fetch courses");
          return;
        }

        setCourses(data.courses || []);
      } catch (err) {
        setError("Failed to connect to server");
      }
    };

    fetchCourses();
  }, []);

  const handleFetchCalendar = async () => {
    if (!selectedCourse) {
      setError("Please select a course");
      return;
    }

    setLoading(true);
    setError("");
    setCalendarId(null);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/course/${selectedCourse}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to fetch calendar");
        setLoading(false);
        return;
      }

      setCalendarId(data.calenderid);
    } catch (err) {
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>📅 Calendar</h1>
        <p>Access your course calendars with Notion integration</p>
      </header>

      <div className={styles.content}>
        <div className={styles.card}>
          <h2>Select a Course</h2>
          
          <div className={styles.selectGroup}>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className={styles.select}
            >
              <option value="">Choose a course...</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>

            <button
              onClick={handleFetchCalendar}
              className={styles.button}
              disabled={loading || !selectedCourse}
            >
              {loading ? "Loading..." : "Get Calendar"}
            </button>
          </div>

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}
        </div>

        {calendarId && (
          <div className={styles.calendarCard}>
            <div className={styles.calendarHeader}>
              <h2>📆 Your Course Calendar</h2>
              <span className={styles.badge}>Notion ID: {calendarId}</span>
            </div>
            
            <div className={styles.notionEmbed}>
              <div className={styles.embedPlaceholder}>
                <div className={styles.embedIcon}>📋</div>
                <p className={styles.embedTitle}>Calendar Ready</p>
                <p className={styles.embedText}>
                  Your Notion calendar ID: <strong>{calendarId}</strong>
                </p>
                <p className={styles.embedSubtext}>
                  Open this calendar in Notion to view all your course schedules and deadlines.
                </p>
                <a
                  href={`https://notion.so/${calendarId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.notionButton}
                >
                  Open in Notion →
                </a>
              </div>
            </div>
          </div>
        )}

        {!calendarId && !error && (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>🗓️</span>
            <h3>No Calendar Selected</h3>
            <p>Select a course above to view its calendar</p>
          </div>
        )}
      </div>
    </div>
  );
}
