import React, { lazy, Suspense, useEffect } from "react";

import {
  Switch,
  Route,
  useHistory,
} from "react-router-dom";

import { logEvent } from "firebase/analytics";
import FirebaseServices from "./firebase/firebaseServices";

import "./App.css";

// Sites
const LandingPage = lazy(() => import("./components/sites/LandingPage"));
const Projects = lazy(() => import("./components/sites/Projects"));
const CV = lazy(() => import("./components/sites/CV"));
const Contact = lazy(() => import("./components/sites/Contact"));
const NotFound = lazy(() => import("./components/sites/NotFound"));

// Management sites
const Login = lazy(() => import("./components/sites/Management/Login"));
const Management = lazy(() => import("./components/sites/Management"));
const ManagementEmail = lazy(() => import("./components/sites/Management/Email"));
const ManagementCV = lazy(() => import("./components/sites/Management/CV"));

// Components
const Navigation = lazy(() => import("./components/Navigation"));
const Sidebar = lazy(() => import("./components/Sidebar"));

const App: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const pingAnalytics = () => {
      const analyticsInstance = FirebaseServices.getAnalytics();

      logEvent(analyticsInstance, 'page_view', {
        page_path: window.location.pathname,
      });
    };

    pingAnalytics();

    return history.listen(() => {
      pingAnalytics();
    });
  }, [history]);

  return (
    <>
      <Suspense fallback={<div />}>

        <Route render={({ location }) => ["/management", "/management/email", "/management/cv"].includes(location.pathname)
          ? <Sidebar />
          : <Navigation />
        } />

        <Switch>
          {/* Portfolio */}
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/cv" component={CV} />
          <Route exact path="/contact" component={Contact} />

          {/* Management */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/management" component={Management} />
          <Route exact path="/management/email" component={ManagementEmail} />
          <Route exact path="/management/cv" component={ManagementCV} />

          {/* Not Found */}
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}

export default App;