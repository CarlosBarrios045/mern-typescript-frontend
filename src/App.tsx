import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"; 

// Components
import { Container } from "@chakra-ui/react";
import Navbar from "src/components/Navbar";

// Pages
import { Home, Form } from "src/pages";

function App(): JSX.Element {
  return ( 
    <BrowserRouter>
      <Navbar />
      <Container maxW="md">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/nuevo-video" component={Form} exact />
          <Route path="/editar-video/:id" component={Form} exact />
          <Redirect to="/" />
        </Switch>
      </Container>
    </BrowserRouter> 
  );
}

export default App;
