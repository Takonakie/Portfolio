import React, { useState, useEffect } from "react";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { useAuth } from "../hooks/useAuth";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const { data } = usePortfolioData();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const storedUsername = data.auth?.username || "takonakie";
      const storedHash = data.auth?.passwordHash || "";

      const inputHash = await hashPassword(password);

      if (username === storedUsername && inputHash === storedHash) {
        login();
        onLoginSuccess();
      } else {
        setError("Invalid username or password");
      }
    } catch {
      setError("Login verification failed");
    } finally {
      setLoading(false);
    }
  };

  const primaryColor = data.theme?.colors?.primary || "#ec4899";

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className="relative bg-zinc-900 border-4 p-8 w-full max-w-md shadow-2xl z-10"
        style={{
          clipPath: "polygon(0 0, 100% 0, 98% 100%, 2% 100%)",
          borderColor: primaryColor,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 font-black text-xl hover:text-white transition-colors cursor-pointer"
          style={{ color: primaryColor }}
        >
          ✕
        </button>

        <h2
          className="text-2xl font-black text-white uppercase mb-1"
          style={{ textShadow: `3px 3px 0 ${primaryColor}` }}
        >
          ADMIN LOGIN
        </h2>
        <p className="font-bold text-sm mb-6" style={{ color: primaryColor }}>管理者ログイン</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-white font-bold text-sm uppercase mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  passwordRef.current?.focus();
                }
              }}
              className="w-full bg-zinc-800 border-2 border-white text-white px-4 py-2 font-bold outline-none"
              style={{
                borderColor: "#ffffff",
              }}
              onFocus={(e) => (e.target.style.borderColor = primaryColor)}
              onBlur={(e) => (e.target.style.borderColor = "#ffffff")}
              placeholder="Enter username..."
              autoFocus
            />
          </div>

          <div>
            <label className="block text-white font-bold text-sm uppercase mb-1">
              Password
            </label>
            <input
              ref={passwordRef}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-800 border-2 border-white text-white px-4 py-2 font-bold outline-none"
              style={{
                borderColor: "#ffffff",
              }}
              onFocus={(e) => (e.target.style.borderColor = primaryColor)}
              onBlur={(e) => (e.target.style.borderColor = "#ffffff")}
              placeholder="Enter password..."
            />
          </div>

          {error && (
            <div className="bg-red-500/20 border-2 border-red-500 text-red-300 px-4 py-2 font-bold text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-press text-black font-black uppercase px-6 py-3 border-4 border-black mt-2 disabled:opacity-50 cursor-pointer"
            style={{
              boxShadow: "5px 5px 0 #000",
              backgroundColor: primaryColor,
            }}
          >
            {loading ? "Authenticating..." : "LOGIN →"}
          </button>
        </form>
      </div>
    </div>
  );
}
