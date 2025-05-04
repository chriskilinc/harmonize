import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { InitialSection } from "./pages/Initial";
import { ErrorPage } from "./pages/404";
import { Test } from "./pages/Test";
import { DataProvider } from "./contexts/DataContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <DataProvider>
          <InitialSection />
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
  ]);

  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
