import "./App.css";
import { useEffect, useRef, useState } from "react";
import {
  NavLink,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { InitialSection } from "./pages/Initial";
import { ErrorPage } from "./pages/404";
import { Test } from "./pages/Test";
import { Chords } from "./pages/Chords";
import { DataProvider } from "./contexts/DataContext";
import { useFeatureContext } from "./contexts/FeatureContext";
import { SynthProvider } from "./contexts/SynthContext";
import { FeatureProvider } from "./contexts/FeatureContext";
import { Scales } from "./pages/Scales";

type ThemeMode = "dark" | "light";

function MainMenu({ theme, onToggleTheme }: { theme: ThemeMode; onToggleTheme: () => void }) {
  const { chords, test } = useFeatureContext();

  return (
    <nav className="main-menu" aria-label="Main navigation">
      <NavLink to="/" end className={({ isActive }) => `menu-link ${isActive ? "active" : ""}`}>
        Scales Explorer
      </NavLink>
      <NavLink to="/scales" className={({ isActive }) => `menu-link ${isActive ? "active" : ""}`}>
        Scales Finder
      </NavLink>
      {chords && (
        <NavLink to="/chords" className={({ isActive }) => `menu-link ${isActive ? "active" : ""}`}>
          Chords
        </NavLink>
      )}
      {test && (
        <NavLink to="/test" className={({ isActive }) => `menu-link ${isActive ? "active" : ""}`}>
          Test
        </NavLink>
      )}
      <button
        className="menu-theme-toggle"
        onClick={onToggleTheme}
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      >
        {theme === "dark" ? (
          <svg aria-hidden="true" viewBox="0 0 24 24" className="theme-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
            <path d="M12 2V5M12 19V22M2 12H5M19 12H22M4.9 4.9L7 7M17 17L19.1 19.1M19.1 4.9L17 7M7 17L4.9 19.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg aria-hidden="true" viewBox="0 0 24 24" className="theme-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 14.5A8.5 8.5 0 119.5 4 7 7 0 0020 14.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    </nav>
  );
}

function DataLayout({ theme, onToggleTheme }: { theme: ThemeMode; onToggleTheme: () => void }) {
  return (
    <DataProvider>
      <SynthProvider>
        <div className="app-layout">
          <MainMenu theme={theme} onToggleTheme={onToggleTheme} />
          <Outlet />
        </div>
      </SynthProvider>
    </DataProvider>
  );
}

function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem("theme-mode");
    return saved === "light" || saved === "dark" ? saved : "dark";
  });
  const lastThemeRef = useRef<ThemeMode>(theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme-mode", theme);

    if (lastThemeRef.current !== theme) {
      document.body.classList.add("theme-fade");
      const timeout = window.setTimeout(() => {
        document.body.classList.remove("theme-fade");
      }, 320);

      lastThemeRef.current = theme;
      return () => window.clearTimeout(timeout);
    }

    lastThemeRef.current = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const router = createBrowserRouter([
    {
      element: <DataLayout theme={theme} onToggleTheme={toggleTheme} />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <InitialSection /> },
        { path: "/test", element: <Test /> },
        { path: "/chords", element: <Chords /> },
        { path: "/scales", element: <Scales /> },
      ],
    },
  ]);

  return (
    <main>
      <FeatureProvider>
        <RouterProvider router={router} />
      </FeatureProvider>
    </main>
  );
}

export default App;
