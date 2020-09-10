import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { MuiThemeProvider } from "@material-ui/core";

import darkTheme from "./modules/theme";

import Layout from "./components/Layout";
import Home from "./components/Home";

import CellTypesRoute from "./pages/cell-types";
import CellTypeRoute from "./pages/cell-type";
import BrainRegionsRoute from "./pages/brain-regions";
import BrainRegionRoute from "./pages/brain-region";
import ExperimentsRoute from "./pages/experiments";
import AnalysisRoute from "./pages/analysis";
import InformationRoute from "./pages/information";

const App = () => (
  <MuiThemeProvider theme={darkTheme}>
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cell-types" component={CellTypesRoute} />
          <Route exact path="/cell-types/:id" component={CellTypeRoute} />

          <Route exact path="/brain-regions" component={BrainRegionsRoute} />
          <Route exact path="/brain-regions/:id" component={BrainRegionRoute} />

          <Route exact path="/analyses/:filters?" component={ExperimentsRoute} />
          <Route exact path="/analyses/:id/:dataId" component={AnalysisRoute} />

          <Route exact path="/acknowledgements" component={InformationRoute} />
          <Route> No match </Route>
        </Switch>
      </Layout>
    </Router>
  </MuiThemeProvider>
);

export default App;
