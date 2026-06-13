import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "@/components/Layout";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Skills from "@/pages/Skills";
import Certifications from "@/pages/Certifications";
import Projects from "@/pages/Projects";
import Contact from "@/pages/Contact";
import Architecture from "@/pages/Architecture";
import Status from "@/pages/Status";
import TechStack from "@/pages/TechStack";
import Deployment from "@/pages/Deployment";
import NotFound from "@/pages/NotFound";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/skills", element: <Skills /> },
      { path: "/certifications", element: <Certifications /> },
      { path: "/projects", element: <Projects /> },
      { path: "/contact", element: <Contact /> },
      { path: "/architecture", element: <Architecture /> },
      { path: "/status", element: <Status /> },
      { path: "/tech-stack", element: <TechStack /> },
      { path: "/deployment", element: <Deployment /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
