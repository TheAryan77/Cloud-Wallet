// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Auth API
export const authAPI = {
  signIn: async (email: string, password: string, phone: string, name: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, phone, name }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "Sign in failed");
    }
    
    return data;
  },
};

// Calendar API
export const calendarAPI = {
  getCalendar: async (courseId: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/course/${courseId}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch calendar");
    }
    
    return data;
  },
};

// Utility: Get token from localStorage
export const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

// Utility: Save token to localStorage
export const saveAuthToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
};

// Utility: Remove token from localStorage
export const removeAuthToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
};

// Utility: Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};
