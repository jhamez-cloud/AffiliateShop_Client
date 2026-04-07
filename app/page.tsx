'use client'
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const navigate = (page: string) => setCurrentPage(page);

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white font-sans">
      <Navbar currentPage={currentPage} navigate={navigate} />
      <main className="flex-1">
        {currentPage === "home" && <HomePage navigate={navigate} />}
        {currentPage === "shop" && <ShopPage />}
        {currentPage === "contact" && <ContactPage />}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}