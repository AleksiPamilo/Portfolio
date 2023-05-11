import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ModalContextProvider } from "./components/context/ModalContextProvider";

const Home = lazy(() => import("./sites/Home"));
const Projects = lazy(() => import("./sites/Projects"));
const Skills = lazy(() => import("./sites/Skills"));
const Navigation = lazy(() => import("./components/Navigation"));

const App: React.FC = () => {
  document.title = "Portfolio";

  return (
    <Suspense fallback={
      <div className="w-screen h-screen flex flex-col gap-4 items-center justify-center fixed bg-[#111111] z-50">
        <h1 className="text-2xl font-bold animate-pulse">Loading...</h1>
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white" />
      </div>
    }>
      <Router>
        <ModalContextProvider>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
          </Routes>
        </ModalContextProvider>
      </Router>
    </Suspense>
  );
}

export default App;
