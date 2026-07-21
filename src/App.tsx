import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import AnimePortfolio from "./2anime-portfolio";
import AdminDashboard from "./components/AdminDashboard";
import LoginModal from "./components/LoginModal";
import { PortfolioDataProvider } from "./hooks/usePortfolioData";
import "./App.css";

function PortfolioWithModal() {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <AnimePortfolio onTriggerLogin={() => setShowLogin(true)} />
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLoginSuccess={() => {
          setShowLogin(false);
          navigate("/admin");
        }}
      />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <PortfolioDataProvider>
        <Routes>
          <Route path="/" element={<PortfolioWithModal />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </PortfolioDataProvider>
    </BrowserRouter>
  );
}
