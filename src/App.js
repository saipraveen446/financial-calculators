
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import CalcHeader from "./CalcHeader";
import CalcFooter from "./CalcFooter";
import RoutePages from './Routes';
import "./styles.css";


function App() {
 
  return (
    <div >
      <div >{CalcHeader()}</div>
      <div>{RoutePages()}</div>
      <div >{CalcFooter()}</div> 
    </div>
   
  );
}

export default App;
