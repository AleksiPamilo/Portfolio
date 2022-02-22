import './App.css';

import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const LandingPage = lazy(() => import("./components/sites/LandingPage/Main"));
const Projects = lazy(() => import("./components/sites/Projects/Main"));
const Management = lazy(() => import("./components/sites/Management/Main"));
const CV = lazy(() => import("./components/sites/CV/Main"));
const NotFound = lazy(() => import("./components/sites/NotFound/Main"));
const Navigation = lazy(() => import("./components/Navigation/Main"));

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<div />}>
        <Navigation />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/cv" component={CV} />
          <Route exact path="/login" component={Management} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;