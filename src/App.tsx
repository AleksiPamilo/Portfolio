import React, { Suspense, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthContextProvider } from './components/context/authContextProvider';

const Home = React.lazy(() => import('./sites/Home'));
const Projects = React.lazy(() => import('./sites/Projects'));
const Resume = React.lazy(() => import('./sites/Resume'));
const Management = React.lazy(() => import('./sites/Management'));
const ManagementResume = React.lazy(() => import('./sites/Management/Resume'));
const ManagementMessages = React.lazy(() => import('./sites/Management/Messages'));
const NotFound = React.lazy(() => import('./sites/NotFound'));
const Navbar = React.lazy(() => import('./components/Navbar'));
const Footer = React.lazy(() => import('./components/Footer'));
const Contact = React.lazy(() => import('./components/modals/Contact'));

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

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/projects" exact component={Projects} />
          <Route path="/cv" exact component={Resume} />
          <AuthContextProvider>
            <Route path="/management" exact component={Management} />
            <Route path="/management/cv" exact component={ManagementResume} />
            <Route path="/management/messages" exact component={ManagementMessages} />
          </AuthContextProvider>
          <Route component={NotFound} />
        </Switch>

        <Route render={({ location }) => ["/management"].includes(location.pathname)
          ? null
          : <Footer handleContactModal={handleContactModal} />
        } />

      </Router>
    </Suspense>
  );
}

export default App;
