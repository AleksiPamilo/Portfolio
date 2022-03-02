import React, { lazy, Suspense } from "react";

import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

import "./App.css";

const LandingPage = lazy(() => import("./components/sites/LandingPage"));
const Projects = lazy(() => import("./components/sites/Projects"));
const CV = lazy(() => import("./components/sites/CV"));
const Contact = lazy(() => import("./components/sites/Contact"));
const NotFound = lazy(() => import("./components/sites/NotFound"));
const Navigation = lazy(() => import("./components/Navigation"));

const Login = lazy(() => import("./components/sites/Management/Login"));
const Management = lazy(() => import("./components/sites/Management"));
const ManagementEmail = lazy(() => import("./components/sites/Management/Email"));
const ManagementCV = lazy(() => import("./components/sites/Management/CV"));
const Sidebar = lazy(() => import("./components/Sidebar"));

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div />}>

        <Route render={({ location }) => ["/", "/projects", "/cv", "/contact"].includes(location.pathname)
          ? <Navigation />
          : null
        } />

        <Route render={({ location }) => ["/management", "/management/email", "/management/cv"].includes(location.pathname)
          ? <Sidebar />
          : null
        } />

        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/cv" component={CV} />
          <Route exact path="/contact" component={Contact} />

          { /* Management */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/management" component={Management} />
          <Route exact path="/management/email" component={ManagementEmail} />
          <Route exact path="/management/cv" component={ManagementCV} />

          { /* Not Found */}
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;