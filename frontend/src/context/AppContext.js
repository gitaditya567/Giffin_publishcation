"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize Auth & Cart from LocalStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("griffin_token");
      const storedUser = localStorage.getItem("griffin_user");
      const storedCart = localStorage.getItem("griffin_cart");

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
      setLoading(false);
    }
  }, []);

  // Sync Cart to LocalStorage
  useEffect(() => {
    if (typeof window !== "undefined" && !loading) {
      localStorage.setItem("griffin_cart", JSON.stringify(cart));
    }
  }, [cart, loading]);

  // Auth Operations
  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Login failed");
      }
      
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("griffin_token", data.token);
      localStorage.setItem("griffin_user", JSON.stringify(data.user));
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: err.message };
    }
  };

  const signup = async (name, email, password, role) => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Registration failed");
      }
      
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("griffin_token", data.token);
      localStorage.setItem("griffin_user", JSON.stringify(data.user));
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("griffin_token");
    localStorage.removeItem("griffin_user");
  };

  // Cart Operations
  const addToCart = (book) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.book._id === book._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.book._id === book._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { book, quantity: 1, price: book.price }];
    });
  };

  const removeFromCart = (bookId) => {
    setCart((prevCart) => prevCart.filter((item) => item.book._id !== bookId));
  };

  const updateCartQuantity = (bookId, qty) => {
    if (qty <= 0) {
      removeFromCart(bookId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.book._id === bookId ? { ...item, quantity: qty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Submission operations (Multi-part/form-data)
  const submitProposal = async (formData) => {
    try {
      const res = await fetch(`${API_URL}/submissions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, // FormData contains the file and fields
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Submission failed");
      }
      return { success: true, data: data.data };
    } catch (err) {
      console.error(err);
      return { success: false, error: err.message };
    }
  };

  // Get current user's submissions
  const getMySubmissions = async () => {
    try {
      const res = await fetch(`${API_URL}/submissions/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      return data.success ? data.data : [];
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  // Get all submissions (Admin)
  const getAllSubmissions = async () => {
    try {
      const res = await fetch(`${API_URL}/submissions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      return data.success ? data.data : [];
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  // Update submission status (Admin)
  const updateSubmissionStatus = async (submissionId, status, adminComments) => {
    try {
      const res = await fetch(`${API_URL}/submissions/${submissionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status, adminComments }),
      });
      const data = await res.json();
      return { success: data.success, error: data.error };
    } catch (err) {
      console.error(err);
      return { success: false, error: err.message };
    }
  };

  // Submit Contact Form
  const submitContactForm = async (name, email, subject, message) => {
    try {
      const res = await fetch(`${API_URL}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await res.json();
      return { success: data.success, error: data.error };
    } catch (err) {
      console.error(err);
      return { success: false, error: err.message };
    }
  };

  // Place Order
  const checkoutCart = async (shippingAddress) => {
    try {
      const itemsPayload = cart.map((item) => ({
        book: item.book._id,
        quantity: item.quantity,
        price: item.price,
      }));
      const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items: itemsPayload, totalAmount, shippingAddress }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Checkout failed");
      }
      clearCart();
      return { success: true, data: data.data };
    } catch (err) {
      console.error(err);
      return { success: false, error: err.message };
    }
  };

  // Get orders (User or Admin)
  const getOrders = async () => {
    try {
      const endpoint = user?.role === "admin" ? `${API_URL}/orders` : `${API_URL}/orders/my`;
      const res = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      return data.success ? data.data : [];
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        token,
        cart,
        loading,
        apiUrl: API_URL,
        login,
        signup,
        logout,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        submitProposal,
        getMySubmissions,
        getAllSubmissions,
        updateSubmissionStatus,
        submitContactForm,
        checkoutCart,
        getOrders,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
