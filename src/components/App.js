import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import Header from "../components/ui/header.component.jsx";
import Footer from "../components/ui/footer.component.jsx";
import LandingPage from "../components/landing-page.component.jsx";
import theme from "./ui/Theme";

function App() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedMenuItemIndex, setSelectedMenuItemIndex] = useState(0);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          selectedMenuItemIndex={selectedMenuItemIndex}
          setSelectedMenuItemIndex={setSelectedMenuItemIndex}
        />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/services" component={() => <div>Services</div>} />
          <Route
            exact
            path="/mobileapps"
            component={() => <div>Mobile Apps</div>}
          />
          <Route
            exact
            path="/customsoftware"
            component={() => <div>Custom Software</div>}
          />
          <Route exact path="/websites" component={() => <div>Websites</div>} />
          <Route
            exact
            path="/revolution"
            component={() => <div>Revolution</div>}
          />
          <Route exact path="/about" component={() => <div>About</div>} />
          <Route exact path="/contact" component={() => <div>Contact</div>} />
          <Route
            exact
            path="/estimate"
            component={() => <div>Free Estimate</div>}
          />
        </Switch>
        <Footer
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          selectedMenuItemIndex={selectedMenuItemIndex}
          setSelectedMenuItemIndex={setSelectedMenuItemIndex}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
