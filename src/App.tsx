import React, { Suspense, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Contact from './components/modals/Contact';

const Home = React.lazy(() => import('./sites/Home'));
const Projects = React.lazy(() => import('./sites/Projects'));
const Resume = React.lazy(() => import('./sites/Resume'));
const NotFound = React.lazy(() => import('./sites/NotFound'));
const Navigation = React.lazy(() => import('./components/Navigation'));
const Footer = React.lazy(() => import('./components/Footer'));

const App: React.FC = () => {
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);

  const handleContactModal = () => {
    setContactModalOpen(!contactModalOpen);
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Navigation />
        <Contact visible={contactModalOpen} handleModal={handleContactModal} />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/projects" exact component={Projects} />
          <Route path="/cv" exact component={Resume} />
          <Route component={NotFound} />
        </Switch>

        <Footer handleContactModal={handleContactModal} />

      </Router>
    </Suspense>
  );
}

export default App;
