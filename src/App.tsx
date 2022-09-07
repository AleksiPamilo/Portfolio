import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Home = React.lazy(() => import('./sites/Home'));
const Projects = React.lazy(() => import('./sites/Projects'));
const Resume = React.lazy(() => import('./sites/Resume'));
const NotFound = React.lazy(() => import('./sites/NotFound'));
const Navigation = React.lazy(() => import('./components/Navigation'));
const Footer = React.lazy(() => import('./components/Footer'));

const App: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Navigation />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/projects" exact component={Projects} />
          <Route path="/cv" exact component={Resume} />
          <Route component={NotFound} />
        </Switch>

        <Footer />

      </Router>
    </Suspense>
  );
}

export default App;
