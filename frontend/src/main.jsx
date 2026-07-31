import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import react-router-dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import pages
import Home from "./routes/Home/Home.jsx";
import AddMemory from "./routes/AddMemory/AddMemory";
import Memory from "./routes/Memory/Memory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      }, 
      {
        path: "/add-memory",
        element: <AddMemory />,
      },
      {
        path: "/memories/:id",
        element: <Memory />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
