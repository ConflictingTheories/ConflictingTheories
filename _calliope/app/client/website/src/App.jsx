/*                                                 *\
** ----------------------------------------------- **
**             Calliope - Site Generator   	       **
** ----------------------------------------------- **
**  Copyright (c) 2020-2021 - Kyle Derby MacInnis  **
**                                                 **
**    Any unauthorized distribution or transfer    **
**       of this work is strictly prohibited.      **
**                                                 **
**               All Rights Reserved.              **
** ----------------------------------------------- **
\*                                                 */

import React, { useRef, useEffect } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// External Style Frameworks (RSuite / BlueprintJS)
import "rsuite/dist/styles/rsuite-default.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

// ASSETS & APP STYLES
import "./theme/less/App.less";

// HELPERS
import withSplashScreen from "./modules/utils/splashWrapper";

// ROUTER
import { AuthenticatedRoute } from "./modules/utils/authRouter";

// PUBLIC SCREENS
import PublicScreen from "./modules/home";
import EmbedScreen from "./modules/embed";

// ADMIN SCREENS
import LoginScreen from "./modules/login";
import LogoutScreen from "./modules/login/logout";
import AdminScreen from "./modules/admin";

import { initializeTheme, onResize } from "./theme";

const SplashLoaded = sessionStorage.getItem('splashLoaded');

// APP
const App = () => {
  // Initialize Canvas for Theme
  const ref = useRef();
  const date = new Date().toDateString();

  // useEffect(() => {
  //   let canvas = ref.current;
  //   initializeTheme(canvas);
  // });

  // Return Themed Site
  return (
    <React.Fragment>
      {/* background Canvas - For Special Animations - TODO - Issues with Sizing*/}
      {/* <canvas style={{ width: "100%", height: "100%" }} ref={ref} /> */}
      {/* Pre-Special Effects - TODO -- Issues w sizing*/}
      <div class="specialEffect1"></div>
      <div class="specialEffect2"></div>
      <div class="specialEffect3"></div>
      {/* Main Site Container */}
      <div className="calliope-container">
        <Router>
          <Switch>
            <AuthenticatedRoute exact path="/admin" component={AdminScreen} />
            <AuthenticatedRoute exact path="/logout" component={LogoutScreen} />
            <Route exact path="/login" component={LoginScreen} />
            <Route path="/embed/:type/:src" component={EmbedScreen} />
            <Route path="/:page" component={PublicScreen} />
            <Route path="*" component={PublicScreen} />
          </Switch>
        </Router>
      </div>
      {/* Post-Special Effects */}
      <div class="specialEffect4"></div>
      <div class="specialEffect5"></div>
      <div class="specialEffect6"></div>
      {/* Powered by Calliope and Date */}
      <p class="f">
        <span id="date">{date}</span>
        <br />
        <a target="_blank" href="https://www.calliope.site">
          powered by Calliope ⚡⚡⚡
        </a>
      </p>
    </React.Fragment>
  );
};

export default SplashLoaded ? App : withSplashScreen(App);
