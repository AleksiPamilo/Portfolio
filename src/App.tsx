import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ModalContextProvider } from './components/context/modalContextProvider';
const Home = lazy(() => import('./sites/Home'));
const Projects = lazy(() => import('./sites/Projects'));
const Resume = lazy(() => import('./sites/Resume'));
const Management = lazy(() => import('./sites/Management'));
const ManagementResume = lazy(() => import('./sites/Management/Resume'));
const ManagementMessages = lazy(() => import('./sites/Management/Messages'));
const NotFound = lazy(() => import('./sites/NotFound'));
const Layout = lazy(() => import('./components/Layouts/Layout'));
const AuthContextLayout = lazy(() => import('./components/Layouts/AuthContextLayout'));

const App: React.FC = () => {
  return (
    <Suspense fallback={<div />}>
      <ModalContextProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/cv" element={<Resume />} />
              <Route element={<AuthContextLayout />}>
                <Route path="/management" element={<Management />} />
                <Route path="/management/cv" element={<ManagementResume />} />
                <Route path="/management/messages" element={<ManagementMessages />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ModalContextProvider>
    </Suspense>
  );
}

export default App;
