import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Questions from "./pages/Questions.jsx";
import Pdf from "./pages/Pdf.jsx";
import PdfGen from "./pages/pdfGen.jsx";
import { store } from "./redux/Store.js";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/questions",
    element: <Questions />,
  },
  {
    path: "/invoice",
    element: <Pdf />,
  },
  {
    path: "/invoice/:id",
    element: <PdfGen />,
  },
  
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
