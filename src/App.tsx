import "./App.css";
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { InitialSection } from "./pages/Initial";
import { ErrorPage } from "./pages/404";
import { Test } from "./pages/Test";
import { Chords } from "./pages/Chords";
import { DataProvider } from "./contexts/DataContext";
import { SynthProvider } from "./contexts/SynthContext";
import { FeatureProvider } from "./contexts/FeatureContext";
import { Scales } from "./pages/Scales";

function DataLayout() {
  return (
    <DataProvider>
      <Outlet />
    </DataProvider>
  );
}

function DataSynthLayout() {
  return (
    <DataProvider>
      <SynthProvider>
        <Outlet />
      </SynthProvider>
    </DataProvider>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      element: <DataSynthLayout />,
      errorElement: <ErrorPage />,
      children: [{ index: true, element: <InitialSection /> }],
    },
    {
      element: <DataLayout />,
      errorElement: <ErrorPage />,
      children: [
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
