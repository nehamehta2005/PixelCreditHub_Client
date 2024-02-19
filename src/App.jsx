import React from "react";
import { BrowserRouter } from "react-router-dom";
// import AnimatedCursor from "react-animated-cursor";
import Container from "./context/Container";
import Footer from "./components/Footer";
import AppNavigator from "./navigation/AppNavigator";
import Header from "./components/Header";
import "./App.css";
import "./index.css"
function App() {
  return (
    <BrowserRouter>
      <Container>
        <Header />
        <AppNavigator />
        <Footer />
        {/* <AnimatedCursor 
          innerSize={8}
          outerSize={35}
          innerScale={1}
          outerScale={2}
          outerAlpha={0}
          hasBlendMode={true}
          trailingSpeed={1}
          innerStyle={{ backgroundColor: 'black'}}
          outerStyle={{ border: '3px solid gray'}}
        /> */}
      </Container>
    </BrowserRouter>
  );
}

export default App;
