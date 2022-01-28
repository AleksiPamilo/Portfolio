import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { LandingPage, Projects, Management, CV, NotFound, Navigation } from "./components";
import { useDarkmodeContext } from './components/context/darkmodeContextProvider';

const App = () => {
  const { useDarkmode } = useDarkmodeContext();
  return (
    <div className={ useDarkmode ? "dark" : "light" }>
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/" component={ LandingPage } />
          <Route exact path="/projects" component={ Projects } />
          <Route exact path="/cv" component={ CV } />
          <Route exact path="/login" component={ Management } />
          <Route component={ NotFound } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
