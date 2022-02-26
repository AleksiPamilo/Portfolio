import React, { lazy, Suspense } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';

const LandingPage = lazy(() => import("./components/sites/LandingPage/Main"));
const Projects = lazy(() => import("./components/sites/Projects/Main"));
const CV = lazy(() => import("./components/sites/CV/Main"));
const Contact = lazy(() => import("./components/sites/Contact/Main"));
const NotFound = lazy(() => import("./components/sites/NotFound/Main"));
const Navigation = lazy(() => import("./components/Navigation/Main"));
const Management = lazy(() => import("./components/sites/Management/Main"));
const ManagementEmail = lazy(() => import("./components/sites/Management/Email/Main"));
const ManagementCV = lazy(() => import("./components/sites/Management/CV/Main"));

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<div />}>
        <Navigation />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/cv" component={CV} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/login" component={Management} />
          <Route exact path="/management/email" component={ManagementEmail} />
          <Route exact path="/management/cv" component={ManagementCV} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;