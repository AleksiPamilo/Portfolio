import { Suspense, lazy } from "react";
import { FaArrowDown } from "react-icons/fa";
import scrollTo from "./utils/scrollTo";
import "./App.css";
import { ModalContextProvider } from "./components/context/ModalContextProvider";

const Home = lazy(() => import("./components/Home"));
const Projects = lazy(() => import("./components/Projects"));
const Resume = lazy(() => import("./components/Resume"));
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
      <ModalContextProvider>
        <Navigation />

        <section id="home">
          <Home />

          <div className="w-full absolute bottom-4 text-center">
            <button onClick={() => scrollTo("projects")} className="bg-[#111111] animate-bounce p-4 rounded-full border border-transparent hover:shadow-glow-5">
              <FaArrowDown className="w-5 h-5 text-white" />
            </button>
          </div>
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="cv">
          <Resume />
        </section>

      </ModalContextProvider>
    </Suspense>
  );
}

export default App;
