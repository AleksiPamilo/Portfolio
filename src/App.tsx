import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { LandingPage, Projects, CV } from "./pages";
import { Navigation } from "./components";

const App = () => {
  return (
    <Router>

      <Navigation />
      
      <Switch>

        <Route exact path="/" component={ LandingPage } />
        <Route exact path="/projects" component={ Projects } />
        <Route exact path="/cv" component={ CV } />

      </Switch>
    </Router>
  );
}

export default App;
