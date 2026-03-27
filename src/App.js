
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import CalcHeader from "./CalcHeader";
import CalcFooter from "./CalcFooter";
import RoutePages from './Routes';
import "./styles.css";


function App() {
 
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CalcHeader />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <RoutePages />
      </div>
      <CalcFooter />
    </div>
   
  );
}

export default App;
