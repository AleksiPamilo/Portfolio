import React, { Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = React.lazy(() => import('./sites/Home'));
const Projects = React.lazy(() => import('./sites/Projects'));
const Resume = React.lazy(() => import('./sites/Resume'));
const Management = React.lazy(() => import('./sites/Management'));
const ManagementResume = React.lazy(() => import('./sites/Management/Resume'));
const ManagementMessages = React.lazy(() => import('./sites/Management/Messages'));
const NotFound = React.lazy(() => import('./sites/NotFound'));
const Navbar = React.lazy(() => import('./components/Navbar'));
const Contact = React.lazy(() => import('./components/modals/Contact'));
const Layout = React.lazy(() => import('./components/Layouts/Layout'));
const AuthContextLayout = React.lazy(() => import('./components/Layouts/AuthContextLayout'));

const App: React.FC = () => {
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);

  const handleContactModal = () => {
    setContactModalOpen(!contactModalOpen);
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>

        <Navbar />
        <Contact visible={contactModalOpen} handleModal={handleContactModal} />

        <Routes>
          <Route element={<Layout handleContactModal={handleContactModal} />}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/cv" element={<Resume />} />
          </Route>
          <Route element={<AuthContextLayout />}>
            <Route path="/management" element={<Management />} />
            <Route path="/management/cv" element={<ManagementResume />} />
            <Route path="/management/messages" element={<ManagementMessages />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>

      </Router>
    </Suspense>
  );
}

export default App;
