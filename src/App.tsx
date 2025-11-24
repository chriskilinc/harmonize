import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { InitialSection } from "./pages/Initial";
import { ErrorPage } from "./pages/404";
import { Test } from "./pages/Test";
import { Chords } from "./pages/Chords";
import { DataProvider } from "./contexts/DataContext";
import { SynthProvider } from './contexts/SynthContext';
import { FeatureProvider } from './contexts/FeatureContext';
import { Scales } from './pages/Scales';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <DataProvider>
          <SynthProvider>
            <InitialSection />
          </SynthProvider>
        </DataProvider>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/test",
      element: (
        <DataProvider>
          <Test />
        </DataProvider>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/chords",
      element: (
        <DataProvider>
          <Chords />
        </DataProvider>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/scales",
      element: (
        <DataProvider>
          <Scales />
        </DataProvider>
      ),
      errorElement: <ErrorPage />,
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
