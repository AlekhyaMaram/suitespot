import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import WriteReview from "./components/WriteReview";
import DormDetails from "./components/DormDetails";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Header />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/write-review" element={<WriteReview />} />
          <Route path="/dorm/:id" element={<DormDetails />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;